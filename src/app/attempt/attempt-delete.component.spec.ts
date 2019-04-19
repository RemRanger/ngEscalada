import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptDeleteComponent } from './attempt-delete.component';

describe('AttemptDeleteComponent', () => {
  let component: AttemptDeleteComponent;
  let fixture: ComponentFixture<AttemptDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
