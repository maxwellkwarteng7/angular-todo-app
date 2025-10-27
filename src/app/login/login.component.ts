import { Component, inject, signal } from "@angular/core";
import { Router, RouterLink } from "@angular/router";
import { LoginInfo } from "../models/class";
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { generateToken, storeUsername } from "../models/data";
import nProgress from "nprogress";

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

  
  // injecting the router service to use it 
  router = inject(Router); 

  loginForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required]),
  });

  changeInputType() {
    // check input type variable and make necessary changes to the signal 
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
    // check if the key exists. if it does it means we have the user registered and the password is the value for the username 
    const savedPassword = localStorage.getItem(loginDetails.username);
    console.log("userpassword", savedPassword);
    if (savedPassword) {
      // check if the passwword matches the password the user entered . 
      if (savedPassword === loginDetails.password) {
        nProgress.start(); 
        // set the global state username to the users username 
        storeUsername(loginDetails.username); 
        // generate a token of the user for authentication 
        localStorage.setItem('token', generateToken()); 
        // navigate the user to the todo page 
        setTimeout(() => {
          this.router.navigateByUrl('/todo'); 
          nProgress.done(); 
        }, 2000);
        
      } else {
        // set the error message to the loginErrorMessage variable 
        this.loginErrorMessage = "Incorrect password, please try again.";
        // clear the error message after some set time 
        this.clearLoginErrorMessage();
      }
    } else {
       // set the error message to the loginErrorMessage variable 
      this.loginErrorMessage = "We cannot find an account for this username";
       // clear the error message after some set time 
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
