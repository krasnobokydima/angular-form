import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-hobby-form',
  templateUrl: './hobby-form.component.html',
  styleUrls: ['./hobby-form.component.css'],
})
export class HobbyFormComponent {
  @Input() hobbies!: FormArray;
  @Output() removeHobbyEvent = new EventEmitter<number>();
  @Output() addHobbyEvent = new EventEmitter();

  get hobbiesForms() {
    return this.hobbies.controls as FormGroup[];
  }
}
