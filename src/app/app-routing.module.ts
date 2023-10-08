import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './guards/auth.guard';
import { ResetComponent } from './reset/reset.component';
import { DesactivatedComponent } from './desactivated/desactivated.component';
import { AddUserComponent } from './add-user/add-user.component';

const routes: Routes = [{
path:'',
component :LoginComponent
},
{
path:'login',
component :LoginComponent,

//canActivate:[authGuard]
},
{
  path:'register',
  component :RegisterComponent
  
  },
  {
    path:'dashboard',
    component :DashboardComponent,
    canActivate:[authGuard]
    },
    {
      path:'reset',
      component :ResetComponent,
      canActivate:[authGuard]
      },
      {
        path:'desactivated',
        component :DesactivatedComponent,
       
        }
        ,
      {
        path:'adduser',
        component :AddUserComponent,
       
        }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }
