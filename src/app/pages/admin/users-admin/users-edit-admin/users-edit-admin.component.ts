import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { UsersDtoTs } from '../../../../dtos/users.dto';
import { UsersService } from '../../../../services/users.service';
import { RolesService } from '../../../../services/roles.service';
import { RolesDtoTs } from '../../../../dtos/roles.dto';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

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
    NgFor,
    MatCheckboxModule,
    MatSlideToggleModule,
  ],
  templateUrl: './users-edit-admin.component.html',
  styleUrl: './users-edit-admin.component.css',
})
export class UsersEditAdminComponent {
  form: FormGroup;
  id: number;
  isEdit: boolean;
  roles: RolesDtoTs[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private _service: UsersService,
    private router: Router,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id_user: [0],
      username: ['', [Validators.required, Validators.maxLength(50)]],
      password: [
        '',
        [
          this.isEdit ? Validators.nullValidator : Validators.required,
          Validators.maxLength(100),
        ],
      ],
      enabled: [true],
      roles: this.fb.array([]),
    });

    this.rolesService.findAll().subscribe((data) => {
      this.roles = data;
      this.addRoleCheckboxes();
    });

    this.route.params.subscribe((data) => {
      this.id = data['id'];
      this.isEdit = data['id'] != null;
      if (this.isEdit) {
        this.initForm();
        this.form.get('password')?.clearValidators();
        this.form.get('password')?.updateValueAndValidity();
      }
    });
  }

  private addRoleCheckboxes() {
    this.roles.forEach(() => this.rolesFormArray.push(this.fb.control(false)));
  }

  get rolesFormArray() {
    return this.form.controls['roles'] as FormArray;
  }

  initForm() {
    if (this.isEdit) {
      this._service.findById(this.id).subscribe((data) => {
        this.form.patchValue({
          id_user: data.id_user,
          username: data.username,
          enabled: data.enabled,
        });

        this.roles.forEach((role, index) => {
          const hasRole = data.roles.some(
            (userRole) => userRole.id_role === role.id_role
          );
          this.rolesFormArray.at(index).setValue(hasRole);
        });
      });
    }
  }

  operate() {
    const selectedRoles = this.form.value.roles
      .map((checked: boolean, i: number) =>
        checked ? { name: this.roles[i].name } : null
      )
      .filter((v: any) => v !== null);

    const model: Partial<UsersDtoTs> = {
      id_user: this.form.value.id_user,
      username: this.form.value.username,
      enabled: this.form.value.enabled,
      roles: selectedRoles,
    };

    if (this.form.value.password) {
      model.password = this.form.value.password;
    }

    if (this.isEdit) {
      this._service.update(this.id, model as UsersDtoTs).subscribe(() => {
        this._service.findAll().subscribe((data) => {
          this._service.setGenericChange(data);
          this._service.setMessageChange('UPDATED!');
        });
        this.router.navigate(['/pages/admin/users']);
      });
    } else {
      this._service
        .save(model as UsersDtoTs)
        .pipe(switchMap(() => this._service.findAll()))
        .subscribe((data) => {
          this._service.setGenericChange(data);
          this._service.setMessageChange('CREATED!');
          this.router.navigate(['/pages/admin/users']);
        });
    }
  }
}
