import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { AssistsDtoTs } from '../dtos/assists.dto';

@Injectable({
  providedIn: 'root',
})
export class AssistsService extends GenericService<AssistsDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'assists');
  }
}
