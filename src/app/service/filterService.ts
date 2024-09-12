import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private filterValue: string = '';

  setFilterValue(value: string) {
    this.filterValue = value;
  }

  getFilterValue(): string {
    return this.filterValue;
  }
}
