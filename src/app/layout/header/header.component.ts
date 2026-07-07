import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  @Input() title = '';
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
  }

  logout() {
    this.authService.logout();
  }
}
