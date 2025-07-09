import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { UserRoleModelTs } from '../models/user-role.model';
import { UserRoleDtoTs } from '../dtos/user-role.dto';

@Injectable({
  providedIn: 'root',
})
export class UserRoleService extends GenericService<UserRoleDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'user-roles');
  }
}
