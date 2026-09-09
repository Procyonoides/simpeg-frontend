import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeRequestsComponent } from './change-requests.component';

describe('ChangeRequestsComponent', () => {
  let component: ChangeRequestsComponent;
  let fixture: ComponentFixture<ChangeRequestsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeRequestsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChangeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
