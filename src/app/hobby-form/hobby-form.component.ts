import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-hobby-form',
  templateUrl: './hobby-form.component.html',
  styleUrls: ['./hobby-form.component.css'],
})
export class HobbyFormComponent {
  @Input() form!: FormGroup;
  hobbiesArray!: FormGroup[];
  get hobbies() {
    return this.form.controls['hobbies'] as FormArray;
  }

  addNewHobby() {
    const hobbyForm: FormGroup = new FormGroup({
      hobby: new FormControl('', Validators.required),
      duration: new FormControl('', [Validators.min(1), Validators.required]),
    })

    this.hobbies.push(hobbyForm);
  }

  removeHobby(i: number) {
    this.hobbies.removeAt(i)
  }
}
