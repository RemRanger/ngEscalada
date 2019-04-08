import { TestBed } from '@angular/core/testing';

import { ClimberService } from './climber.service';

describe('ClimberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClimberService = TestBed.get(ClimberService);
    expect(service).toBeTruthy();
  });
});
