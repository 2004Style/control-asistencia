import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { EnrollmentModelTs } from '../models/enrollment.model';
import { EnrollmentDtoTs } from '../dtos/enrollment.dto';

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService extends GenericService<EnrollmentDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'enrollments');
  }
}
