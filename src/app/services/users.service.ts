import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { UsersModelTs } from '../models/users.model';
import { UsersDtoTs } from '../dtos/users.dto';

@Injectable({
  providedIn: 'root',
})
export class UsersService extends GenericService<UsersDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'users');
  }
}
