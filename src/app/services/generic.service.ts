import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Subject } from 'rxjs';

@Injectable()
export abstract class GenericService<T> {
  private url: string;
  private GenericChange: Subject<T[]> = new Subject<T[]>();
  private messageChange: Subject<string> = new Subject<string>();

  constructor(protected http: HttpClient, path: string) {
    this.url = `${environment.HOST}/${path}`;
  }

  getUrl(): string {
    return this.url;
  }

  findAll(search?: string, page: number = 0, size: number = 10) {
    return this.http.get<T[]>(
      `${this.url}?search=${search}&page=${page}&size=${size}`
    );
  }

  findById(id: number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  save(entry: T) {
    return this.http.post(this.url, entry);
  }

  update(id: number, entry: T) {
    return this.http.put(`${this.url}/${id}`, entry);
  }

  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  ///////////////
  setGenericChange(data: T[]) {
    this.GenericChange.next(data);
  }

  getGenericChange() {
    return this.GenericChange.asObservable();
  }

  setMessageChange(data: string) {
    this.messageChange.next(data);
  }

  getMessageChange() {
    return this.messageChange.asObservable();
  }
}
