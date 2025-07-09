export class StudentsDtoTs {
  id_student: number;
  idPerson: number;

  constructor(init?: Partial<StudentsDtoTs>) {
    Object.assign(this, init);
  }
}
