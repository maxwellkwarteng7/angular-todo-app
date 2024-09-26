import { Component, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { LoginInfo } from "../models/class";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [RouterLink, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  inputType = signal("password");
  loginErrorMessage: string = "";

  personDetails: LoginInfo = new LoginInfo();
  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  changeInputType() {
    if (this.inputType() == "password") {
      this.inputType.set("text");
    } else {
      this.inputType.set("password");
    }
  }

  // function to clear the login Error message
  clearLoginErrorMessage() {
    setTimeout(() => {
      this.loginErrorMessage = "";
    }, 10000);
  }



  handleLoginSubmission() {
    let loginDetails = this.loginForm.value;
    const details = localStorage.getItem(loginDetails.username);
    if (details) {
      if (details === loginDetails.password) {
        alert("Login successful");
      } else {
        this.loginErrorMessage = "Incorrect password, please try again.";
        this.clearLoginErrorMessage();
      }
    } else {
      this.loginErrorMessage = "We cannot find an account for this username";
      this.clearLoginErrorMessage();
    }
    // reset the form 
    this.loginForm.reset({
      username: loginDetails.username,
      password: "",
    });
  }


  //getting all the login form controls
  get field() {
    return this.loginForm.controls;
  }
}
