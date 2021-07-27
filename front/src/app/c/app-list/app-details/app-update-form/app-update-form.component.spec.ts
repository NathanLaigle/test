import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUpdateFormComponent } from './app-update-form.component';

describe('AppUpdateFormComponent', () => {
  let component: AppUpdateFormComponent;
  let fixture: ComponentFixture<AppUpdateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUpdateFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
