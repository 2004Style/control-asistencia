import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { StudentsModelTs } from '../models/students.model';
import { StudentsDtoTs } from '../dtos/students.dto';

@Injectable({
  providedIn: 'root',
})
export class StudentsService extends GenericService<StudentsDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'students');
  }
}
