import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {
  emailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(500),
      map((email) => {
        return email === 'test@test.test';
      })
    );
  }

  uniqueEmailValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.emailExists(control.value).pipe(
        map((exists) => (exists ? { emailExists: true } : null)),
        catchError(async () => null)
      );
    };
  }
}
