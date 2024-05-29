import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Student } from 'src/app/models/student';

@Component({
  selector: 'app-dialog-edit-wrapper',
  templateUrl: './dialog-add-student-wrapper.html',
  styleUrls: ['./dialog-add-student-wrapper.scss']
})
export class DialogEditWrapperComponent implements OnInit {
  editingStudent : Student;
  constructor(public dialogRef: MatDialogRef<DialogEditWrapperComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
      this.editingStudent = new Student();
     }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}


