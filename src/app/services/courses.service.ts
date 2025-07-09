import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { StudentWithEnrollmentDto } from '../dtos/students.dto';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private http = inject(HttpClient);
  private url = `${environment.HOST}`;

  getStudentsBySchedule(
    scheduleId: number
  ): Observable<StudentWithEnrollmentDto[]> {
    return this.http.get<StudentWithEnrollmentDto[]>(
      `${this.url}/schedules/${scheduleId}/students`
    );
  }
}
