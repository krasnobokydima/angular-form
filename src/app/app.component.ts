import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

import {
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Versions, Frameworks } from './interfaces';
import { HttpFormService } from './shared/services/http-form.service';
import { libVersions, frameworks, hobbyFormConfig } from './store/variables';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
  config = hobbyFormConfig;
  form = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, [Validators.required]],
    dateOfBirth: [null, Validators.required],
    framework: [null, Validators.required],
    frameworkVersion: [{ value: null, disabled: true }, Validators.required],
    email: [null, [Validators.email, Validators.required]],
    hobbies: this.fb.array([]),
  });

  frameworks: Frameworks = frameworks;
  versions: Versions = [];
  form$!: Subscription;

  ngAfterViewInit() {
    const framework = this.form.get('framework') as FormControl;

    this.form$ = framework.valueChanges.subscribe((value: string) => {
      this.versions = libVersions[value.toLowerCase()];
      this.form.get('frameworkVersion')?.enable();
    });
  }

  ngOnDestroy() {
    this.form$.unsubscribe();
  }

  constructor(
    private http: HttpFormService,
    private pipe: DatePipe,
    private fb: FormBuilder
  ) {}

  onSubmit() {
    const newForm = JSON.parse(JSON.stringify(this.form.value));

    newForm.dateOfBirth = this.pipe.transform(
      this.form.value.dateOfBirth,
      'dd-MM-yyyy'
    );

    this.http.post(newForm);
  }

  get hobbies() {
    return this.form.controls['hobbies'] as FormArray;
  }

  get hobbiesForms() {
    return this.hobbies.controls as FormGroup[];
  }

  addHobby() {
    this.hobbies.push(
      this.fb.group({
        hobby: [null, Validators.required],
        duration: [null, [Validators.min(1), Validators.required]],
      })
    );
  }

  removeHobby(i: number) {
    this.hobbies.removeAt(i);
  }
}
