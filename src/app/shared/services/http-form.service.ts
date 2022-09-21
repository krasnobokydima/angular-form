import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { IUser } from 'src/app/interfaces';
@Injectable({
  providedIn: 'root',
})
export class HttpFormService {
  constructor(private pipe: DatePipe) {}

  register(user: Partial<IUser>): Observable<boolean> {
    return of(user).pipe(
      map((user: Partial<IUser>) => {
        const newForm = JSON.parse(JSON.stringify(user));

        newForm.dateOfBirth = this.pipe.transform(
          user.dateOfBirth,
          'dd-MM-yyyy'
        );

        console.log(user);
        return true;
      })
    );
  }
}
