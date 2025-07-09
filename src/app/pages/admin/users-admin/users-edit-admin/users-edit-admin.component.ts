import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { RolesModelTs } from '../../../../models/roles.model';
import { RolesService } from '../../../../services/roles.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { UsersDtoTs } from '../../../../dtos/users.dto';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-users-edit-admin',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './users-edit-admin.component.html',
  styleUrl: './users-edit-admin.component.css',
})
export class UsersEditAdminComponent {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _service: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._service
      .findAll()
      .toPromise()
      .then(() => {
        const model = new UsersDtoTs();
        const formControlsConfig: { [key: string]: any } = {};

        for (const key of Object.keys(model)) {
          // Por defecto, un control vacío sin validadores
          const control = [''];
          // Añadir validadores a campos específicos
          // if (key === 'name') {
          //   control.push(Validators.required);
          // }
          formControlsConfig[key] = control;
        }

        this.form = this.fb.group(formControlsConfig);

        this.route.params.subscribe((data) => {
          this.id = data['id'];
          this.isEdit = data['id'] != null;
          this.initForm();
        });
      })
      .catch((error) => {
        console.error('Error cargando datos:', error);
      });
  }

  initForm() {
    if (this.isEdit) {
      this._service.findById(this.id).subscribe((data) => {
        this.form.patchValue({
          ...data,
        });
      });
    }
  }

  operate() {
    const model = new UsersDtoTs(this.form.value);

    if (this.isEdit) {
      this._service.update(this.id, model).subscribe(() => {
        this._service.findAll().subscribe((data) => {
          this._service.setGenericChange(data);
          this._service.setMessageChange('UPDATED!');
        });
      });
    } else {
      this._service
        .save(model)
        .pipe(switchMap(() => this._service.findAll()))
        .subscribe((data) => {
          this._service.setGenericChange(data);
          this._service.setMessageChange('CREATED!');
        });
    }

    this.router.navigate(['pages/model']);
  }
}
