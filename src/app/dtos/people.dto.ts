export class PeopleDtoTs {
  idPerson: number;
  dni: string;
  firstName: string;
  lastName: string;
  birthdate: Date;
  gender: string;
  address: string;
  phone: string;
  email: string;

  constructor(init?: Partial<PeopleDtoTs>) {
    Object.assign(this, init);
  }
}
