import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PlaylistServiceService} from "../../services/playlist-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {NewPlaylistPayload} from "../../models/NewPlaylistPayload";

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit{
  playlistForm!: FormGroup;

  constructor(private pl: FormBuilder,
              private playlistService: PlaylistServiceService,
              private router: Router,
              private toaster: ToastrService) {}

  ngOnInit(): void
  {
    this.playlistForm= this.pl.group({
      title:['', Validators.required],
      description:['', Validators.required]
    })
  }

  //Will need the user to create a playlist via title, description, user token
  createPlaylist():void
  {
    this.playlistForm.controls['title'].markAsTouched();
    this.playlistForm.controls['description'].markAsTouched();
    this.playlistForm.reset();
    return;



  //construct a payload for the backend
    const payload: NewPlaylistPayload = {
      title: this.playlistForm.controls['title'].value,
      description: this.playlistForm.controls['description'].value,
      token:'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZXZhdHVyZTEiLCJyb2xlIjoiVVNFUiIsImlkIjoiMTI0MTMyZDUtNjBiMC00YTg5LWEwOGItZTc3YTk4NmNlMDVhIiwiZXhwIjoxNjg3MDg1NjQ0LCJpYXQiOjE2ODcwNDk2NDR9.-cQIxuA_8i9giQ0e2H3gaCP9M-e8rYracl2ZpzFHWe8'
    }


  //call service to send to the back end
  this.playlistService.createPlaylist(payload).subscribe({
    next:value => {
    this.toaster.success("Playlist successfully created!")
      console.log(value);

    },
    error: error =>
    {
      console.log(error.error.message);
      this.toaster.error(error.error.message)
    }


  })

  }

//Method to display currently made playlists


}
