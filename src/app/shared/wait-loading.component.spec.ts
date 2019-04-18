import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WaitLoadingComponent } from './wait-loading.component';

describe('WaitLoadingComponent', () => {
  let component: WaitLoadingComponent;
  let fixture: ComponentFixture<WaitLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WaitLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WaitLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
