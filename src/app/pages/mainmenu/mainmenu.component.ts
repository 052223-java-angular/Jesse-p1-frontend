import {Component, OnInit} from '@angular/core';
import {SpotifyapicallsService} from "../../services/spotifyapicalls.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Track} from "../../models/track";

@Component({
  selector: 'app-mainmenu',
  templateUrl: './mainmenu.component.html',
  styleUrls: ['./mainmenu.component.css']
})
export class MainmenuComponent implements OnInit{
  searchInput!: FormGroup;

  public trackItems: Track[] = [];
  constructor(private spotifyAPI: SpotifyapicallsService, private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.searchInput = this.fb.group({
      search: ['', Validators.required]
    });
  }
  searchMusic() {
    console.log(this.searchInput.value.search);
    this.trackItems = [];
    this.spotifyAPI.searchMusic(this.searchInput.value.search)
      .subscribe(
        (data: any) => {
          let tracks: any[] = [];

          data.tracks.items.forEach((item: any) => {
            let albumName = item.album.name;
            let artistName = item.artists[0].name;
            let trackName = item.name;
            let duration = item.duration_ms;

            let track: Track = {
              albumName,
              artistName,
              trackName,
              duration
            };

            tracks.push(track);
            this.trackItems.push(track);
          });

          console.log("Tracks:", tracks);
        },
        (error: any) => {
          console.error(error);
        }
      );
  }


}
