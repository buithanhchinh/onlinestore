import { NotificationService } from './../core/services/notification.service';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { AuthenService } from '../core/services/authen.service';

export const loginRoutes: Routes = [
  //localhost:4200/login
  {path: '', component: LoginComponent}
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(loginRoutes)
  ],
  providers: [
    NotificationService,
    AuthenService
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
