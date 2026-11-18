import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SidebarComponent implements OnInit {
  isAdmin = false;
  isAdminOrHr = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.hasRole('admin');
    this.isAdminOrHr = this.authService.hasRole('admin', 'hr');
  }

}
