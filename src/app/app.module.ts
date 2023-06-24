import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { MainmenuComponent } from './pages/mainmenu/mainmenu.component';
import { PlaylistComponent } from './pages/playlist/playlist.component';
import { ForumthreadComponent } from './pages/forumthread/forumthread.component';
import { SelectplaylistComponent } from './pages/selectplaylist/selectplaylist.component';
import { SelectedforumthreadComponent } from './pages/selectedforumthread/selectedforumthread.component';
import {MenunavbarComponent} from "./components/menunavbar/menunavbar.component";
import { InputTextareaModule } from 'primeng/inputtextarea';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    NotFoundComponent,
    RegisterComponent,
    LoginComponent,
    MainmenuComponent,
    PlaylistComponent,
    ForumthreadComponent,
    SelectplaylistComponent,
    SelectedforumthreadComponent,
    MenunavbarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    InputTextareaModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 4500,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    FormsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
