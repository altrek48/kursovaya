import { Student } from 'src/app/models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-check-student-wrapper',
  templateUrl: './dialog-check-student-wrapper.component.html',
  styleUrls: ['./dialog-check-student-wrapper.component.scss']
})
export class DialogCheckStudentWrapperComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogCheckStudentWrapperComponent>,private baseServiceService: BaseServiceService,
    @Inject(MAT_DIALOG_DATA) public student: Student) {
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
