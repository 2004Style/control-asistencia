export class SubjectsDtoTs {
  idSubject: number;
  name: string;

  constructor(init?: Partial<SubjectsDtoTs>) {
    Object.assign(this, init);
  }
}
