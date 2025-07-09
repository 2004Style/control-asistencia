export class TeachersDtoTs {
  idTeacher: number;
  firstName: string;
  lastName: string;
  fullName: string;
  dni: string;
  email: string;
  phone: string;
  birthdate: string;
  gender: string;
  address:string;

  constructor(init?: Partial<TeachersDtoTs>) {
    Object.assign(this, init);
  }
}
