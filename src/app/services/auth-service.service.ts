import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "../models/register-payload";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseUrl ='http://localhost:8080/music/api';
  constructor( private http: HttpClient) { }

  //All HTTP requests are asynchronous, so they will always be working with observable
  register(payload: RegisterPayload): Observable<Auth>{
    return this.http.post <Auth>(`${this.baseUrl}/auth/register`,payload)
  }
}
