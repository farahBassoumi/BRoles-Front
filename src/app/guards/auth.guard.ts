import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
  //window.location.reload();
 const token=localStorage.getItem('token');
console.log("inside the authGuard");
console.log("token: "+token);

  if (token){
  return true;
}else{
  console.log("token is null");
  //this.toast.error(detail:"eroor",summary:"pleaselogin first");
    router.navigate(['login'])
    return false;
}
};
