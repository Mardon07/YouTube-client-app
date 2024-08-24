import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup | undefined ;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordStrengthValidator]]
    });
  }

  login(): void {
    if (this.loginForm!.valid) {
      // Логика для входа
      this.router.navigate(['/']);
    }
  }

  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasMinLength = value.length >= 8;
    const hasUpperCaseLowerCase = /[A-Z]/.test(value) && /[a-z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialCharacter = /[!@#?]/.test(value);

    const passwordValid = hasMinLength && hasUpperCaseLowerCase && hasNumber && hasSpecialCharacter;
    return !passwordValid ? {
      passwordStrength: {
        hasMinLength,
        hasUpperCaseLowerCase,
        hasNumber,
        hasSpecialCharacter
      }
    } : null;
  }
}