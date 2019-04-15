import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttemptListComponent } from './attempt-list.component';

describe('AttemptListComponent', () => {
  let component: AttemptListComponent;
  let fixture: ComponentFixture<AttemptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttemptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttemptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
