import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordsMatchValidator } from '../validators/pass-match';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  authForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = new FormGroup(
      {
        username: new FormControl(
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(20),
            //Validators.pattern(/^[a-z0-9]+$/)
          ],
          [UniqueUsername(this.authService)] //asyn validation
        ),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ]),
        passwordConfirmation: new FormControl('', [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20)
        ])
      },
      { validators: [passwordsMatchValidator()] } //sync custom formgroup level validation
    );
  
  }


  ngOnInit() {
    localStorage.removeItem('username')
  }

  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }

    const credentials = {
      username: this.authForm.value.username ?? '', // Default to empty string if null
      password: this.authForm.value.password ?? '', // Default to empty string if null
      passwordConfirmation: this.authForm.value.passwordConfirmation ?? ''
    };

    this.authService.signup(credentials).subscribe({
      next: response => {
        this.router.navigateByUrl('/inbox');
      },
      error: err => {
        if (!err.status) {
          this.authForm.setErrors({ noConnection: true });
        } else {
          this.authForm.setErrors({ unknownError: true });
        }
      }
    });
  }

  signin(){
    this.router.navigateByUrl("")
  }

}
