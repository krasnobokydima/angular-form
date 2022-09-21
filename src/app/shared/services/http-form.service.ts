import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IUser } from 'src/app/interfaces';
import { CheckEmailService } from './check-email.service';
@Injectable({
  providedIn: 'root',
})
export class HttpFormService {
  constructor(
    private pipe: DatePipe,
    private checkService: CheckEmailService
  ) {}

  register(user: Partial<IUser>): Observable<boolean> {
    return of(user).pipe(
      map((user: Partial<IUser>) => {
        const newForm = JSON.parse(JSON.stringify(user));

        newForm.dateOfBirth = this.pipe.transform(
          user.dateOfBirth,
          'dd-MM-yyyy'
        );

        const { emailContainer } = this.checkService;
        emailContainer.next([...emailContainer.value, newForm.email]);
        console.log(user);

        return true;
      })
    );
  }
}
