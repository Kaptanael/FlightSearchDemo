import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginFormGroup!: FormGroup;
  loginRespone:any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public authService: AuthService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.createLoginForm();
  }

  createLoginForm() {
    this.loginFormGroup = this.fb.group({
      username: [
        'ashfaqulislam136@yahoo.com',
        [
          Validators.required,
          this.noWhitespaceValidator,
          Validators.maxLength(64),
          Validators.email,
        ],
      ],
      password: [
        'Islam@12',
        [
          Validators.required,
          this.noWhitespaceValidator,
          Validators.maxLength(64),
          Validators.email,
        ],
      ],
    });
  }

  noWhitespaceValidator(control: AbstractControl) {
    if (control && control.value && !control.value.replace(/\s/g, '').length) {
      control.setValue('');
    }
    return null;
  }

  onLogin() {
    if (this.loginFormGroup?.valid) {
      const loginModel: any = {
        username: this.loginFormGroup.get('username')?.value,
        password: this.loginFormGroup.get('password')?.value,
      };
      this.authService.login(loginModel).subscribe(
        (response) => {
          console.log(response);
          if (response) {
            localStorage.setItem('token', (response as any).access_token);
            localStorage.setItem('username', (response as any).userName);
            this.messageService.add({
              key: 'toastKey1',
              severity: 'success',
              summary: 'Logged in successfully',
              detail: '',
            });
            console.log(localStorage.getItem('token'));
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        },
        () => {
          this.router.navigate(['/dashboard']);
        }
      );
    }
  }
}
