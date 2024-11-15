import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';

export function UniqueUsername(authService: AuthService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const { value } = control;

    return authService.usernameAvailable(value).pipe(
      map(response => {
        if (response.available) {
          return null; // No errors
        } else {
          return { nonUniqueUsername: true }; // Validation error
        }
      }),
      catchError(err => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true }); // Handle specific error
        } else {
          return of({ noConnection: true }); // Handle general error
        }
      })
    );
  };
}




