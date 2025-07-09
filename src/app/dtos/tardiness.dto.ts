export class TardinessDtoTs {
  id_tardiness_rule: number;
  absence_threshold_minutes: number;
  tardinness_threshold_minutes: number;
  classroomId: number;

  constructor(init?: Partial<TardinessDtoTs>) {
    Object.assign(this, init);
  }
}
