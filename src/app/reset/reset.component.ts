import { Component, OnInit } from '@angular/core';
import { ResetPassword } from '../models/ResetPassword.model';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
 
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit{
                                              

  private intervalId: any;
  public Email:string=this.userService.getEmailResetLH()!;
  public EmailToken:string=this.userService.getEmailTokenResetLH()!;
     char='"';
    //  this.EmailToken=this.EmailToken+this.char;
 
 constructor(
  private userService :UserService,private router: Router, private activatedRoute:ActivatedRoute){}

  ngOnInit(): void {

    console.log("inside the ngOnInit");
    console.log("email  "+this.Email);
    console.log("email.token  "+this.EmailToken);

   }

 matched:boolean=true;

    resetpassword:ResetPassword=
    {
      email:this.Email,
      emailToken:this.EmailToken,
    newPassword:'',
    confirmPassword:'',
    }
  



  resetPassword(){
    console.log("inside reset password!!!!");
    const jsonObject = JSON.stringify(this.resetpassword);
    console.log("resetpassword  "+this.resetpassword.newPassword);
    console.log("confirm password  "+this.resetpassword.confirmPassword);
    console.log("email  "+this.resetpassword.email);
    console.log("email.token  "+this.resetpassword.emailToken);
    console.log("jsonObject "+this.resetpassword);
    this.userService.resetPassword(this.resetpassword).
    subscribe({
      next:(res)=>{
        console.log("Sucesssss!!!!")
      console.log(res);
      this.router.navigate(['/login']);
      },
      error:(err)=>{
        console.log("ERROORRR!!!!");
        console.log(err);
      }
        })
    
    ;}


  checkPasswordMatch() {
    console.log("inside checkpasssword match!!!!");
    //var newPassword=document.getElementById("newPassword") as HTMLInputElement;
    //var confirmPassword = document.getElementById("confirmPassword")as HTMLInputElement;
    //var confirmPasswordcase = document.getElementById("confirmPassword");

    if (this.resetpassword.newPassword != this.resetpassword.confirmPassword) 
    {
     this.matched=false;
     alert("not matched");
    }
  else{
//this.EmailToken=this.EmailToken.replace(/ /g,'+');
 this.resetpassword.email=this.Email;
this.resetpassword.emailToken=this.EmailToken;



this.resetPassword();

  }

  }
}