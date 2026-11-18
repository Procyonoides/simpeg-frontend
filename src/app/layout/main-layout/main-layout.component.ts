import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-main-layout',
    templateUrl: './main-layout.component.html',
    styleUrl: './main-layout.component.scss',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class MainLayoutComponent {
  title = 'Dashboard';

}
