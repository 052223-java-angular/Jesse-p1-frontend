import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaylistServiceService} from "../../services/playlist-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NewPlaylistPayload} from "../../models/NewPlaylistPayload";
import {TokenserviceService} from "../../services/tokenservice.service";
import {Playlist} from "../../models/playlist";


@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlistForm!: FormGroup;
  playlists: Playlist[] = [];

  constructor(private pl: FormBuilder,
              private playlistService: PlaylistServiceService,
              private router: Router,
              private toaster: ToastrService,
              private tokenService: TokenserviceService) {
  }

  ngOnInit(): void {
    this.displayPlaylists();
    this.playlistForm = this.pl.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  //Will need the user to create a playlist via title, description, user token
  createPlaylist(): void {
    this.playlistForm.controls['title'].markAsTouched();
    this.playlistForm.controls['description'].markAsTouched();
    //this.playlistForm.reset();

    console.log("localStorage.getKey = " + localStorage.getItem('token'));
    console.log("tokenService.getKey = " + this.tokenService.get('token'))
    let activeToken = this.tokenService.get('token');

    //construct a payload for the backend
    const payload: NewPlaylistPayload = {
      title: this.playlistForm.controls['title'].value,
      description: this.playlistForm.controls['description'].value,
      token: activeToken || ""
    }
    console.log(payload);

    //call service to send to the back end
    this.playlistService.createPlaylist(payload).subscribe({
      next: value => {
        this.toaster.success("Playlist successfully created!")
        this.playlistForm.reset();
        this.displayPlaylists()
        console.log(value);
      },
      error: error => {
        console.log(error.error.message);
        this.toaster.error(error.message)
      }


    })

  }

//Method to display currently made playlists
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

  deletePlaylist(playlistId: string) {

    this.playlistService.deletePlaylist(playlistId).subscribe({
      next: () => {
       this.displayPlaylists()
        this.toaster.success('Playlist deleted!');
      },
      error: (error) => {
        console.log(error.error.message);
        this.toaster.error(error.error.message)
      },
    });
  }

  public selectPlaylist(playlistId: string) {

    this.router.navigate(['/select/playlist', playlistId]);

  }
}
