import {Component, OnInit} from '@angular/core';
import {SpotifyapicallsService} from "../../services/spotifyapicalls.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Track} from "../../models/track";
import {Playlist} from "../../models/playlist";
import {TokenserviceService} from "../../services/tokenservice.service";
import {PlaylistServiceService} from "../../services/playlist-service.service";
import {ToastrService} from "ngx-toastr";
import {NewArtistPayload} from "../../models/NewArtistPayload";
import {SongserviceService} from "../../services/songservice.service";
import {NewTrackPayload} from "../../models/NewTrackPayload";
import {AddSongToPlaylist} from "../../models/AddSongToPlaylist";
import {NavbarComponent} from "../../components/navbar/navbar.component";



@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit{
  searchInput!: FormGroup;
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist | null = null;
  showPlaylistDropDown: boolean = false;
  selectedTrackId: string | null = null;

  public trackItems: Track[] = [];
  constructor(private spotifyAPI: SpotifyapicallsService,
              private fb: FormBuilder,
              private tokenService:TokenserviceService,
              private playlistService: PlaylistServiceService,
              private toaster: ToastrService,
              private songService:SongserviceService,) {}


  ngOnInit(): void {

    this.searchInput = this.fb.group({
      search: ['', Validators.required]
    });
    this.displayPlaylists()

  }

  /**
   * Based on the users search this method will take the name entered and use the spotify api
   * to retrieve 10 search results.
   */
  searchMusic() {
   // console.log(localStorage.getItem('token'));
    console.log(this.searchInput.value.search);
    this.trackItems = [];
    this.spotifyAPI.searchMusic(this.searchInput.value.search)
      .subscribe(
        (data: any) => {

          let trackItems: any[] = [];

          //iterate through results from api call
          data.tracks.items.forEach((item: any) =>
          {
            //Data taken from spotify call
            let albumName = item.album.name;
            let artistName = item.artists[0].name;
            let artistId = item.artists[0].id;
            let trackName = item.name;
            let duration = item.duration_ms;
            let trackId = item.id;
            let albumCoverUrl = item.album.images[0].url;
            //Look into grabbing a picture im pretty sure I can

            //Create track item
            let track: Track =
              {
                albumName,
                artistName,
                artistId,
                trackName,
                duration,
                trackId,
                albumCoverUrl
            };

            trackItems.push(track);//instantiate tracks array

            this.trackItems.push(track);// Add to the array in order to display to the user
          });

          console.log("Tracks:", trackItems);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }

  async addToPlaylist(item: Track) {
    if (!this.selectedPlaylist) {
      this.toaster.error('No playlist selected.');
      return;
    }
    await this.addArtistToDB(item.artistId, item.artistName)
    await this.addSongToDB(item.trackId, item.duration, item.trackName, item.artistName)
    console.log("playlist id: " + this.selectedPlaylist?.id)
    console.log("track id : " + item.trackId)

    const id = this.selectedPlaylist?.id ?? 'defaultPlaylistId';
    console.log(id);
    const payload:AddSongToPlaylist={
      playlistId: id,
      songId:item.trackId
    }
    console.log(payload);

    try {
      const response = await  this.songService.addSongToPlaylist(payload).toPromise();
      console.log('Song added to playlist:', response);
      this.toaster.success('Song added to playlist.');
    } catch (error) {
      console.error('Error adding Song to playlist:', error);
      this.toaster.error('Failed to add track to playlist.');
    }
  }

  async addArtistToDB(artistId: string, artistName: string) {
    const payload: NewArtistPayload = {
      id: artistId,
      name: artistName
    };

    try {
      const value = await this.songService.createArtist(payload).toPromise();
      console.log(value);
    } catch (error) {
      console.log(error);
      //this.toaster.error(error.message.toString());
    }
  }

  async addSongToDB(trackId: string, trackDuration: number, trackName: string, artistName: string) {
    const payload: NewTrackPayload = {
      id: trackId,
      duration: trackDuration,
      title: trackName,
      name: artistName
    };

    try {
      const value = await this.songService.createSong(payload).toPromise();
      console.log(value);
    } catch (error) {
      console.log(error);
      //this.toaster.error(error.message);
    }
  }


  public displayPlaylists(): void {
    console.log("Using displayPlaylists");

    console.log(localStorage.getItem('key'));
    let activeToken = this.tokenService.get('token');

    console.log();

    this.playlistService.displayPlaylist(activeToken).subscribe(
      (playlist: Playlist[]) => {
        console.log("Playlists =", playlist);
        this.playlists = playlist;
      },
      (error) => {
        console.log(error.error.message);
        this.toaster.error(error.error.message);
      }
    );
  }

  selectedTrack(trackId: string) {
    this.showPlaylistDropDown = true;
    this.selectedTrackId = trackId;
    console.log(trackId);
  }

  cancelAddingToPlaylist() {
    this.showPlaylistDropDown = false;
  }

  protected readonly localStorage = localStorage;
}
