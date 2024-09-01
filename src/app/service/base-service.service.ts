import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Page } from '../models/page';
@Injectable({
  providedIn: 'root'
})
export class BaseServiceService {

  private studentsUrl = 'api/students';

  constructor(
    private http: HttpClient) { }

    getAllStudents(page: number, size: number): Observable<Page<Student>> {
      return this.http.get<Page<Student>>('api/base/students', {
        params: {
          page: page.toString(),
          size: size.toString()
        }
      });
    }

  addNewStudent(student: Student): Observable<Student> {
    console.log('addNewStudent');
    return this.http.post<Student>('api/base/students', student).pipe();
  }

  deleteStudentById(studentId: number): Observable<void> {
    const url = `${'api/base/students'}/${studentId}`;
    return this.http.delete<void>(url);
  }

  getStudentById(studentId: number): Observable<Student> {
    const url = `${'api/base/students'}/${studentId}`;
    return this.http.get<Student>(url);
}

  updateStudent(student: Student): Observable<Student> {
    const url = `${this.studentsUrl}/${student.id}`;
    return this.http.put<Student>('api/base/students', student);
}

searchByFilter(filter: string, page: number, size: number): Observable<Page<Student>> {
  return this.http.get<Page<Student>>('api/base/students/search', {
    params: {
      filter: filter,
      page: page.toString(),
      size: size.toString()
    }
  });
}

}
