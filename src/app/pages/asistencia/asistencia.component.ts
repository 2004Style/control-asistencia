import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';


interface Alumno {
  nombre: string;
  asistio: boolean;
}

@Component({
  imports: [NgFor, NgIf, FormsModule],
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.css'],
})
export class AsistenciaComponent {
  alumnos: Alumno[] = [
    { nombre: 'Juan Pérez', asistio: false },
    { nombre: 'Ana Gómez', asistio: false },
    { nombre: 'Luis Torres', asistio: false },
    { nombre: 'Carlos López', asistio: false },
    { nombre: 'Dra. Ana Gómez', asistio: false },
    { nombre: 'Prof. Juan Pérez', asistio: false },
    { nombre: 'Ing. Carlos López', asistio: false },
    { nombre: 'Lic. María Fernández', asistio: false },
  ];

  get asistenciasMarcadas(): number {
    return this.alumnos.filter((a) => a.asistio).length;
  }

  get faltas(): number {
    return this.alumnos.filter((a) => !a.asistio).length;
  }

  marcarAsistencia(alumno: any) {
    alumno.asistio = true;
    // Aquí puedes actualizar los totales si lo deseas
  }

  guardarAsistencia() {
    // Aquí puedes enviar los datos al backend o procesarlos como desees
    const registro = this.alumnos.map((a) => ({
      nombre: a.nombre,
      asistio: a.asistio,
    }));

    // Ejemplo: mostrar en consola
    console.log('Registro de asistencia:', registro);

    // Puedes mostrar un mensaje de éxito o realizar otra acción
    alert('¡Asistencia guardada correctamente!');
  }
}
