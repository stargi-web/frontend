import { CanActivateFn } from '@angular/router';

export const hasRoleGuard: CanActivateFn = (route, state) => {
  const allowedRoles=route.data?.['allowedRoles'];
  const userRoles=sessionStorage.getItem('roles');
  console.log("Roles permitidos: ",allowedRoles,"Rol actual: ",userRoles);
  return allowedRoles.includes(userRoles)? true:false;
};
