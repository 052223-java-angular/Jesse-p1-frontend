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
            let trackName = item.name;
            let duration = item.duration_ms;
            //Look into grabbing a picture im pretty sure is can

            //Create track item
            let track: Track =
              {
              albumName,
              artistName,
              trackName,
              duration
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


}
