import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { SchemodulesModelTs } from '../models/schemodules.model';
import { SchemodulesDtoTs } from '../dtos/schemodules.dto';

@Injectable({
  providedIn: 'root',
})
export class SchemodulesService extends GenericService<SchemodulesDtoTs> {
  constructor(http: HttpClient) {
    super(http, 'schedules');
  }
}
