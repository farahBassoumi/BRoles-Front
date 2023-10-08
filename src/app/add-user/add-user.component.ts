import { Component } from '@angular/core';
import { addUser } from '../models/addUser.model';
import { UserRegister } from '../models/userRegister.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {


  ngOnInit():void{

  }

  constructor( private router: Router,  private userService: UserService)
  {

  }


  addUserRequest:UserRegister ={
    Id:'',
    Username:'',
    Password:'',
    Email:'',
    Salary:0,
    Role:'User',
    Desactivated:false
    };
addUser(){

console.log("inside the adduser");
console.log(this.addUserRequest);

if(this.addUserRequest.Email==''){
  this.addUserRequest.Password='Azerty123';
}
else{

this.userService.sendPassword(this.addUserRequest).
subscribe({

  next:(response: any)=>{ 
    console.log(response);
},
error:(err)=>{
console.log(err)
}


});}



   this.userService.RegisterUser(this.addUserRequest)
    .subscribe({
    next: (response: any)=>{ 
      console.log(response);
     console.log(this.addUserRequest);
  
     alert("user added!");

     this.router.navigate(['dashboard']);

 },
 error:(err)=>{
  console.log(err);
 }
   });

}
  

}
