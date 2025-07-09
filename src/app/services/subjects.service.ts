import { Injectable } from '@angular/core';
import { SubjectsModelTs } from '../models/subjects.model';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { SubjectsDtoTs } from '../dtos/subjects.dto';

@Injectable({
  providedIn: 'root',
})
export class SubjectsService extends GenericService<SubjectsDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'subjects');
  }
}
