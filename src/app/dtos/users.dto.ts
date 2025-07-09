export class UsersDtoTs {
  id_user: number;
  enabled: boolean;
  password: string;
  username: string;

  constructor(init?: Partial<UsersDtoTs>) {
    Object.assign(this, init);
  }
}
