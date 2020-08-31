import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCarsListComponent } from './admin-cars-list.component';

describe('AdminCarsListComponent', () => {
  let component: AdminCarsListComponent;
  let fixture: ComponentFixture<AdminCarsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCarsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCarsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
