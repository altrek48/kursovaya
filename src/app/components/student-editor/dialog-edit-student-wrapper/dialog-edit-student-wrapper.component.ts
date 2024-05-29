import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
    selector: 'app-dialog-edit-student',
    templateUrl: './dialog-edit-student-wrapper.component.html',
    styleUrls: ['./dialog-edit-student-wrapper.component.scss']
})
export class DialogEditStudentComponent implements OnInit {
  student: Student;

  constructor(
    public dialogRef: MatDialogRef<DialogEditStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student
  ) {
    this.student = data ? { ...data } : new Student();
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmEdit(): void {
    this.dialogRef.close(this.student);
  }
}
