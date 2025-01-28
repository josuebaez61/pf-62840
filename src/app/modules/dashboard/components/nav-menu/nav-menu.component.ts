import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  standalone: false,

  templateUrl: './nav-menu.component.html',
  styles: ``,
})
export class NavMenuComponent {
  constructor(private router: Router) {}

  logout(): void {
    localStorage.removeItem('token');
    // navigacion /auth/login
    this.router.navigate(['auth', 'login']);
  }
}
