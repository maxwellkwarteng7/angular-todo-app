import { Component , signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  inputType = signal('password'); 
  inputType1 = signal('password'); 

  changeInputType(val : string ) {
    if (val == 'password') {
      if (this.inputType() == 'password') {
        this.inputType.set('text'); 
      } else {
        this.inputType.set('password'); 
      }
    } else {
      if (this.inputType1() == 'password') {
        this.inputType1.set('text'); 
      } else {
        this.inputType1.set('password'); 
      }
    }
  }
}
