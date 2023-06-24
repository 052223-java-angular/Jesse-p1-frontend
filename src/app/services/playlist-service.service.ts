import { Injectable } from '@angular/core';
import {NewPlaylistPayload} from "../models/NewPlaylistPayload";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Playlist} from "../models/playlist";
import {environment} from "../../environments/environment";
import {TokenserviceService} from "./tokenservice.service";

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {

  baseUrl:string = environment.apiBaseUrl;

  private httpHead = {
    headers: new HttpHeaders({'auth-token': this.token.get('token')!}),
  };

  constructor(private http: HttpClient, private token:TokenserviceService) {}



  /**
   *
   * @param payload
   */
  createPlaylist(payload: NewPlaylistPayload):Observable<any> {
    return this.http.post(`${this.baseUrl}/playlist/create`,payload);

  }

  /**
   *
   * @param token
   */
  displayPlaylist(token:string |null): Observable<Playlist[]> {

      return this.http.get<Playlist[]>(`${this.baseUrl}/playlist/all/${token}`);
  }

  /**
   *
   * @param playlistId
   */
  displaySelectedPlaylist(playlistId:string): Observable<Playlist>
  {
    return this.http.get<Playlist>(`${this.baseUrl}/playlist/get/${playlistId}`)
  }

  /**
   *
   * @param playlistId
   */
  deletePlaylist(playlistId: string):Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/playlist/delete/${playlistId}`, this.httpHead);
  }

  modifyPlaylist(playlistId: string, payload: NewPlaylistPayload):Observable<any> {
    return this.http.patch<Playlist>(`${this.baseUrl}/playlist/update/${playlistId}`,payload)
  }

  /**
   *
   * @param songId
   * @param playlistId
   */
  deleteSongFromPlaylist(songId: string, playlistId: string): Observable<void>{

    return this.http.delete<void>(`${this.baseUrl}/playlist/delete/song/${songId}/${playlistId}`)

  }



}
