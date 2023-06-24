import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {RegisterComponent} from "./pages/register/register.component";
import {LoginComponent} from "./pages/login/login.component";
import {MainmenuComponent} from "./pages/mainmenu/mainmenu.component";
import {PlaylistComponent} from "./pages/playlist/playlist.component";
import {SelectplaylistComponent} from "./pages/selectplaylist/selectplaylist.component";
import {ForumthreadComponent} from "./pages/forumthread/forumthread.component";
import {SelectedforumthreadComponent} from "./pages/selectedforumthread/selectedforumthread.component";

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'mainmenu', component: MainmenuComponent},
  {path:'playlist', component: PlaylistComponent},
  {path:'forumthread', component: ForumthreadComponent},
  {path:'select/forum/:id', component:SelectedforumthreadComponent},
  {path:'select/playlist/:id', component: SelectplaylistComponent},
  {path: '**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
