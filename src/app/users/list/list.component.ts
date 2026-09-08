import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {
  users: any[] = [];
  loading = false;
  showForm = false;
  currentUserId: number | null = null;

  roles = ['admin', 'hr', 'staff'];

  newUser = { username: '', password: '', role: 'staff' };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUser()?.id ?? null;
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAll().subscribe({
      next: (res) => { this.users = res; this.loading = false; },
      error: () => {
        this.snackBar.open('Gagal memuat data user', 'Tutup', { duration: 3000 });
        this.loading = false;
      }
    });
  }

  onAdd() {
    if (!this.newUser.username || !this.newUser.password) {
      this.snackBar.open('Username dan password wajib diisi', 'Tutup', { duration: 3000 });
      return;
    }
    this.userService.create(this.newUser).subscribe({
      next: () => {
        this.snackBar.open('User berhasil ditambahkan', 'Tutup', { duration: 3000 });
        this.newUser = { username: '', password: '', role: 'staff' };
        this.showForm = false;
        this.loadUsers();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menambah user', 'Tutup', { duration: 3000 })
    });
  }

  onToggleActive(user: any) {
    this.userService.update(user.id, { is_active: !user.is_active }).subscribe({
      next: () => { this.loadUsers(); },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal mengubah status', 'Tutup', { duration: 3000 })
    });
  }

  onChangeRole(user: any, role: string) {
    this.userService.update(user.id, { role }).subscribe({
      next: () => {
        this.snackBar.open('Role berhasil diubah', 'Tutup', { duration: 3000 });
        this.loadUsers();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal mengubah role', 'Tutup', { duration: 3000 })
    });
  }

  onDelete(user: any) {
    if (!confirm(`Hapus user "${user.username}"?`)) return;
    this.userService.remove(user.id).subscribe({
      next: () => {
        this.snackBar.open('User dihapus', 'Tutup', { duration: 3000 });
        this.loadUsers();
      },
      error: (err) => this.snackBar.open(err.error?.message || 'Gagal menghapus', 'Tutup', { duration: 3000 })
    });
  }

}
