import { PeopleModelTs } from '../models/people.model';

export class StudentsDtoTs {
  id_student: number;
  id_person: number;
  person: PeopleModelTs;

  constructor(init?: Partial<StudentsDtoTs>) {
    Object.assign(this, init);
  }
}

export interface StudentWithEnrollmentDto {
  studentId: number;
  idEnrollment: number;
  person: PeopleModelTs;
}
