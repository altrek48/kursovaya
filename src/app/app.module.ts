import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentEditorComponent } from './components/student-editor/student-editor.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogDeleteWrapperComponent } from './components/student-editor/dialog-delete-wrapper/dialog-delete-wrapper/dialog-delete-wrapper.component';
import { DialogEditWrapperComponent } from './components/student-editor/dialog-edit-wrapper/dialog-add-student-wrapper/dialog-add-student-wrapper';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';
import { StudentDeleteComponent } from './components/student-editor/student-delete/student-delete.component';
import { DialogEditStudentComponent } from './components/student-editor/dialog-edit-student-wrapper/dialog-edit-student-wrapper.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogCheckStudentWrapperComponent } from './components/student-editor/dialog-check-student-wrapper/dialog-check-student-wrapper.component';
import { UserEditorComponent } from './components/user-editor/user-editor.component';
import { DialogLoginUserComponent } from './components/user-editor/dialog-login-user/dialog-login-user.component';
import { DialogRegisterUserComponent } from './components/user-editor/dialog-register-user/dialog-register-user.component';


@NgModule({
  declarations: [
    AppComponent,
    StudentEditorComponent,
    TableStudentsComponent,
    DialogEditWrapperComponent,
    DialogDeleteWrapperComponent,
    // StudentDeleteComponent,
    DialogEditStudentComponent,
    DialogCheckStudentWrapperComponent,
    UserEditorComponent,
    DialogLoginUserComponent,
    DialogRegisterUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    HttpClientModule,
    //HttpClientInMemoryWebApiModule.forRoot( InMemoryDataService, {dataEncapsulation: false}),
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
