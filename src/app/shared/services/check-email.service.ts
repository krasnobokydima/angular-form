import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { BehaviorSubject, catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckEmailService {
  public emailContainer = new BehaviorSubject<string[]>(['test@test.test'])

  emailExists(email: string): Observable<boolean> {
    return of(email).pipe(
      delay(500),
      map((email) => {
        const { emailContainer } = this
        if (emailContainer.value.includes('' + email)) return true;
        return false;
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
