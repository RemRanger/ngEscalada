import { TestBed, async, inject } from '@angular/core/testing';

import { SessionDetailGuard } from './session-detail.guard';

describe('SessionDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SessionDetailGuard]
    });
  });

  it('should ...', inject([SessionDetailGuard], (guard: SessionDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
