import { Component } from '@angular/core';
import { PeopleModelTs } from '../../models/people.model';
import { RolesModelTs } from '../../models/roles.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-perfil',
  imports: [NgClass],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  perfil: PeopleModelTs = {
    idPerson: 1,
    address: 'Av. Principal 123',
    birthdate: new Date(1990, 5, 15),
    dni: '12345678',
    email: 'usuario@correo.com',
    firstName: 'Juan',
    gender: 'Masculino',
    lastName: 'Pérez',
    phone: '987654321',
    id_user: 1,
  };

  rol: RolesModelTs = {
    id_role: 2,
    description: 'Profesor',
    name: 'profesor',
  };
}
