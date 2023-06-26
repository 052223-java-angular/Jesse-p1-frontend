import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {NewArtistPayload} from "../models/NewArtistPayload";
import {Observable} from "rxjs";
import {NewTrackPayload} from "../models/NewTrackPayload";
import {AddSongToPlaylist} from "../models/AddSongToPlaylist";

@Injectable({
  providedIn: 'root'
})
export class SongserviceService {
  baseUrl:string = environment.apiBaseUrl;
  constructor(private http: HttpClient) { }


  createArtist(payload: NewArtistPayload):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/artist/create`,payload);
  }

  createSong(payload: NewTrackPayload):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/song/create`,payload);
  }

  addSongToPlaylist(payload :AddSongToPlaylist):Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/playlist/add/song`,payload);
  }
}
