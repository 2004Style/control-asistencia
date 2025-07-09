import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { AttendancesDtoTs, AttendancePayload } from '../dtos/attendances.dto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AttendancesService extends GenericService<AttendancesDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'attendances');
  }

  registerAttendance(payload: AttendancePayload): Observable<any> {
    console.log('Registering attendance with payload:', payload);
    return this.http.post(`${this.getUrl()}/bulk`, payload);
  }
}
