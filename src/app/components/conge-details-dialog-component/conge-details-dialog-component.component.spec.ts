import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongeDetailsDialogComponentComponent } from './conge-details-dialog-component.component';

describe('CongeDetailsDialogComponentComponent', () => {
  let component: CongeDetailsDialogComponentComponent;
  let fixture: ComponentFixture<CongeDetailsDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongeDetailsDialogComponentComponent]
    });
    fixture = TestBed.createComponent(CongeDetailsDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
