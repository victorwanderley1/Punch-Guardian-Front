import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RetroativoComponent } from './retroativo.component';

describe('RetroativoComponent', () => {
  let component: RetroativoComponent;
  let fixture: ComponentFixture<RetroativoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RetroativoComponent]
    });
    fixture = TestBed.createComponent(RetroativoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
