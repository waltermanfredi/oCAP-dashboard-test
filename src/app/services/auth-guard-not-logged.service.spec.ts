import { TestBed } from '@angular/core/testing';

import { AuthGuardNotLoggedService } from './auth-guard-not-logged.service';

describe('AuthGuardNotLoggedService', () => {
  let service: AuthGuardNotLoggedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGuardNotLoggedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
