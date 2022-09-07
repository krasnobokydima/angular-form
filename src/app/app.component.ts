import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common'

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Versions, LibVersions, Libraries, Hobby } from './interfaces';
import { HttpFormService } from './shared/services/http-form.service';

const libVersions: LibVersions = {
  angular: ['1.1.1', '1.2.1', '1.3.3'],
  react: ['2.1.2', '3.2.4', '4.3.1'],
  vue: ['3.3.1', '5.2.1', '5.1.3'],
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  versions: Versions = [];
  isEnable = () => this.versions.length === 0;
  hobbies: Hobby[] = [];

  constructor(private http: HttpFormService, private pipe: DatePipe) {}

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      dateOfBirth: new FormControl(null, Validators.required),
      framework: new FormControl(null, Validators.required),
      frameworkVersion: new FormControl(
        { value: null, disabled: false },
        Validators.required
      ),
      email: new FormControl(null, [Validators.email, Validators.required]),
      hobby: new FormControl(null, Validators.minLength(3)),
      duration: new FormControl(null, Validators.min(1)),
    });
  }

  onSubmit() {
    const newForm = Object.assign({}, this.form.value)
    newForm.hobby = this.hobbies
    delete newForm.duration;
    newForm.dateOfBirth = this.pipe.transform(newForm.dateOfBirth,'dd-MM-yyyy');

    this.http.post(newForm)
  }

  onChange($event: Libraries) {
    this.versions = libVersions[$event.toLowerCase()]
    this.form.get('frameworkVersion')?.enable();
  }

  addHobby(): void {
    this.hobbies.push({
      hobby: this.form.get('hobby')?.value,
      duration: this.form.get('duration')?.value,
    })

    this.form.get('hobby')?.reset()
    this.form.get('duration')?.reset()
  }
}
