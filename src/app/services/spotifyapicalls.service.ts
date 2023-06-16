import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Track} from "../models/track";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";


@Injectable({
  providedIn: 'root'
})
export class SpotifyapicallsService {
  baseUrl ='https://api.spotify.com';


  private accessToken: string = '';
  public trackItems: Track[] = [];


  constructor(private http: HttpClient) {
  }

  spotifyAuth(): void {
    const clientId = '254184c7d88442afa6faa5ef8bba5179';
    const secret = '63dccd86ff4f4aa18d9c479ade29cc77';

    const authParameters = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', clientId)
      .set('client_secret', secret);

    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });

    this.http.post<any>('https://accounts.spotify.com/api/token', authParameters.toString(), { headers })
      .toPromise()
        .then((data) => {
          this.accessToken = data.access_token;
          console.log(data);
          console.log("Access token: " + this.accessToken);
      })
        .catch((error) => {
        console.error(error);
      });
  }


  searchMusic(searchInput: FormGroup):Observable<any>
  {
    let searchItem = searchInput.toString();

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    let params = {
      q: searchItem,
      type: 'track',
      market: 'ES',
      limit: 20
    };

   return  this.http.get<any>(`${this.baseUrl}/v1/search`, {headers, params})
  }

  //addToPlaylist(artistId: number) {
    //return this.http.post(`${this.apiUrl}/add`, { artistId });
  //}

}



