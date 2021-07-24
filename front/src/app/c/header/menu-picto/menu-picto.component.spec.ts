import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuPictoComponent } from './menu-picto.component';

describe('MenuPictoComponent', () => {
  let component: MenuPictoComponent;
  let fixture: ComponentFixture<MenuPictoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuPictoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuPictoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
