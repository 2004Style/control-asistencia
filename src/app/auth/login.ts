import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  imports: [ReactiveFormsModule],
})
export default class Login {
  _formBuilder = inject(FormBuilder);

  _authService = inject(AuthService);

  form = this._formBuilder.group({
    email: this._formBuilder.control('', [
      Validators.required,
      Validators.email,
    ]),
    password: this._formBuilder.control('', Validators.required),
    remember: this._formBuilder.control(false),
  });

  constructor() {
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    if (rememberedEmail) {
      this.form.patchValue({ email: rememberedEmail, remember: true });
    }
  }

  login() {
    if (!this.form.valid) {
      console.log('Form is invalid');
      console.log('Email errors:', this.form.get('email')?.errors);
      console.log('Password errors:', this.form.get('password')?.errors);
      this.form.markAllAsTouched(); // Marca todos los campos como "tocados" para mostrar errores
      return;
    }
    console.log('Form submitted:', this.form.value);

    const { email, password, remember } = this.form.getRawValue();

    if (remember) {
      localStorage.setItem('rememberedEmail', email!);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    this._authService
      .login({ username: email!, password: password! })
      .subscribe({
        error: (err) => {
          // Handle login error
          console.error(err);
        },
      });
  }
}
