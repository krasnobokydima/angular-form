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
import { libVersions, frameworks, hobbyFormConfig } from './store/constants';
import { Subscription } from 'rxjs';
import { CheckEmailService } from './shared/services/check-email.service';
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
    email: [
      null,
      {
        validators: [Validators.email, Validators.required],
        asyncValidators: [this.checkService.uniqueEmailValidator()],
      },
    ],
    hobbies: this.fb.array([]),
  });

  frameworks: Frameworks = frameworks;
  versions: Versions = [];
  subs$: Subscription[] = [];

  get hobbies() {
    return this.form.controls['hobbies'] as FormArray;
  }

  get hobbiesForms() {
    return this.hobbies.controls as FormGroup[];
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  constructor(
    private pipe: DatePipe,
    private fb: FormBuilder,
    private checkService: CheckEmailService
  ) {}

  ngAfterViewInit() {
    const framework = this.form.get('framework') as FormControl;

    const checkFramework$ = framework.valueChanges.subscribe(
      (value: string) => {
        this.versions = libVersions[value.toLowerCase()];
        this.form.get('frameworkVersion')?.enable();
      }
    );

    this.subs$.push(checkFramework$);
  }

  ngOnDestroy() {
    this.subs$.forEach((sub) => sub.unsubscribe());
  }

  onSubmit() {
    const newForm = JSON.parse(JSON.stringify(this.form.value));

    newForm.dateOfBirth = this.pipe.transform(
      this.form.value.dateOfBirth,
      'dd-MM-yyyy'
    );


    const { emailContainer } = this.checkService
    emailContainer.next([...emailContainer.value, newForm.email])

    console.log(newForm)
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
