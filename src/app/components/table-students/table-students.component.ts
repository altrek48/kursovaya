import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { BaseServiceService } from 'src/app/service/base-service.service';
import { Student } from './../../models/student';
import { DialogEditWrapperComponent } from './../student-editor/dialog-edit-wrapper/dialog-add-student-wrapper/dialog-add-student-wrapper';
import { DialogDeleteWrapperComponent } from './../student-editor/dialog-delete-wrapper/dialog-delete-wrapper/dialog-delete-wrapper.component';
import { DialogEditStudentComponent } from '../student-editor/dialog-edit-student-wrapper/dialog-edit-student-wrapper.component';
import { DialogCheckStudentWrapperComponent } from '../student-editor/dialog-check-student-wrapper/dialog-check-student-wrapper.component';
import { FilterService } from 'src/app/service/filterService';

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
  sortField: string = 'id';
  sortDirection: string = 'asc';
  currentFilter: string = '';

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private baseService: BaseServiceService,
    public dialog: MatDialog,
    private filterService: FilterService) {}

    ngOnInit() {
      const savedFilter = this.filterService.getFilterValue();
      if (savedFilter) {
        this.currentFilter = savedFilter;
        this.filterResults(savedFilter, this.pageIndex, this.pageSize, this.sortField, this.sortDirection);
      } else {
        this.loadStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection);
      }
    }

    ngAfterViewInit() {
      // Подписка на событие сортировки должна быть в ngAfterViewInit, чтобы сортировка была готова
      this.sort.sortChange.subscribe((sort: Sort) => {
        // Проверяем, есть ли направление сортировки и выбранное поле
        this.sortField = sort.active ? sort.active : this.sortField;
        this.sortDirection = sort.direction ? sort.direction : 'asc';
        console.log(`Sorting by: ${this.sortField}, ${this.sortDirection}`);

        // Перезагружаем данные с новыми параметрами сортировки
        this.loadStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection);
      });
      this.paginator.page.subscribe(() => {
        this.loadStudents(this.paginator.pageIndex, this.paginator.pageSize, this.sortField, this.sortDirection);
      });

      // Привязываем сортировку к данным таблицы (помимо подписки на изменения сортировки)
      this.dataSource.sort = this.sort;
    }

  loadStudents(pageIndex: number, pageSize: number, sortField: string, sortDirection: string) {
    if (this.currentFilter) {
      this.filterResults(this.currentFilter, pageIndex, pageSize, sortField, sortDirection);
    } else {
    this.baseService.getAllStudents(pageIndex, pageSize, sortField, sortDirection).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElements = data.totalElements;
      this.pageSize = data.size;
      this.pageIndex = data.number;
      this.paginator.length = this.totalElements;
      this.dataSource.sort = this.sort; // Устанавливаем сортировку на клиенте
    });
  }
  }

  onPageChange(event: any) {
    const savedFilter = this.filterService.getFilterValue();
    const pageIndex = event.pageIndex;
    const pageSize = event.pageSize;

    if (savedFilter) {
      this.filterResults(savedFilter, pageIndex, pageSize, this.sortField, this.sortDirection);
    } else {
      this.loadStudents(pageIndex, pageSize, this.sortField, this.sortDirection);
    }
  }

  addNewStudent() {
    const dialogAddingNewStudent = this.dialog.open(DialogEditWrapperComponent, {
      width: '400px',
      data: null
    });
    dialogAddingNewStudent.afterClosed().subscribe((result: Student) => {
      if (result != null) {
        this.baseService.addNewStudent(result).subscribe(() => {
          this.loadStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection);
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
      if (result === true && student.id != null) {
        this.baseService.deleteStudentById(student.id).subscribe(() => this.loadStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection));
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
        this.baseService.updateStudent(result).subscribe(() => this.loadStudents(this.pageIndex, this.pageSize, this.sortField, this.sortDirection));
      }
    });
  }

  showDetails(student: Student) {
    this.dialog.open(DialogCheckStudentWrapperComponent, {
      width: '600px',
      data: student
    });
  }

  filterResults(filter: string, pageIndex: number, pageSize: number, sortField: string, sortDirection: string) {
    this.currentFilter = filter;
    this.filterService.setFilterValue(filter);
    this.baseService.searchByFilter(filter, pageIndex, pageSize, sortField, sortDirection).subscribe(data => {
      this.dataSource = new MatTableDataSource(data.content);
      this.totalElements = data.totalElements;
      this.pageSize = data.size;
      this.pageIndex = data.number;
      this.paginator.length = this.totalElements;
      this.dataSource.sort = this.sort;
    });
  }
}





