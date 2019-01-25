import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage = sessionStorage;

  constructor() { }

  setSessionStorage() {
    this.storage = sessionStorage;
  }

  setLocalStorage() {
    this.storage = localStorage;
  }

  get(key: string): any {
    return this.storage.getItem(key);
  }

  set(key: string, value: any): void {
    this.storage.setItem(key, value);
  }

  getObject(key: string): any {
    return JSON.parse(this.storage.getItem(key));
  }

  setObject(key: string, value: any): void {
    this.storage.setItem(key, JSON.stringify(value));
  }

  remove(key: string): void {
    this.storage.removeItem(key);
  }
}
