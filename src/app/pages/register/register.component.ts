import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterPayload} from "../../models/register-payload";
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {ToastrModule, ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  //Inject the authService. You don't have to data bind to the fields it is done automatically
  //Form builder -
  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private router: Router,
              private toastr: ToastrService) {}
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username:['', Validators.required],
      firstname:['', Validators.required],
      lastname:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    })
  }

  submitForm(): void{
    if(this.registerForm.invalid){
      const username = this.registerForm.controls['username'].value;
      if (username.length ===0){
        this.registerForm.controls['username'].markAsTouched();
      }
      this.registerForm.controls['firstname'].markAsTouched();
      this.registerForm.controls['lastname'].markAsTouched();
      this.registerForm.controls['email'].markAsTouched();
      this.registerForm.controls['password'].markAsTouched();
      this.registerForm.controls['confirmPassword'].markAsTouched();
      this.registerForm.reset();
      console.log(this.registerForm.controls['username'].markAllAsTouched())
      return;
    }

    //Payload to send to the backend
    const payload: RegisterPayload={
      username:this.registerForm.controls['username'].value,
      firstname:this.registerForm.controls['firstname'].value,
      lastname:this.registerForm.controls['lastname'].value,
      email:this.registerForm.controls['email'].value,
      password:this.registerForm.controls['password'].value,
      confirmPassword:this.registerForm.controls['confirmPassword'].value,
    }

    //call a service to send payload to the backend api
    //Because it returns an observable you have to subscribe to it
    //subscribe take two call back methods next and error
    this.authService.register(payload).subscribe({
      next: value => {
        this.toastr.success('Registration successful...')
        console.log(value);
        this.router.navigate(['/login']);
      },
      error: error => {
        console.log(error.error.message);
        this.toastr.error(error.error.message)
      }
    });
  }
}
