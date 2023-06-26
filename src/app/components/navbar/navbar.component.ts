import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  loginStatus: boolean = false;

  ngOnInit(): void {
    this.checkLoginStatus();

  }

  checkLoginStatus(): void {
    this.loginStatus = !!localStorage.getItem('user');

  }

  logOut(): void {
    localStorage.removeItem('user');
    this.loginStatus = false;

  }
  handleStorageChange(event: StorageEvent): void {
    if (event.key === 'user') {
      this.checkLoginStatus();
    }
  }

}
