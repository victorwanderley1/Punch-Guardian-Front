import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPontosComponent } from './registro-pontos.component';

describe('RegistroPontosComponent', () => {
  let component: RegistroPontosComponent;
  let fixture: ComponentFixture<RegistroPontosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPontosComponent]
    });
    fixture = TestBed.createComponent(RegistroPontosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
