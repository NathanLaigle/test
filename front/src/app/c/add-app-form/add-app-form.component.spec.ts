import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAppFormComponent } from './add-app-form.component';

describe('AddAppFormComponent', () => {
  let component: AddAppFormComponent;
  let fixture: ComponentFixture<AddAppFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAppFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAppFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
