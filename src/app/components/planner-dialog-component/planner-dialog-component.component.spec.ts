import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlannerDialogComponentComponent } from './planner-dialog-component.component';

describe('PlannerDialogComponentComponent', () => {
  let component: PlannerDialogComponentComponent;
  let fixture: ComponentFixture<PlannerDialogComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlannerDialogComponentComponent]
    });
    fixture = TestBed.createComponent(PlannerDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
