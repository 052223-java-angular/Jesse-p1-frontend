import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthServiceService} from "../../services/auth-service.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {LoginPayload} from "src/app/models/login-payload";
import {SpotifyapicallsService} from "../../services/spotifyapicalls.service";
import {TokenserviceService} from "../../services/tokenservice.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup
  //Inject the authService. You don't have to data bind to the fields it is done automatically
  //Form builder -
  constructor(private fb: FormBuilder,
              private authService: AuthServiceService,
              private spotifyAPI: SpotifyapicallsService,
              private router: Router,
              private toastr: ToastrService,
              private tokenService: TokenserviceService) {}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username:['', Validators.required],
      password:['', Validators.required],

    })
  }

  submitForm(): void{
    if(this.loginForm.invalid){

      this.loginForm.controls['username'].markAsTouched();

      this.loginForm.controls['password'].markAsTouched();

      this.loginForm.reset();
      console.log(this.loginForm.controls['username'].markAllAsTouched())
      return;
    }

    //Payload to send to the backend
    const payload: LoginPayload={
      username:this.loginForm.controls['username'].value,
      password:this.loginForm.controls['password'].value,
    }

    //call a service to send payload to the backend api
    //Because it returns an observable you have to subscribe to it
    //subscribe take two call back methods next and error
    this.authService.login(payload).subscribe({
      next: value => {
        this.toastr.success('Login successful...');

        console.log(value);
        //localStorage.setItem('key', JSON.stringify(value))
        //this.tokenService.set('key', JSON.stringify(value))
        //console.log(localStorage.getItem('key'));
        localStorage.setItem('token', value.token.toString())
        localStorage.setItem('user', value.username.toString())
        this.spotifyAPI.spotifyAuth();

        this.router.navigate(['/mainmenu']);

      },
      error: error => {
        console.log(error.error.message);
        this.toastr.error(error.error.message);
      }
    });
  }


}
