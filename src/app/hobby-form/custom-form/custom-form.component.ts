import { Component, OnDestroy, Input } from '@angular/core';
import {
  FormBuilder,
  NG_VALUE_ACCESSOR,
  NG_VALIDATORS,
  ControlValueAccessor,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { hobbyFormConfig } from 'src/app/store/variables';

@Component({
  selector: 'app-custom-form',
  templateUrl: './custom-form.component.html',
  styleUrls: ['./custom-form.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CustomFormComponent,
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CustomFormComponent,
    },
  ],
})
export class CustomFormComponent implements ControlValueAccessor, OnDestroy {
  @Input() form!: FormGroup;
  config = hobbyFormConfig;
  onTouched: Function = () => {};

  subs$: Subscription[] = [];

  ngOnDestroy(): void {
    for (let sub of this.subs$) {
      sub.unsubscribe();
    }
  }

  registerOnChange(onChange: any): void {
    const sub$ = this.form.valueChanges.subscribe(onChange);

    this.subs$.push(sub$);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    isDisabled ? this.form.disable() : this.form.enable();
  }

  writeValue(value: any) {
    if (value) {
      this.form.setValue(value, { emitEvent: false });
    }
  }

  validate() {
    if (this.form.valid) {
      return null;
    }

    let errors: any = {};
    errors = this.addControlErrors(errors, 'hobby');
    errors = this.addControlErrors(errors, 'duration');

    return errors;
  }

  addControlErrors(allErrors: any, controlName: string) {
    const errors = { ...allErrors };
    const controlErrors = this.form.controls[controlName].errors;
    if (controlErrors) {
      errors[controlName] = controlErrors;
    }

    return errors;
  }
}
