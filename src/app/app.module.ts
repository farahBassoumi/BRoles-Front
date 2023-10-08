import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ResetComponent } from './reset/reset.component';
import { DesactivatedComponent } from './desactivated/desactivated.component';
import { AddUserComponent } from './add-user/add-user.component';
//import { Ng2SearchPipeModule } from 'ng2-search-filter';  
import { FilterPipe } from './pipes/filter.pipe';
import { HighlightDirective } from './directives/highlight.directive';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ResetComponent,
    DesactivatedComponent,
    AddUserComponent,
    FilterPipe,
    HighlightDirective,
  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
   // Ng2SearchPipeModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:TokenInterceptor,
      multi:true
    }],

  bootstrap: [AppComponent]
  
})
export class AppModule { }
