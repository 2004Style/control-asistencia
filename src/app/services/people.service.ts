import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { PeopleModelTs } from '../models/people.model';
import { PeopleDtoTs } from '../dtos/people.dto';

@Injectable({
  providedIn: 'root',
})
export class PeopleService extends GenericService<PeopleDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'people');
  }
}
