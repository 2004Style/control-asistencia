import { RolesDtoTs } from "./roles.dto";

export class UserRoleDtoTs {
  id_user: number;
  id_role: number;

  role: RolesDtoTs;

  constructor(init?: Partial<UserRoleDtoTs>) {
    Object.assign(this, init);
  }
}
