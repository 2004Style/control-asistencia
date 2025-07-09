import { SchemodulesDtoTs } from './schemodules.dto';
import { SubjectsDtoTs } from './subjects.dto';
import { TeachersDtoTs } from './teachers.dto';
export class ClassroomsDtoTs {
  idClassroom: number;
  name: string;
  teacherId: number;
  subjectId: number;

  teacher: TeachersDtoTs = null;
  subject: SubjectsDtoTs = null;
  schedules: SchemodulesDtoTs[] = [];

  constructor(init?: Partial<ClassroomsDtoTs>) {
    Object.assign(this, init);
  }
}
