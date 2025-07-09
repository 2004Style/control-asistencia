import { PeopleDtoTs } from "./people.dto";
import { RolesDtoTs } from "./roles.dto";

export class UsersDtoTs {
  id_user: number;
  enabled: boolean;
  password: string;
  username: string;

  roles: RolesDtoTs[];
  person: PeopleDtoTs;

  constructor(init?: Partial<UsersDtoTs>) {
    Object.assign(this, init);
  }
}
