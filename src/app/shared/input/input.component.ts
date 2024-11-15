import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit{
  @Input() label: string = '';
  @Input() control: FormControl | undefined;
  @Input() inputType: string = '';
  @Input() controlType = 'input';

  constructor() {}

  ngOnInit() {}

  showErrors() {
    if(this.control?.dirty && this.control?.touched && this.control?.errors){
      const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
    } else {
      return false;
    }
    
  }
}
