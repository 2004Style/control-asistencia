import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { RolesDtoTs } from '../dtos/roles.dto';

@Injectable({
  providedIn: 'root',
})
export class RolesService extends GenericService<RolesDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'roles');
  }
}
