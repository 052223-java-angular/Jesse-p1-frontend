import {Component, OnInit} from '@angular/core';
import {ForumthreadService} from "../../services/forumthread.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {Forumthread} from "../../models/forumthread";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NewForumThreadPayload} from "../../models/NewForumThreadPayload";
import {TokenserviceService} from "../../services/tokenservice.service";
import {error} from "@angular/compiler-cli/src/transformers/util";



@Component({
  selector: 'app-forumthread',
  templateUrl: './forumthread.component.html',
  styleUrls: ['./forumthread.component.css']
})
export class ForumthreadComponent implements OnInit{
  forumThreads: Forumthread[]= [];
  showForm: boolean = false;
  forumThreadForm!: FormGroup;


  constructor(
              private fb: FormBuilder,
              private forumThreadService: ForumthreadService,
              private tokenService: TokenserviceService,
              private toaster: ToastrService,
              private router: Router) {}

  ngOnInit(): void {
    this.displayForumThreads();

    this.forumThreadForm = this.fb.group({
      title:['', Validators.required],
      description:['', Validators.required],
    })
  }


   displayForumThreads():void {
    this.forumThreadService.displayAllForums().subscribe({
      next:(data:Forumthread[])=>
      {

        this.forumThreads = data.sort((form1,form2)=>{
          const  date1= new Date(form1.creationDate);
          const  date2= new Date(form2.creationDate);

          return date2.getTime() - date1.getTime();
        })

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


  createNewForm() {
    let activeToken = this.tokenService.get('token');
    const payload: NewForumThreadPayload = {
      title: this.forumThreadForm.controls['title'].value,
      description: this.forumThreadForm.controls['description'].value,
      token: activeToken || ""
    }
    this.forumThreadService.createNewForm(payload).subscribe({
      next: value => {
        this.toaster.success("Thread created!")
        this.showForm = false;
        this.displayForumThreads();
      },
      error:error=>{
        console.log(error.error.message);
        this.toaster.error(error.message)
      }
    })
  }

  displayForm() {
    this.showForm = true;
    this.forumThreadForm.controls['title'].markAsTouched();
    this.forumThreadForm.controls['description'].markAsTouched();

  }

  cancelCreation() {
    this.showForm = false;
    this.forumThreadForm.reset()
    this.displayForumThreads()
  }

    protected readonly localStorage = localStorage;
}
