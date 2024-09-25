import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginInfo } from '../models/class';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink , FormsModule , ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  inputType = signal('password'); 

  personDetails: LoginInfo = new LoginInfo(); 

  changeInputType() {
    if (this.inputType() == 'password') {
      this.inputType.set('text'); 
    } else {
      this.inputType.set('password'); 
    }
  }

  handleLoginSubmission() {
    console.log(this.personDetails);
    this.personDetails = new LoginInfo(); 
  }

}
