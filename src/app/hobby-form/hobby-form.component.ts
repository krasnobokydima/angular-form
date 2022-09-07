import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Hobby } from '../interfaces';

@Component({
  selector: 'app-hobby-form',
  templateUrl: './hobby-form.component.html',
  styleUrls: ['./hobby-form.component.css'],
})
export class HobbyFormComponent implements OnInit {
  @Input() form!: FormGroup;
  @Output() onAddHobby = new EventEmitter<string>();
  @Input() hobbies!: Hobby[];

  constructor() {}

  ngOnInit(): void {}

  addNewHobby() {
    this.onAddHobby.emit();
  }
}
