import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { profile } from 'console';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  standalone: true
})
export class NavbarComponent implements OnInit {

  public isLoggedIn = false;
  public userRole: number | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(status => {
      this.isLoggedIn = status;
    });
    this.userRole = this.authService.getRole();
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
    if (confirm('Sei sicuro di voler effettuare il logout?')) {
      this.authService.logout();
      this.home();
    }
  }

  airplanes(){
    this.router.navigate(['/airplanes']); 
  }

  airlineprofile(){
    this.router.navigate(['/airline-profile']);
  }

  adminairlines(){
    this.router.navigate(['/admin-airlines']);
  }

  flights() {
    this.router.navigate(['/airline-flights']);
  }

  models() {
    this.router.navigate(['/models']);
  }

  routes() {
    this.router.navigate(['/routes']);
  }

  adminairports(){
    this.router.navigate(['/admin-airports']);
  }

  adminmodels(){
    this.router.navigate(['/admin-models'])
  }

}
