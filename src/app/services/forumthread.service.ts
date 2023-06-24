import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenserviceService} from "./tokenservice.service";
import {Observable} from "rxjs";
import {Forumthread} from "../models/forumthread"
import {NewForumComment} from "../models/NewForumComment";
import {forumcomment} from "../models/forumcomment";
import {NewForumThreadPayload} from "../models/NewForumThreadPayload";

@Injectable({
  providedIn: 'root'
})
export class ForumthreadService {
  baseUrl:string = environment.apiBaseUrl;

  private httpHead = {
    headers: new HttpHeaders({'auth-token': this.token.get('token')!}),
  };
  constructor(private http: HttpClient, private token:TokenserviceService) { }
  createNewForm(payload:NewForumThreadPayload):Observable<Forumthread> {
  return this.http.post<Forumthread>(`${this.baseUrl}/forum/create`,payload)
  }
  displayAllForums():Observable<Forumthread[]> {
   return this.http.get<Forumthread[]>(`${this.baseUrl}/forum/all`)
  }

  displaySelectForumThread(fourmthreadId: string):Observable<Forumthread> {
    return this.http.get<Forumthread>(`${this.baseUrl}/forum/get/${fourmthreadId}`)
  }

  modifyForumThread(fourmthreadId: string, payload: NewForumThreadPayload):Observable<Forumthread> {
  return this.http.patch<Forumthread>(`${this.baseUrl}/forum/update/${fourmthreadId}`,payload)
  }


  deleteForumThread(fourmthreadId: string):Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/forum/delete/${fourmthreadId}`,this.httpHead)
  }


  //<------------------Forum comment service methods---------------->//
  postComment(payload: NewForumComment):Observable<forumcomment> {
    return this.http.post<forumcomment>(`${this.baseUrl}/forum/comment`,payload)
  }

  modifyComment(forumCommentId: string, payload: NewForumComment):Observable<forumcomment> {
    return this.http.patch<forumcomment>(`${this.baseUrl}/forum/update/comment/${forumCommentId}`,payload)
  }

  deleteSelectedComment(forumCommentId: string):Observable<void>
  {
    return this.http.delete<void>(`${this.baseUrl}/forum/delete/comment/${forumCommentId}`,this.httpHead)
  }


}
