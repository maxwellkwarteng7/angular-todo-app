
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const unauthenticatedGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); 
  if (token) {
    return router.navigate(['/todo']);
  }
  return true;
};
