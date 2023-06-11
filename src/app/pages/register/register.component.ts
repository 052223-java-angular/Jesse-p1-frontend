import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {RegisterPayload} from "../../models/register-payload";
import {AuthServiceService} from "../../services/auth-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  registerForm!: FormGroup;

  //Inject the authService. You don't have to data bind to the fields it is done automatically
  constructor(private fb: FormBuilder, private authService: AuthServiceService) {
  }
  ngOnInit(): void {
    this.registerForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    })
  }

  submitForm(): void{
    if(this.registerForm.invalid){
      return;
    }

    const payload: RegisterPayload={
      username:this.registerForm.controls['username'].value,
      password:this.registerForm.controls['password'].value,
      confirmPassword:this.registerForm.controls['confirmPassword'].value,
    }

    //call a service to send payload to the backend api
    //Because it returns an observable you have to subscribe to it
    //subscribe take two call back methods next and error
    this.authService.register(payload).subscribe({
      next: value => {},
      error: err => {}
    })
    console.log(this.registerForm.value);
  }

}
