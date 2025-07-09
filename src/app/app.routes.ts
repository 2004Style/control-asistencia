import { Routes } from '@angular/router';
import { AsistenciaComponent } from './pages/asistencia/asistencia.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { CursoDetailsComponent } from './pages/cursos/curso-details/curso-details.component';
import { CursosDocenteComponent } from './pages/profesor/cursos-docente/cursos-docente.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { RolesAdminComponent } from './pages/admin/roles-admin/roles-admin.component';
import { RolesEditAdminComponent } from './pages/admin/roles-admin/roles-edit-admin/roles-edit-admin.component';
import { AssistsAdminComponent } from './pages/admin/assists-admin/assists-admin.component';
import { AssistsEditAdminComponent } from './pages/admin/assists-admin/assists-edit-admin/assists-edit-admin.component';
import { AttendancesAdminComponent } from './pages/admin/attendances-admin/attendances-admin.component';
import { AttendancesEditAdminComponent } from './pages/admin/attendances-admin/attendances-edit-admin/attendances-edit-admin.component';
import { ClassroomsAdminComponent } from './pages/admin/classrooms-admin/classrooms-admin.component';
import { ClassroomsEditAdminComponent } from './pages/admin/classrooms-admin/classrooms-edit-admin/classrooms-edit-admin.component';
import { EnrollmentsAdminComponent } from './pages/admin/enrollments-admin/enrollments-admin.component';
import { EnrollmentsEditAdminComponent } from './pages/admin/enrollments-admin/enrollments-edit-admin/enrollments-edit-admin.component';
import { PeopleAdminComponent } from './pages/admin/people-admin/people-admin.component';
import { PeopleEditAdminComponent } from './pages/admin/people-admin/people-edit-admin/people-edit-admin.component';
import { SchemodulesAdminComponent } from './pages/admin/schedules-admin/schedules-admin.component';
import { SchemodulesEditAdminComponent } from './pages/admin/schedules-admin/schedules-edit-admin/schedules-edit-admin.component';
import { StudentsAdminComponent } from './pages/admin/students-admin/students-admin.component';
import { StudentsEditAdminComponent } from './pages/admin/students-admin/students-edit-admin/students-edit-admin.component';
import { SubjectsAdminComponent } from './pages/admin/subjects-admin/subjects-admin.component';
import { SubjectsEditAdminComponent } from './pages/admin/subjects-admin/subjects-edit-admin/subjects-edit-admin.component';
import { TardinessAdminComponent } from './pages/admin/tardiness-admin/tardiness-admin.component';
import { TardinessEditAdminComponent } from './pages/admin/tardiness-admin/tardiness-edit-admin/tardiness-edit-admin.component';
import { TeachersAdminComponent } from './pages/admin/teachers-admin/teachers-admin.component';
import { TeachersEditAdminComponent } from './pages/admin/teachers-admin/teachers-edit-admin/teachers-edit-admin.component';
import { UserRoleAdminComponent } from './pages/admin/user-role-admin/user-role-admin.component';
import { UserRoleEditAdminComponent } from './pages/admin/user-role-admin/user-role-edit-admin/user-role-edit-admin.component';
import { UsersAdminComponent } from './pages/admin/users-admin/users-admin.component';
import { UsersEditAdminComponent } from './pages/admin/users-admin/users-edit-admin/users-edit-admin.component';
import { hasRoleGuard } from './core/guards/has-role.guard';
import { authGuard } from './core/guards/auth.guard';
import Login from './auth/login';
import { ROLES } from './auth/roles.class';

const rutaBase = 'pages';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./auth/login'),
      },
      {
        path: 'register',
        loadComponent: () => import('./auth/register'),
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
  },
  {
    path: `assists-admin`,
    component: AssistsAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: AssistsEditAdminComponent },
      { path: 'edit/:id', component: AssistsEditAdminComponent },
    ],
  },
  {
    path: `attendances-admin`,
    component: AttendancesAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: AttendancesEditAdminComponent },
      { path: 'edit/:id', component: AttendancesEditAdminComponent },
    ],
  },
  {
    path: `classrooms-admin`,
    component: ClassroomsAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: ClassroomsEditAdminComponent },
      { path: 'edit/:id', component: ClassroomsEditAdminComponent },
    ],
  },
  {
    path: `enrollments-admin`,
    component: EnrollmentsAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: EnrollmentsEditAdminComponent },
      { path: 'edit/:id', component: EnrollmentsEditAdminComponent },
    ],
  },
  {
    path: `people-admin`,
    component: PeopleAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: PeopleEditAdminComponent },
      { path: 'edit/:id', component: PeopleEditAdminComponent },
    ],
  },
  {
    path: `roles-admin`,
    component: RolesAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: RolesEditAdminComponent },
      { path: 'edit/:id', component: RolesEditAdminComponent },
    ],
  },
  {
    path: `schemodules-admin`,
    component: SchemodulesAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: SchemodulesEditAdminComponent },
      { path: 'edit/:id', component: SchemodulesEditAdminComponent },
    ],
  },
  {
    path: `students-admin`,
    component: StudentsAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: StudentsEditAdminComponent },
      { path: 'edit/:id', component: StudentsEditAdminComponent },
    ],
  },
  {
    path: `subjects-admin`,
    component: SubjectsAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: SubjectsEditAdminComponent },
      { path: 'edit/:id', component: SubjectsEditAdminComponent },
    ],
  },
  {
    path: `tardines-admin`,
    component: TardinessAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: TardinessEditAdminComponent },
      { path: 'edit/:id', component: TardinessEditAdminComponent },
    ],
  },
  {
    path: `teachers-admin`,
    component: TeachersAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: TeachersEditAdminComponent },
      { path: 'edit/:id', component: TeachersEditAdminComponent },
    ],
  },
  {
    path: `user-role-admin`,
    component: UserRoleAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: UserRoleEditAdminComponent },
      { path: 'edit/:id', component: UserRoleEditAdminComponent },
    ],
  },
  {
    path: `users-admin`,
    component: UsersAdminComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.ADMIN])],
    children: [
      { path: 'new', component: UsersEditAdminComponent },
      { path: 'edit/:id', component: UsersEditAdminComponent },
    ],
  },

  {
    path: `cursos`,
    component: CursosComponent,
    canActivate: [authGuard],
  },
  {
    path: `cursos/details/:id`,
    component: CursoDetailsComponent,
    canActivate: [authGuard],
  },
  //rutas para el dicente
  {
    path: `curso/asistencia/:id`,
    component: AsistenciaComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.TEACHER])],
  },
  {
    path: `cursos-docente`,
    component: CursosDocenteComponent,
    canActivate: [authGuard, hasRoleGuard([ROLES.TEACHER])],
  },
  {
    path: `perfil`,
    component: PerfilComponent,
    canActivate: [authGuard],
  },
];
