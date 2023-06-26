import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PlaylistServiceService} from "../../services/playlist-service.service";
import {Playlist} from "../../models/playlist";

import {ToastrService} from "ngx-toastr";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TokenserviceService} from "../../services/tokenservice.service";
import {NewPlaylistPayload} from "../../models/NewPlaylistPayload";


@Component({
  selector: 'app-selectplaylist',
  templateUrl: './selectplaylist.component.html',
  styleUrls: ['./selectplaylist.component.css']
})
export class SelectplaylistComponent implements OnInit{
   playlist!: Playlist;
   showForm:Boolean=false;
  playlistForm!: FormGroup;
   chartData: any;
   chartOptions: any;


  constructor(private route:ActivatedRoute,
              private pl: FormBuilder,
              private playlistService: PlaylistServiceService,
              private router: Router,
              private toaster: ToastrService,
              private tokenService: TokenserviceService
             ) {
  }
  ngOnInit(): void
  {
      const id = this.route.snapshot.paramMap.get('id')!;
      console.log(id);
      this.displaySelectedPlaylist(id);
      this.playlistForm = this.pl.group
      ({
        title: ['', Validators.required],
        description: ['', Validators.required],})

    //this.chartData = this.generateChartData();

    // this.chartOptions = {
    // responsive: true,
    // maintainAspectRatio: false
  };

    // console.log("chart data: "+this.chartData);
    // console.log("chart options : " + this.chartOptions)
 // }


  displaySelectedPlaylist(id:string) {

    this.playlistService.displaySelectedPlaylist(id).subscribe(
      (playlist: Playlist) => {
         this.playlist = playlist
        console.log(this.playlist)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  // generateChartData() {
  //   const nameCounts: { [key: string]: number } = {};
  //   const chartLabels = [];
  //   const chartData = [];
  //
  //   this.playlist.songs.forEach((song) => {
  //     if (nameCounts[song.name]) {
  //       nameCounts[song.name]++;
  //     } else {
  //       nameCounts[song.name] = 1;
  //     }
  //   });
  //
  //   // Extract the names and counts from the nameCounts object
  //   for (const name in nameCounts) {
  //     if (nameCounts.hasOwnProperty(name)) {
  //       chartLabels.push(name);
  //       chartData.push(nameCounts[name]);
  //     }
  //   }
  //
  //   const datasets = [
  //     {
  //       data: chartData,
  //       backgroundColor: [
  //         '#FF6384',
  //         '#36A2EB',
  //         '#FFCE56',
  //       ],
  //     },
  //   ];
  //
  //   return datasets;
  // }



  deleteSong(songId: string):void
  {
    const playlistId= this.playlist.id
    this.playlistService.deleteSongFromPlaylist(songId,playlistId).subscribe({
      next: () => {
        this.ngOnInit()
        this.toaster.success("Song removed from playlist!")

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  modifyPlaylist() {
    this.showForm =true;
    this.playlistForm.controls['title'].markAsTouched();
    this.playlistForm.controls['description'].markAsTouched();

  }


  cancelModify() {

      this.showForm = false;

  }

  saveChanges(playlistId: string) {
    console.log("tokenService.getKey = " + this.tokenService.get('token'))
    let activeToken = this.tokenService.get('token');

    //construct a payload for the backend
    const payload: NewPlaylistPayload = {
      title: this.playlistForm.controls['title'].value,
      description: this.playlistForm.controls['description'].value,
      token: activeToken || ""
    }

    this.playlistService.modifyPlaylist(playlistId, payload).subscribe({
      next: value => {
        this.toaster.success("Playlist successfully updated!")

        this.playlistForm.reset();
        this.displaySelectedPlaylist(playlistId)

        this.showForm = false;
        console.log(value);
      },
      error: error => {
        console.log(error.error.message);
        this.toaster.error(error.error.message)
      }
    });
  }
}
