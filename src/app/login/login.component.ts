import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginInfo } from '../models/class';
import { FormControl, FormGroup, FormsModule  ,ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink ,  FormsModule  , ReactiveFormsModule , CommonModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  inputType = signal('password'); 

  personDetails: LoginInfo = new LoginInfo(); 
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]), 
    password: new FormControl('', [Validators.required])
  });

  changeInputType() {
    if (this.inputType() == 'password') {
      this.inputType.set('text'); 
    } else {
      this.inputType.set('password'); 
    }
  }

 

  handleLoginSubmission() {
    let loginDetails = this.loginForm.value; 
    this.loginForm.reset({
      username: loginDetails.username,
      password : ''
    }); 
  }

  get field() {
    return this.loginForm.controls; 
  }


}
