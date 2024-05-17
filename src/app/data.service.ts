import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private dataSubject = new BehaviorSubject<number[]>([]);
  data$ = this.dataSubject.asObservable();

  constructor() {
    this.loadData();
  }

  loadData() {
    const data = Array.from({ length: 10000 }, (_, i) => i + 1);
    this.dataSubject.next(data);
  }

  addData(item: number) {
    const currentData = this.dataSubject.getValue();
    this.dataSubject.next([...currentData, item]);
  }

  updateData() {
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * 10000);
      const newData = this.dataSubject.getValue().map((item, index) =>
        index === randomIndex ? item + 1 : item
      );
      this.dataSubject.next(newData);
    }, 1000);
  }
}
