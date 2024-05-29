import { Component, OnInit } from '@angular/core';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-student-delete',
  templateUrl: './student-delete.component.html',
  styleUrls: ['./student-delete.component.scss']
})
export class StudentDeleteComponent implements OnInit {
  deletingStudent!: Student;

  constructor(private baseService: BaseServiceService) {

  }

  ngOnInit(): void {
  }

}
