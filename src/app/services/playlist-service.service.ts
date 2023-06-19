import { Injectable } from '@angular/core';
import {NewPlaylistPayload} from "../models/NewPlaylistPayload";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlaylistServiceService {

  baseUrl ='http://localhost:8080/music/api';

  constructor(private http: HttpClient) { }

  createPlaylist(payload: NewPlaylistPayload):Observable<any> {
    return this.http.post(`${this.baseUrl}/playlist/create`,payload);

  }
}
