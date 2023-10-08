import { Injectable } from '@angular/core';
import { UserRegister } from '../models/userRegister.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { UserLogin } from '../models/userLogin.model';
import{JwtHelperService} from '@auth0/angular-jwt'
import { emailModel } from '../models/emailModel.model';
import { ResetPassword } from '../models/ResetPassword.model';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  
//  private userPayload: any;
  baseApiUrl: string = environment.apiKey;
  emailmodel:emailModel={
    email:''
  }

  constructor(public http:HttpClient){
   // this.userPayload=this.decodedToken();
   }

  RegisterUser(RegisterUserRequest: UserRegister):Observable<UserRegister> {
    RegisterUserRequest.Id='00000000-0000-0000-0000-000000000000';
  return this.http.post <UserRegister> (this.baseApiUrl+'/api/Auth/register',RegisterUserRequest);
  
  }

Authentificate(userLoginRequest:UserLogin):Observable<UserLogin>{
  return this.http.post<UserLogin>(this.baseApiUrl+'/api/Auth/login',userLoginRequest);
}


sendResetPasswordLink(emailinput:emailModel):Observable <any>{

  console.log('inside the password service this is the email  '+emailinput);

 // const params = { myParam: email };
  return this.http.post<any>('https://localhost:7170/api/Auth/send-reset-email',emailinput);
}


resetPassword(restPasswordObj:any):Observable <any>{
  return this.http.post<any>(this.baseApiUrl+'/api/Auth/reset-password',restPasswordObj);
 }


 desactivateActivate(email:string):Observable <any>{
  
this.emailmodel.email=email;

return this.http.post<any>(this.baseApiUrl
  +'/api/Auth/activateddesactivated',this.emailmodel);

 }






 sendPassword(user:UserRegister):Observable <any>{
  
  
  
  return this.http.post<any>(this.baseApiUrl
    +'/api/Auth/send-password',user);
  
   }

   

// getuser(email:string):Observable <any>{
  
//   this.emailmodel.email=email;
  
//   return this.http.post<any>(this.baseApiUrl
//     +'/api/Auth/getUser',this.emailmodel);
  
//    }



getUsers(){
  return this.http.get<any>(this.baseApiUrl
    +'/api/Auth')
}

 storeToken(tokenValue:string){
   localStorage.setItem('token',tokenValue)
 }

 getToken(){
   return localStorage.getItem('token');
 }

storeUsernameLH(UsernameValue:string){
  localStorage.setItem('Username',UsernameValue)
}
getUsernameLH(){
  return localStorage.getItem('Username');
}



storeRoleLH(RoleValue:string){
  localStorage.setItem('Role',RoleValue)
}
getRoleLH(){
  return localStorage.getItem('Role');
}

storeEmailLH(EmailValue:string){
  localStorage.setItem('Email',EmailValue)
}
getEmailLH(){
  return localStorage.getItem('Email');
}



storeEmailResetLH(EmailResetValue:string){
  localStorage.setItem('EmailReset',EmailResetValue)
}
getEmailResetLH(){
  return localStorage.getItem('EmailReset');
}


storeEmailTokenResetLH(RoleValue:string){
  localStorage.setItem('EmailTokenReset',RoleValue)
}
getEmailTokenResetLH(){
  return localStorage.getItem('EmailTokenReset');
}


















isLoggedIn():boolean{
  return !! localStorage.getItem('token');
  //the (!!) converts the string to a boolean value
}

// decodedToken(){
//   console.log("inside the decodeToken");
//   const jwtHelper=new JwtHelperService();
//   const token=this.getToken()!;
//   console.log("token: "+token);
//   //we use the ! to make suree that the token variable is defined indeed
//   console.log('jwthelper: username '+jwtHelper.decodeToken(token).Username);
//   return jwtHelper.decodeToken(token);
//   }


// getUsernameFromToken(){
//   if(this.userPayload){
//     console.log('inside the getusrnamefromtoken');
//     console.log("payload: "+this.userPayload.Username);
//     return this.userPayload.Username;
//   }
// }

// getRoleFromToken(){
//   if(this.userPayload){
//     return this.userPayload.Role;
//   }
// }




 
}
