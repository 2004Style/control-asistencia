export class RolesDtoTs {
  id_role: number;
  description: string;
  name: string;

  constructor(init?: Partial<RolesDtoTs>) {
    Object.assign(this, init);
  }
}
