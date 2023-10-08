import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserRegister } from '../models/userRegister.model';
import { UserService } from '../services/user.service';
import { NgModel } from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit  {


public alreadyExists=false;
public passwordType="password";


  ngOnInit():void{
    this.alreadyExists=false;
    this.passwordType="password";


  }

  constructor( private router: Router,  private userService: UserService)
  {

  }

RegisterUserRequest:UserRegister ={
Id:'',
Username:'',
Password:'',
Email:'',
Salary:0,
Role:'',
Desactivated:false
};

adminRole(){
  this.RegisterUserRequest.Role="Admin";
}

userRole(){
  this.RegisterUserRequest.Role="User";
}

 changePasswordType(): void
{

  if(this.passwordType=="password"){
this.passwordType="text";

  }
else{
  this.passwordType="password";
}
}

registerUser(){
  this.userService.RegisterUser(this.RegisterUserRequest)
   .subscribe({
   next: (response: any)=>{ 
if(response.statuscode==400){
console.log("usename already exists");
this.alreadyExists=true;

}

else{




     console.log(response);
    console.log(this.RegisterUserRequest);
    console.log("response.token"+response.token);
    //this.userService.storeToken(response.token);
  this.router.navigate(['login']);
}
   }
  });}



}

