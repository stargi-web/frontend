import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/Auth/authService';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService);
  const router=inject(Router);
  if(authService.isLogged()){
    return true;
  }
  else{
    const urlTreeReturn=router.createUrlTree(["/login"]);
    return urlTreeReturn;
  }
};
