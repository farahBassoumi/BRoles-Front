import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private userService:UserService ) {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const myToken=this.userService.getToken();
    if(myToken){
request=request.clone({
  setHeaders:{Authorization:`Bearer ${myToken}`}
  
}) }
    
    return next.handle(request);
  }
}
