import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { ClassroomsModelTs } from '../models/classrooms.model';
import { ClassroomsDtoTs } from '../dtos/classrooms.dto';
import { Observable } from 'rxjs';
import { ResponseApi } from '../shared/response-api';

@Injectable({
  providedIn: 'root',
})
export class ClassroomsService extends GenericService<ClassroomsDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'classrooms');
  }

  findAllStudent(
    search?: string,
    page: number = 0,
    size: number = 10
  ): Observable<ResponseApi<ClassroomsDtoTs>> {
    const baseUrl = super.getUrl();
    const specificEndpoint = `${baseUrl}`;
    return this.http.get<ResponseApi<ClassroomsDtoTs>>(
      `${specificEndpoint}?search=${search}&page=${page}&size=${size}`
    );
  }
}
