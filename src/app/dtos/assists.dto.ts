export class AssistsDtoTs {
  idAssist: number;
  status: string;
  attendanceId: number;
  enrollmentId: number;
  attendanceDate: Date;
  attendanceEntryTime: Date;
  attendancePresent: boolean;
  attendanceLate: boolean;
  studentId: number;
  studentFirstName: string;
  studentLastName: string;
  studentFullName: string;
  classroomId: number;
  classroomName: string;

  constructor(init?: Partial<AssistsDtoTs>) {
    Object.assign(this, init);
  }
}
