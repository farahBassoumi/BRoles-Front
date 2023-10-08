import { Component, OnInit } from '@angular/core';
import { UserLogin } from '../models/userLogin.model';
import { FormGroup, NgModel, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { emailModel } from '../models/emailModel.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public resetPasswordEmail!: string;
  public email: any;
  public desactivated: boolean = false;
  public inputRedUser: boolean = false;
  public inputRedPassword: boolean = false;
  public userNotFound: boolean = false;
  public passwordType="password";

  public loginForm = new FormGroup({
    Username: new FormGroup(''),
    Password: new FormGroup(''),
  });

  ngOnInit(): void {
    console.log('inside the login oninit');
    localStorage.removeItem('token');
    localStorage.removeItem('EmailTokenReset');
    this.passwordType="password";

  }

  userlogin: UserLogin = {
    Username: '',
    Password: '',
  };

  constructor(private router: Router, private userService: UserService) {}


  changePasswordType(): void
  {
  
    if(this.passwordType=="password"){
  this.passwordType="text";
  
    }
  else{
    this.passwordType="password";
  }
  }

  authentificate() {
    console.log('inside the is authentificate');
    this.userService.Authentificate(this.userlogin).subscribe({
      next: (response: any) => {
        console.log('response.StatusCode: ' + response.statusCode);
        if (response.statusCode == 404) {
          //user not found
          console.log('user not found ');
          this.inputRedUser = true;
          this.inputRedPassword = true;
        } else if (response.statusCode == 400) {
          //wrong password
          console.log('wrong password');
          this.inputRedUser = false;
          this.inputRedPassword = true;
        } else {
          console.log('user found');
          this.userService.storeToken(response.token);
          console.log('inside the authentificate method' + response.token);
          var tokenfrollocalhost = this.userService.getToken();
          console.log('tokenfrollocalhost' + tokenfrollocalhost);
          this.userService.storeUsernameLH(response.username);
          console.log(response.desactivated);
          this.desactivated = response.desactivated;

          this.userService.storeRoleLH(response.role);
          this.userService.storeEmailLH(response.email);
          this.email = response.email;

          console.log('outside the auth api');
          //  this.router.navigate(['dashboard']);

          console.log('after the call : ' + this.desactivated);
          if (this.desactivated == false) {
            console.log('you will be redirected to the dashboard template');
            this.router.navigate(['dashboard']);
          } else {
            console.log('you will be redirected to a new template');
            this.router.navigate(['desactivated']);
          }
        }
      },
      error: (err: any) => {},
    });

    console.log('completed');
  }

  // isdesactivated(){
  //   console.log("inside the desactivated");

  // this.userService.getuser(this.email).subscribe({
  //   next:(res)=>{
  //     this.desactivated=res.desactivated;

  //     console.log(" sucess and desactivated: "+this.desactivated);

  //   },
  //   error:(err)=>{
  //     console.log(err);
  //     console.log(" error ");

  //   }

  // })

  // }

  // isdesactivatedd(){
  //   console.log("inside the is desactivated");
  //   console.log("this.email"+this.email);
  //   this.userService.desactivateActivate(this.email).
  //  subscribe({
  //   next:(res)=> {
  //      console.log(res);
  //     this.desactivated=res.desactivated;
  //    console.log("first desactivated: "+this.desactivated);

  //   }
  // });

  //  this.userService.desactivateActivate(this.email).
  //  subscribe({
  // next:(res)=> {
  //    console.log(res);
  //   this.desactivated=res.desactivated;
  //  console.log("second desactivated: "+this.desactivated);

  // },

  //  error:(err)=>{
  //    console.log(err);
  //  }

  //  })
  // }

  redirect() {
    this.router.navigate(['register']);
  }

  public isValidEmail!: boolean;

  checkValidEmail(event: string) {
    const value = event;
    const pattern = /^[\w-|.]+@([\w-]+\.)+[\w-]{2,4}$/;
    this.isValidEmail = pattern.test(value);
    return this.isValidEmail;
  }

  // confirmToSend(){}
  //   if(this.isValidEmail){
  //     console.log(this.resetPasswordEmail);
  //     //this.resetPasswordEmail="";
  // const buttonRef=document.getElementById("BtnClose");
  // buttonRef?.click();
  // this.resetPasswordService.sendResetPasswordLink(this.resetPasswordEmail)
  // .subscribe({
  //   next:(res)=>{
  //   console.log(res)
  // }
  //   ,
  //   error:(err)=>{}

  // }
  // );
  //   }

  // }
}
