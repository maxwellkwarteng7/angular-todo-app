import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";

export const authGuard: CanActivateFn = (route, state) => {
  //  checking if the person is authenticated
  let router = inject(Router);
  
  const token = localStorage.getItem("token");
  if (!token) {
    return router.navigateByUrl("/login");;
  } 
  return true;
};
