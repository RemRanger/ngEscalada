import { TestBed, async, inject } from '@angular/core/testing';

import { SessionListGuard } from './session-list.guard';

describe('SessionListGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionListGuard]
    });
  });

  it('should ...', inject([SessionListGuard], (guard: SessionListGuard) => {
    expect(guard).toBeTruthy();
  }));
});
