import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const user = sessionStorage.getItem('user');
  console.log(user)
  if (!user) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
