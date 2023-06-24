import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ForumthreadService} from "../../services/forumthread.service";
import {ToastrService} from "ngx-toastr";
import {Forumthread} from "../../models/forumthread";
import {NewForumComment} from "../../models/NewForumComment";
import {TokenserviceService} from "../../services/tokenservice.service";
import {NewForumThreadPayload} from "../../models/NewForumThreadPayload";
import {forumcomment} from "../../models/forumcomment";


@Component({
  selector: 'app-selectedforumthread',
  templateUrl: './selectedforumthread.component.html',
  styleUrls: ['./selectedforumthread.component.css']
})
export class SelectedforumthreadComponent implements OnInit{
  showCommentForm:boolean = false;
  showCommentModifyForm:boolean = false;
  forumComment!:FormGroup;
  forumthread!:Forumthread
  showThreadModifyButton: boolean=false;//allows the user to modify their thread if logged in
  showThreadModifyForm:boolean = false;
  loggedInUser = this.tokenService.get('user');
  modifyThreadForm!:FormGroup;
  modifyCommentForum!: FormGroup;
  selectedCommentId: string | null = null;
  constructor(private route:ActivatedRoute,
              private fb:FormBuilder,
              private forumService: ForumthreadService,
              private toaster: ToastrService,
              private router: Router,
              private tokenService: TokenserviceService) {
  }

  ngOnInit(): void {
    const fourmthreadId = this.route.snapshot.paramMap.get('id')!;

    console.log(fourmthreadId);

    this.displaySelectedForumThread(fourmthreadId);
    /**
     * For posting a new comment
     */
    this.forumComment = this.fb.group({
      content:['', Validators.required]
    })

    this.modifyThreadForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    });

     this.modifyCommentForum = this.fb.group(({
       content:['', Validators.required]
     }))
  }

  /**
   * Displays the forum thread selected by user
   * @param fourmthreadId - thread selected
   */
   displaySelectedForumThread(fourmthreadId: string):void {
    this.forumService.displaySelectForumThread(fourmthreadId).subscribe({
      next:(data:Forumthread)=>
      {
        console.log(data)
        this.forumthread = data;//instantiates the formThread
        //controls if the user can edit a thread
        this.showThreadModifyButton = this.tokenService.get('user') === this.forumthread.username;

        //sorts the comments based on dates and then subtracting the time stamps
        this.forumthread.forumComments.sort((comment1, comment2) => {
          const  date1= new Date(comment1.creationDate);
          const  date2= new Date(comment2.creationDate);

          return date2.getTime() - date1.getTime();
        });
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  /**
   * Displays the form for a user to edit the thread
   */
  displayModifyThread() {

    this.showThreadModifyForm = true;
    this.modifyThreadForm.controls['title'].markAsTouched();
    this.modifyThreadForm.controls['description'].markAsTouched();

  }

  /**
   * commits the changes to a modified thread
   * @param fourmthreadId
   */
  postModifyThread(fourmthreadId:string)
  {
    let activeToken = this.tokenService.get('token');
    const payload: NewForumThreadPayload = {
      title: this.modifyThreadForm.controls['title'].value,
      description: this.modifyThreadForm.controls['description'].value,
      token: activeToken || ""
    }
   this.forumService.modifyForumThread(fourmthreadId,payload).subscribe({
     next: value => {
       this.toaster.success("Playlist successfully updated!")

       this.modifyThreadForm.reset();
       this.displaySelectedForumThread(fourmthreadId)

       this.showThreadModifyForm = false;
       console.log(value);
     },
     error: error => {
       console.log(error.error.message);
       this.toaster.error(error.error.message)
     }
   });

  }

  /**
   * Cancels the form the user was going to edit
   */
  cancelModifyThread()
  {
    this.showThreadModifyForm = false;
  }

  /**
   * Deletes a specific form thread
   * @param fourmthreadId - form thread to delete
   */
  deleteThread(fourmthreadId: string) {

    this.forumService.deleteForumThread(fourmthreadId).subscribe({
      next: ()=>
    {
      this.toaster.success("Forum deleteted!")
      this.displaySelectedForumThread(fourmthreadId)
      this.router.navigate(['/forumthread'])
    },
      error:error=>
    {
      console.log(error.error.message);
      this.toaster.error(error.error.message)
    }
    })
  }
  //---------->Comments functions--------------------->
  /**
   * Cancels the new comment
   */
  cancelComment() {
    this.showCommentForm = false;
  }
  /**
   * displays the input for comments
   */
  displayCommentForum() {
    this.showCommentForm = true;
    this.forumComment.controls['content'].markAsTouched();
  }

  /**
   * Commits a comment to a form thread
   * @param forumthreadId - the form thread getting a comment
   */
  postComment( forumthreadId: string) {

    let activeToken = this.tokenService.get('token');
    const payload: NewForumComment ={
      threadId: forumthreadId,
      content: this.forumComment.controls['content'].value,
      token: activeToken || ""
    }

    this.forumService.postComment(payload).subscribe({
      next: data=>{
        console.log(data);
        this.showCommentForm = false;
        this.displaySelectedForumThread(forumthreadId);
      },
      error: error=>{
        console.log(error.message);
        this.toaster.error(error.message)
      }
    })

  }

  /**
   * Deletes a comment from a form thread
   * @param forumCommentId - the form thread to delete
   * @param forumthreadId - the selected form thread to display
   */
  deleteComment(forumCommentId: string, forumthreadId: string) {
  this.forumService.deleteSelectedComment(forumCommentId).subscribe({
    next: ()=>
    {
      this.toaster.success("Comment deleted!")
      this.displaySelectedForumThread(forumthreadId);
    },
    error:error=>
    {
      console.log(error.error.message);
      this.toaster.error(error.error.message)
    }
  })
  }

  /**
   * allows the user to edit a form thread
   */
  displayModifyComment(forumCommentId: string) {
    this.showCommentModifyForm = true;
    this.selectedCommentId = forumCommentId;
    this.modifyCommentForum.controls['content'].markAsTouched();
  }

  /**
   * committing changes to a form comment
   * @param forumCommentId - the form comment being edited
   * @param forumthreadId - the form thread to display
   */
  postModifyComment(forumCommentId: string,forumthreadId: string ) {
    let activeToken = this.tokenService.get('token');
    const payload: NewForumComment = {
      threadId: this.forumthread.id,
      content: this.modifyCommentForum.controls['content'].value,
      token: activeToken || ""
    };

    this.forumService.modifyComment(forumCommentId, payload).subscribe({
      next: value => {
        console.log(value);
        this.showCommentModifyForm = false;
        this.modifyCommentForum.reset()
        this.displaySelectedForumThread(forumthreadId);
      },
      error: error => {
        console.log(error.message);
        this.toaster.error(error.message);
      }
    });
  }

  /**
   * Cancels the edit comment form
   */
  cancelModifyComment() {
  this.showCommentModifyForm = false;
  }
}
