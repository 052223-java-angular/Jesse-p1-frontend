import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {Track} from "../models/track";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class SpotifyapicallsService {
  baseUrl ='https://api.spotify.com';


  private accessToken: string = '';
  public trackItems: Track[] = [];


  constructor(private http: HttpClient) {
  }


  /**
   * Grabs spotify token in order to make api calls
   */
  spotifyAuth(): void {
    const clientId = environment.spotifyClient;
    const secret = environment.spotifySecret;

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
      limit: 50
    };

   return  this.http.get<any>(`${this.baseUrl}/v1/search`, {headers, params})
  }

}



