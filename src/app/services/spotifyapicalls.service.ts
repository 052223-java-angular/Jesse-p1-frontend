import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SpotifyapicallsService {
  baseUrl ='https://api.spotify.com';


  private accessToken: string = '';


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


  async search() {
    const searchInput = 'Taylor Swift'; // Replace with your actual search query

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.accessToken
    });

    const params = {
      q: searchInput,
      type: 'artist',
      market: 'ES',
      limit: 1
    };

    this.http.get<any>(`${this.baseUrl}/v1/search`, {headers, params}).toPromise()
      .then((data) => {
        console.log(data);
        console.log("the artist id: " + data.artists.items[0].id)

      })
      .catch((error) => {
        console.error(error);
      });
  }
}



