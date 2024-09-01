import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from './../../models/student';
import { DialogEditWrapperComponent } from './../student-editor/dialog-edit-wrapper/dialog-add-student-wrapper/dialog-add-student-wrapper';
import { DialogDeleteWrapperComponent } from './../student-editor/dialog-delete-wrapper/dialog-delete-wrapper/dialog-delete-wrapper.component';
import { DialogEditStudentComponent } from '../student-editor/dialog-edit-student-wrapper/dialog-edit-student-wrapper.component';
import { DialogCheckStudentWrapperComponent } from '../student-editor/dialog-check-student-wrapper/dialog-check-student-wrapper.component';
import { filter } from 'rxjs';

@Component({
  selector: 'app-table-students',
  templateUrl: './table-students.component.html',
  styleUrls: ['./table-students.component.scss']
})
export class TableStudentsComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'surname', 'group', 'functions'];
  dataSource!: MatTableDataSource<Student>;
  totalElements: number = 0;
  pageSize: number = 5;
  pageIndex: number = 0;


  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private baseService: BaseServiceService, public dialog: MatDialog, /*private snackBar: MatSnackBar*/) {}

  ngOnInit() {
    this.loadStudents(this.pageIndex, this.pageSize);
  }



  loadStudents(pageIndex: number, pageSize: number) {
    this.baseService.getAllStudents(pageIndex, pageSize).subscribe(data => {
       this.dataSource = new MatTableDataSource(data.content);
       this.totalElements = data.totalElements;
      this.pageSize = data.size;
      this.pageIndex = data.number;
      this.dataSource.sort = this.sort;
      this.paginator.length = this.totalElements;
    });
  }

  onPageChange(event: any) {
    this.loadStudents(event.pageIndex, event.pageSize);
  }

  addNewStudent() {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: null
    });
    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        this.baseService.addNewStudent(result).subscribe(() => {
          this.loadStudents(this.pageIndex, this.pageSize);
        });
      }
    });
  }

  deleteStudent(student: Student) {
    const dialogDeletingStudent = this.dialog.open(DialogDeleteWrapperComponent, {
      width: '400px',
      data: student
    });
    dialogDeletingStudent.afterClosed().subscribe((result: boolean) => {
      if (result == true && student.id != null) {
        this.baseService.deleteStudentById(student.id).subscribe(() => this.loadStudents(this.pageIndex, this.pageSize));
      }
    });
  }

  editStudent(student: Student) {
    const dialogEditingStudent = this.dialog.open(DialogEditStudentComponent, {
      width: '400px',
      data: student
    });
    dialogEditingStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        this.baseService.updateStudent(result).subscribe(() => this.loadStudents(this.pageIndex, this.pageSize));
      }
    });
  }

  showDetails(student: Student) {
    this.dialog.open(DialogCheckStudentWrapperComponent, {
      width: '600px',
      data: student
    })
  }

  filterResults(filter: string, pageIndex: number, pageSize: number) {
    //if(filter != null) {
      this.baseService.searchByFilter(filter, pageIndex, pageSize).subscribe(data => {
        this.dataSource = new MatTableDataSource(data.content);
        this.totalElements = data.totalElements;
       this.pageSize = data.size;
       this.pageIndex = data.number;
       this.dataSource.sort = this.sort;
       this.paginator.length = this.totalElements;
     });
    //}
    }

}


