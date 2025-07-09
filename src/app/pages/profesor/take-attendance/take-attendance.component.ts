import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CoursesService } from '../../../services/courses.service';
import { AttendancesService } from '../../../services/attendances.service';
import { StudentWithEnrollmentDto } from '../../../dtos/students.dto';
import { AttendancePayload } from '../../../dtos/attendances.dto';

@Component({
  selector: 'app-take-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './take-attendance.component.html',
})
export default class TakeAttendanceComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private coursesService = inject(CoursesService);
  private attendancesService = inject(AttendancesService);

  scheduleId!: number;
  classroomId!: number; // Añadir para almacenar el classroomId
  students: StudentWithEnrollmentDto[] = [];
  attendanceForm: FormGroup;

  constructor() {
    this.attendanceForm = this.fb.group({
      students: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.scheduleId = +this.route.snapshot.paramMap.get('scheduleId')!;
    this.classroomId = +this.route.snapshot.queryParamMap.get('classroomId')!; // Obtener de query params
    if (this.scheduleId) {
      this.loadStudents();
    }
  }

  loadStudents(): void {
    this.coursesService
      .getStudentsBySchedule(this.scheduleId)
      .subscribe((students) => {
        console.log('Estudiantes cargados:', students);
        this.students = students;
        this.createFormControls();
      });
  }

  get studentControls(): FormArray {
    return this.attendanceForm.get('students') as FormArray;
  }

  createFormControls(): void {
    this.students.forEach((student) => {
      this.studentControls.push(
        this.fb.group({
          studentId: [student.studentId],
          isPresent: [true, Validators.required],
        })
      );
    });
  }

  onSubmit(): void {
    if (this.attendanceForm.invalid) {
      return;
    }
    const formValue = this.attendanceForm.value;
    const payload: AttendancePayload = {
      classroomId: this.classroomId,
      scheduleId: this.scheduleId,
      students: formValue.students,
    };
    this.attendancesService.registerAttendance(payload).subscribe({
      next: () => {
        console.log('Asistencia registrada con éxito');
        this.router.navigate(['/profesor/cursos']);
      },
      error: (err) => console.error('Error al registrar asistencia', err),
    });
  }
}
