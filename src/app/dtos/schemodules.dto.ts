import { WeekDay } from '@angular/common';

export class SchemodulesDtoTs {
  idSchedule: number;
  dayOfWeek: WeekDay | string;
  startTime: Date | string;
  endTime: Date | string;

  constructor(init?: Partial<SchemodulesDtoTs>) {
    Object.assign(this, init);
  }
}
