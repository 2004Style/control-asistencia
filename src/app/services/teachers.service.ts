import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TeachersModelTs } from '../models/teachers.model';
import { TeachersDtoTs } from '../dtos/teachers.dto';

@Injectable({
  providedIn: 'root',
})
export class TeachersService extends GenericService<TeachersDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'teachers');
  }
}
