import { Student } from './../../../../models/student';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-delete-wrapper',
  templateUrl: './dialog-delete-wrapper.component.html',
  styleUrls: ['./dialog-delete-wrapper.component.scss']
})
export class DialogDeleteWrapperComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DialogDeleteWrapperComponent>,private baseServiceService: BaseServiceService,
    @Inject(MAT_DIALOG_DATA) public data: Student) {
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.dialogRef.close(true);
}
}
