export class ClassroomsModelTs {
  idClassroom: number;
  name: string;
  teacher: {
    idTeacher: number;
    firstName: string;
    lastName: string;
    fullName: string;
    dni: string;
    email: string;
    phone: string;
    birthdate: string;
    gender: string;
    address: string;
  };
  subject: {
    idSubject: number;
    name: string;
  };
  schedules: [
    {
      idSchedule: number;
      dayOfWeek: string;
      startTime: string;
      endTime: string;
    }
  ];
  studentPresentCount: number;
  studentLateCount: number;
  studentAbsentCount: number;
}
