import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { AttendancesDtoTs } from '../dtos/attendances.dto';

@Injectable({
  providedIn: 'root',
})
export class AttendancesService extends GenericService<AttendancesDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'attendances');
  }
}
