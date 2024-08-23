import { Injectable } from '@angular/core';
import { Student } from '../models/student';
import { InMemoryDbService } from 'angular-in-memory-web-api';
@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const students = [
      {id: 1, name: 'Иван', surname: 'Иванов',debt: 'Физика', group: 'bivt-232', coments: "alalala"},
      {id: 2, name: 'Денис', surname: 'Денисов',debt: 'Мат. логика', group: 'bivt-231', coments: "ululuul"},
      {id: 3, name: 'Илья', surname: 'Ильич',debt: 'Физика, Мат. логика', group: 'bivt-233', coments: "liilililli"}
    ];
    return {students};
  }

  genId(students: Student[]): number {
    return students.length > 0 ? Math.max(...students.map(student => student.id ? student.id : 0)) + 1 : 11;
  }
}

