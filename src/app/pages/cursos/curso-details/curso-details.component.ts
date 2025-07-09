import { Component } from '@angular/core';
import { ClassroomsService } from '../../../services/classrooms.service';
import { ClassroomsDtoTs } from '../../../dtos/classrooms.dto';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-curso-details',
  imports: [],
  templateUrl: './curso-details.component.html',
  styleUrl: './curso-details.component.css',
})
export class CursoDetailsComponent {
  curso: ClassroomsDtoTs;
  constructor(
    private route: ActivatedRoute,
    private _service: ClassroomsService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this._service.findById(id).subscribe((data) => {
        console.log('Curso details:', data);
        this.curso = data;
      });
    });
  }
}
