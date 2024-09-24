import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DialogLoginUserComponent } from './components/user-editor/dialog-login-user/dialog-login-user.component';
import { DialogRegisterUserComponent } from './components/user-editor/dialog-register-user/dialog-register-user.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';

const routes: Routes = [
  {path: 'login', component: DialogLoginUserComponent},
  {path: 'registration', component: DialogRegisterUserComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'students', component: TableStudentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
