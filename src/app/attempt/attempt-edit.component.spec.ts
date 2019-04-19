import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptEditComponent } from './attempt-edit.component';

describe('AttemptEditComponent', () => {
  let component: AttemptEditComponent;
  let fixture: ComponentFixture<AttemptEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
