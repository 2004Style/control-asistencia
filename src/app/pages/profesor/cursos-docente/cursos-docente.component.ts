import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cursos-docente',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './cursos-docente.component.html',
  styleUrl: './cursos-docente.component.css',
})
export class CursosDocenteComponent {
  cursos = [
    {
      id:1,
      nombre: 'Matemáticas Avanzadas',
      horario: '08:00 - 10:00',
      aula: 'Aula 101',
      dias: 'Lunes, Miércoles, Viernes',
      estudiantes: 28,
    },
    {
      id: 2,
      nombre: 'Física Básica',
      horario: '10:15 - 12:00',
      aula: 'Aula 102',
      dias: 'Martes, Jueves',
      estudiantes: 32,
    },
    // ...agrega más cursos si lo deseas
  ];
}
