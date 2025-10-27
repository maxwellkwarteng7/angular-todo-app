import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { unauthenticatedGuardGuard } from './unauthenticated-guard.guard';

describe('unauthenticatedGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => unauthenticatedGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
