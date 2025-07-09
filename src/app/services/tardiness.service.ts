import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { TardinessDtoTs } from '../dtos/tardiness.dto';

@Injectable({
  providedIn: 'root',
})
export class TardinessService extends GenericService<TardinessDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'tardiness');
  }
}
