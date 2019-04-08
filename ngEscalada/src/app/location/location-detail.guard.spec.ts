import { TestBed, async, inject } from '@angular/core/testing';

import { LocationDetailGuard } from './location-detail.guard';

describe('LocationDetailGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationDetailGuard]
    });
  });

  it('should ...', inject([LocationDetailGuard], (guard: LocationDetailGuard) => {
    expect(guard).toBeTruthy();
  }));
});
