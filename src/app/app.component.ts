import { Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Validators, FormBuilder } from '@angular/forms';
import { Versions, Libraries } from './interfaces';
import { HttpFormService } from './shared/services/http-form.service';
import { libVersions } from './store/variables';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, [Validators.required]],
    dateOfBirth: [null, Validators.required],
    framework: [null, Validators.required],
    frameworkVersion: [{value: null, disabled: true}, Validators.required],
    email: [null, [Validators.email, Validators.required]],
    hobbies: this.fb.array([]),
  });

  versions: Versions = [];

  constructor(
    private http: HttpFormService,
    private pipe: DatePipe,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    const newForm = JSON.parse(JSON.stringify(this.form.value));

    newForm.dateOfBirth = this.pipe.transform(
      newForm.dateOfBirth,
      'dd-MM-yyyy'
    );

    this.http.post(newForm);
  }

  onChange($event: Libraries) {
    this.versions = libVersions[$event.toLowerCase()];
    this.form.get('frameworkVersion')?.enable();
  }
}
