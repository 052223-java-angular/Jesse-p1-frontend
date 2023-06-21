import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlaylistServiceService} from "../../services/playlist-service.service";
import {Playlist} from "../../models/playlist";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-selectplaylist',
  templateUrl: './selectplaylist.component.html',
  styleUrls: ['./selectplaylist.component.css']
})
export class SelectplaylistComponent implements OnInit{
   playlist!: Playlist;



  constructor(private route:ActivatedRoute,
              private playlistService: PlaylistServiceService,
              private toaster: ToastrService
             ) {
  }
  ngOnInit(): void {
    {
      const id = this.route.snapshot.paramMap.get('id')!;
      console.log(id);
      this.displaySelectedPlaylist(id);
    }

  }


  displaySelectedPlaylist(id:string) {

    this.playlistService.displaySelectedPlaylist(id).subscribe(
      (playlist: Playlist) => {
         this.playlist = playlist
        console.log(this.playlist)
      },
      (error) => {

      }
    );
  }

  deleteSong(songId: string):void
  {
    const playlistId= this.playlist.id
    this.playlistService.deleteSongFromPlaylist(songId,playlistId).subscribe({
      next: () => {
        this.ngOnInit()
        this.toaster.success("Song removed from playlist!")

      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
