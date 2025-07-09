import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from './auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export default class RegisterComponent {
  _formBuilder = inject(FormBuilder);
  _authService = inject(AuthService);
  _router = inject(Router);

  form: FormGroup;

  constructor() {
    this.form = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dni: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      address: [''],
      phone: [''],
    });
  }

  register() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this._authService.register(this.form.value).subscribe({
      next: () => {
        this._router.navigate(['/']);
      },
      error: (err) => {
        console.error('Registration failed', err);
      },
    });
  }
}
