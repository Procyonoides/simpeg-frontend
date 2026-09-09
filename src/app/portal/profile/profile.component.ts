import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  loading = false;
  saving = false;
  uploadingPhoto = false;

  // Field kontak yang boleh diedit langsung
  editForm = { phone: '', address: '', bank_account: '' };

  // Pengajuan ganti nama
  nameRequest = '';
  submittingNameRequest = false;
  myRequests: any[] = [];

  photoPreviewUrl: string | null = null;
  selectedFile: File | null = null;

  constructor(
    private portalService: PortalService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadProfile();
    this.loadMyRequests();
  }

  loadProfile() {
    this.loading = true;
    this.portalService.getProfile().subscribe({
      next: (res) => {
        this.profile = res;
        this.editForm = {
          phone: res.phone || '',
          address: res.address || '',
          bank_account: res.bank_account || ''
        };
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  loadMyRequests() {
    this.portalService.getMyChangeRequests().subscribe({
      next: (res) => { this.myRequests = res; },
      error: () => {}
    });
  }

  get pendingNameRequest() {
    return this.myRequests.find(r => r.field_name === 'full_name' && r.status === 'pending');
  }

  saveContactInfo() {
    this.saving = true;
    this.portalService.updateProfile(this.editForm).subscribe({
      next: () => {
        this.snackBar.open('Data berhasil diperbarui', 'Tutup', { duration: 3000 });
        this.saving = false;
        this.loadProfile();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal menyimpan', 'Tutup', { duration: 3000 });
        this.saving = false;
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;
    this.selectedFile = input.files[0];

    const reader = new FileReader();
    reader.onload = () => { this.photoPreviewUrl = reader.result as string; };
    reader.readAsDataURL(this.selectedFile);
  }

  uploadPhoto() {
    if (!this.selectedFile) return;
    this.uploadingPhoto = true;
    this.portalService.uploadPhoto(this.selectedFile).subscribe({
      next: () => {
        this.snackBar.open('Foto berhasil diperbarui', 'Tutup', { duration: 3000 });
        this.uploadingPhoto = false;
        this.selectedFile = null;
        this.photoPreviewUrl = null;
        this.loadProfile();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal upload foto (maks 2MB, format JPG/PNG/WEBP)', 'Tutup', { duration: 4000 });
        this.uploadingPhoto = false;
      }
    });
  }

  submitNameRequest() {
    if (!this.nameRequest.trim()) return;
    this.submittingNameRequest = true;
    this.portalService.requestChange('full_name', this.nameRequest.trim()).subscribe({
      next: (res) => {
        this.snackBar.open(res.message, 'Tutup', { duration: 4000 });
        this.submittingNameRequest = false;
        this.nameRequest = '';
        this.loadMyRequests();
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Gagal mengirim pengajuan', 'Tutup', { duration: 4000 });
        this.submittingNameRequest = false;
      }
    });
  }

  photoUrl(): string {
    if (this.photoPreviewUrl) return this.photoPreviewUrl;
    if (this.profile?.photo_url) return `http://localhost:3000${this.profile.photo_url}`;
    return '';
  }

}
