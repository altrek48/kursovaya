import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from './../../models/student';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-student-editor',
  templateUrl: './student-editor.component.html',
  styleUrls: ['./student-editor.component.scss']
})
export class StudentEditorComponent implements OnInit {
  editingStudent: Student;

  constructor(private baseService: BaseServiceService) {
    this.editingStudent = new Student();
   }

  ngOnInit(): void {
  }

}


