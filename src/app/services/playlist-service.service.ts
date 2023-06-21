import { Injectable } from '@angular/core';
import {NewPlaylistPayload} from "../models/NewPlaylistPayload";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Playlist} from "../models/playlist";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {

  baseUrl ='http://localhost:8080/music/api';

  constructor(private http: HttpClient) { }

  createPlaylist(payload: NewPlaylistPayload):Observable<any> {
    return this.http.post(`${this.baseUrl}/playlist/create`,payload);

  }

  displayPlaylist(token:string |null): Observable<Playlist[]> {

      return this.http.get<Playlist[]>(`${this.baseUrl}/playlist/all/${token}`);
  }

  displaySelectedPlaylist(id:string): Observable<Playlist>
  {
    return this.http.get<Playlist>(`${this.baseUrl}/playlist/get/${id}`)
  }

  deleteSongFromPlaylist(songId: string, playlistId: string): Observable<void>{

    return this.http.delete<void>(`${this.baseUrl}/playlist/delete/song/${songId}/${playlistId}`)

  }
}
