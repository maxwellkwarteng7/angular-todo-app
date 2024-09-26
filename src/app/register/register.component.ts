import { CommonModule } from "@angular/common";
import { Component, signal, OnInit, inject } from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  ValidationErrors,
} from "@angular/forms";
import { Router, RouterLink } from "@angular/router";
import { data } from "../models/data";

@Component({
  selector: "app-register",
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.scss",
})
export class RegisterComponent {
  inputType = signal("password");
  inputType1 = signal("password");
  //registration error
  registrationErrorMessage: string = "";
  //injecting the router service to use in navigation to other pages
  router = inject(Router);
  // creating the form group to handle the registration form
  registerForm: FormGroup = new FormGroup(
    {
      username: new FormControl("", [
        Validators.required,
        Validators.maxLength(30),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl("", [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator(),
    }, 
  );
  // a function that checks if the password matches 
  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check if the control is a FormGroup
      if (control instanceof FormGroup) {
        const password = control.get("password")?.value;
        const confirmPassword = control.get("confirmPassword")?.value;

        // Return an error object if passwords do not match
        return password && confirmPassword && password !== confirmPassword
          ? { mismatch: true }
          : null; // Return null if passwords match
      }
      return null; // Return null if control is not a FormGroup
    };
  }



  changeInputType(val: string) {
    if (val == "password") {
      if (this.inputType() == "password") {
        this.inputType.set("text");
      } else {
        this.inputType.set("password");
      }
    } else {
      if (this.inputType1() == "password") {
        this.inputType1.set("text");
      } else {
        this.inputType1.set("password");
      }
    }
  }

  // clear the error message
  clearErrorMessage() {
    setTimeout(() => {
      this.registrationErrorMessage = "";
    }, 10000);
  }

  // a function to clean up the spaces in the username and give it just one space 
 

  // submit registration form data
  handleRegistration() {
    // get the input values
    let registrationInputs = this.registerForm.value;
    //check if username already exists
    let username = localStorage.getItem(registrationInputs.username);
    if (username) {
      this.registerForm.reset();
      this.registrationErrorMessage = "Username is already taken";
      this.clearErrorMessage();
    } else {
      // store the data 
      localStorage.setItem(
        registrationInputs.username,
        registrationInputs.password
      );
      // reset the form
      this.registerForm.reset();
      //navigate to login
      this.router.navigateByUrl("/login");
    }
  }



  // return the form controls
  get field() {
    return this.registerForm.controls;
  }
}
