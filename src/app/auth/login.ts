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
    usernameOrEmail: this._formBuilder.control('', [Validators.required]),
    password: this._formBuilder.control('', Validators.required),
    remember: this._formBuilder.control(false),
  });

  constructor() {
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
      this.form.patchValue({ usernameOrEmail: rememberedUser, remember: true });
    }
  }

  login() {
    if (!this.form.valid) {
      console.log('Form is invalid');
      console.log(
        'Username/Email errors:',
        this.form.get('usernameOrEmail')?.errors
      );
      console.log('Password errors:', this.form.get('password')?.errors);
      this.form.markAllAsTouched(); // Marca todos los campos como "tocados" para mostrar errores
      return;
    }
    console.log('Form submitted:', this.form.value);

    const { usernameOrEmail, password, remember } = this.form.getRawValue();

    if (remember) {
      localStorage.setItem('rememberedUser', usernameOrEmail!);
    } else {
      localStorage.removeItem('rememberedUser');
    }

    this._authService
      .login({ username: usernameOrEmail!, password: password! })
      .subscribe({
        error: (err) => {
          // Handle login error
          console.error(err);
        },
      });
  }
}
