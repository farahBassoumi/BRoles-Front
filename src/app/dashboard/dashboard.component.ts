import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

import { emailModel } from '../models/emailModel.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public users: any = [];
  public resetPasswordEmail!: string;
  public Username: string = this.userService.getUsernameLH()!;
  public Role: string = this.userService.getRoleLH()!;
public filteredUsers:any=[];
public filterText:string='';








  constructor(
    private router: Router,
    private userService: UserService
  ) {}

ngOnChange():void{


  
    this.filteredUsers=this.filterUserByUsername(this.filterText);
    


}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((res) => {
      this.users = res;
      this.filteredUsers=res;
      console.log('inside the getusers()');
      console.log(this.users);
      console.log(res);
    });
  }

  isRoleAdmin(): boolean {
    return this.Role == 'Admin';
  }

  logout() {
    // const confirmation=confirm('you sure you wanna logout?');
    // //localStorage.removeItem('token');
    // if(confirmation){
    this.router.navigate(['login']);
  }

  //public isValidEmail!: boolean;

  checkValidEmail(event: string):boolean {
    const value = event;
    const pattern = /^[\w-|.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var isValidEmail = pattern.test(value);
   return (isValidEmail);
    console.log('isvalid email:  ' + isValidEmail);
  }

  close(){
  const buttonRef = document.getElementById('BtnClose');
  buttonRef?.click();

  }



  setEmail(email: any):void{
   this.resetPasswordEmail=email;

  }

  resetPassword() {
  
    console.log(this.resetPasswordEmail);
     

    if (this.checkValidEmail(this.resetPasswordEmail)) {
      const buttonRef = document.getElementById('BtnClose');
      buttonRef?.click();

      const emailmodel: emailModel = {
        email: this.resetPasswordEmail,
      };

      this.userService.sendResetPasswordLink(emailmodel).subscribe({
        next: (res) => {
          console.log('emailmodel.email:  ' + emailmodel.email);
          console.log(res);
          this.userService.storeEmailTokenResetLH(res.emailToken);
          console.log('inside the dashboard');

          console.log('email  ' + res.email);
          console.log('emailtoken  ' + res.emailToken);
          this.userService.storeEmailResetLH(emailmodel.email);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }





  activatdDesactivate(email:string){
    console.log("inside the activatedesactivated");
  
    this.userService.desactivateActivate(email).
  subscribe({
 next:(res)=> {
    console.log(res);
    console.log(" activatedesactivated"+res.desactivated);
    console.log("inside the activatedesactivated");
    location.reload();
      this.router.navigate(['dashboard']);
   //this.desactivated=res.desactivated;
 },
  error:(err)=>{
    console.log(err);
  }




  })

  }



filterUserByUsername(filterTerm:string){
console.log('inside the filter usersssssssss');

if(this.users.length=== 0|| this.filterText===''){
  console.log('inside the filter usersssssssss');
  return this.users;

}else{
  console.log('inside the filter usersssssssss');
  return this.users.filter((user:any)=>{
return user.Username===filterTerm.toLocaleLowerCase()

  })
}




}












}
