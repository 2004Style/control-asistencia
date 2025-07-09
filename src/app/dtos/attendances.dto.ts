export class AttendancesDtoTs {
  idAttendance: number;
  date: string;
  entryTime: string;
  isPresent: boolean;
  isLate: boolean;

  // IDs para las relaciones
  classroomId: number;
  scheduleId: number;
  studentId: number;

  constructor(init?: Partial<AttendancesDtoTs>) {
    Object.assign(this, init);
  }
}
