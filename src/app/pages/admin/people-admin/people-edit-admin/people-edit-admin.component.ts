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
import { PeopleDtoTs } from '../../../../dtos/people.dto';
import { PeopleService } from '../../../../services/people.service';

@Component({
  selector: 'app-people-edit-admin',
  imports: [
    NgIf,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    RouterLink,
  ],
  templateUrl: './people-edit-admin.component.html',
  styleUrl: './people-edit-admin.component.css',
})
export class PeopleEditAdminComponent {
  form: FormGroup;
  id: number;
  isEdit: boolean;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _service: PeopleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      idPerson: [0],
      dni: ['', [Validators.required, Validators.maxLength(8)]],
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      birthdate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      address: ['', [Validators.maxLength(100)]],
      phone: ['', [Validators.maxLength(15)]],
      email: ['', [Validators.required, Validators.email]],
      userId: [null],
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      if (this.isEdit) {
        this.initForm();
      }
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
    const model = new PeopleDtoTs(this.form.value);

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
