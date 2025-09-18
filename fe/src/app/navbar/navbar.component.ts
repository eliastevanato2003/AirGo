import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
  }

  login() {
    this.router.navigate(['/login']);
  }

  home() {
    this.router.navigate(['/']);
  }

  profile() {
    this.router.navigate(['/profile'])
  }

  logout() {
    this.authService.logout();
    this.home();
  }
}
