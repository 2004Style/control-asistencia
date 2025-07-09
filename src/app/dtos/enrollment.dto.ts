export class EnrollmentDtoTs {
  idEnrollment: number;
  studentId: number;
  classroomId: number;

  constructor(init?: Partial<EnrollmentDtoTs>) {
    Object.assign(this, init);
  }
}
