import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RegisterPayload} from "../models/register-payload";
import {Observable} from "rxjs";
import {Auth} from "../models/auth";
import {LoginPayload} from "../models/login-payload";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService
{
  baseUrl:string = environment.apiBaseUrl;
  constructor( private http: HttpClient) { }

  //All HTTP requests are asynchronous, so they will always be working with observable
  register(payload: RegisterPayload): Observable<Auth>{
    return this.http.post <Auth>(`${this.baseUrl}/auth/register`,payload)
  }

  login(payload: LoginPayload): Observable<Auth>{
    return this.http.post <Auth>(`${this.baseUrl}/auth/login`,payload);
  }
}
