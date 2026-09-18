import { Component, OnInit } from '@angular/core';
import { PortalService } from '../../services/portal.service';

@Component({
  selector: 'app-directory',
  standalone: false,
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent implements OnInit {
  employees: any[] = [];
  pagination: any = { page: 1, limit: 20, total: 0, totalPages: 1 };
  loading = false;
  searchTerm = '';

  constructor(private portalService: PortalService) {}

  ngOnInit() {
    this.load(1);
  }

  load(page: number) {
    this.loading = true;
    this.portalService.getDirectory(this.searchTerm, page, this.pagination.limit).subscribe({
      next: (res) => {
        this.employees = res.employees;
        this.pagination = res.pagination;
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  onSearch() {
    this.load(1);
  }

  prevPage() {
    if (this.pagination.page > 1) this.load(this.pagination.page - 1);
  }

  nextPage() {
    if (this.pagination.page < this.pagination.totalPages) this.load(this.pagination.page + 1);
  }

  photoUrl(emp: any): string {
    return emp.photo_url ? `http://localhost:3000${emp.photo_url}` : '';
  }

}
