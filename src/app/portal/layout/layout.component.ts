import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout',
  standalone: false,
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class PortalLayoutComponent {
  constructor(public authService: AuthService) {}

  get user() {
    return this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }

}
