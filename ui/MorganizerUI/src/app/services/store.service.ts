import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  data = {};
  constructor() {}
  getProperty(key: string) {
    if (this.data[key]) {
      return this.data[key];
    } else {
      return null;
    }
  }
  setProperty(key: string, value: any) {
    this.data[key] = value;
  }
}
