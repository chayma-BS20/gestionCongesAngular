import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CongesAddComponent } from './conges-add.component';

describe('CongesAddComponent', () => {
  let component: CongesAddComponent;
  let fixture: ComponentFixture<CongesAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CongesAddComponent]
    });
    fixture = TestBed.createComponent(CongesAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
