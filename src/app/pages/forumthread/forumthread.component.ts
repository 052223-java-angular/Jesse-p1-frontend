import {Component, OnInit} from '@angular/core';
import {ForumthreadService} from "../../services/forumthread.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Forumthread} from "../../models/forumthread";



@Component({
  selector: 'app-forumthread',
  templateUrl: './forumthread.component.html',
  styleUrls: ['./forumthread.component.css']
})
export class ForumthreadComponent implements OnInit{
  forumThreads: Forumthread[]= [];
  private selectedThread!: Forumthread;

  constructor(
              private forumThreadService: ForumthreadService,
              private toaster: ToastrService,
              private router: Router) {}

  ngOnInit(): void {
    this.displayForumThreads();
  }


   displayForumThreads():void {
    this.forumThreadService.displayAllForums().subscribe({
      next:(data:Forumthread[])=>
      {

        this.forumThreads = data;

        console.log(this.forumThreads)
      },
      error:error =>
      {
        console.log(error.message)
        this.toaster.error(error.message)
      }
    })
  }

  selectForumThread(forumthreadId: String) {

    console.log(forumthreadId)
    this.router.navigate(['select/forum/', forumthreadId])
  }
}
