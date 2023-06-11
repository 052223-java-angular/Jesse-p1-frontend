import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit{
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder) {
  }
  ngOnInit(): void {
    this.formGroup = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],
      confirmPassword:['', Validators.required]
    })
  }

}
