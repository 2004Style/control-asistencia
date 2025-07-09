import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../auth/auth.service';
import { RouterModule } from '@angular/router';
import { ClassroomsService } from '../../../services/classrooms.service';
import { ClassroomsDtoTs } from '../../../dtos/classrooms.dto';

@Component({
  selector: 'app-teacher-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './teacher-courses.component.html',
})
export default class TeacherCoursesComponent implements OnInit {
  private coursesService = inject(ClassroomsService);
  private authService = inject(AuthService);

  courses: ClassroomsDtoTs[] = [];

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.loadCourses();
    });
  }

  loadCourses(): void {
    this.coursesService.findAll().subscribe((response:any) => {
      console.log(response);
      this.courses = response.content;
    });
  }
}
