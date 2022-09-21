import { OnInit, Component, OnDestroy } from '@angular/core';

import {
  Validators,
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Frameworks, IUser } from './interfaces';
import { HttpFormService } from './shared/services/http-form.service';
import { libVersions, frameworks } from './store/constants';
import { Subscription } from 'rxjs';
import { CheckEmailService } from './shared/services/check-email.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  hobbyForm = this.fb.group({
    hobby: [null, Validators.required],
    duration: [null, [Validators.min(1), Validators.required]],
  })

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
    hobbies: this.fb.array([
      this.hobbyForm
    ]),
  });

  frameworks: Frameworks = frameworks;
  versions: string[] = [];
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
    private fb: FormBuilder,
    private checkService: CheckEmailService,
    private httpForm: HttpFormService
  ) {}

  ngOnInit() {
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
    this.httpForm.register(this.form.value as Partial<IUser>).subscribe()
  }

  addHobby() {
    this.hobbies.push(this.hobbyForm);
  }

  removeHobby(i: number) {
    this.hobbies.removeAt(i);
  }
}
