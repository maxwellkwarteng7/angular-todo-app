import { CommonModule } from "@angular/common";
import { Component, signal  , OnInit} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
  ValidationErrors
} from "@angular/forms";
import { RouterLink } from "@angular/router";




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
  // creating the form group to handle the registration form
  registerForm: FormGroup = new FormGroup({
    username: new FormControl("", [Validators.required, Validators.maxLength(30)]),
    password: new FormControl("", [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirmPassword: new FormControl("", [Validators.required]),
  }, {
    validators : this.passwordMatchValidator()
  } );


  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // Check if the control is a FormGroup
      if (control instanceof FormGroup) {
        const password = control.get('password')?.value;
        const confirmPassword = control.get('confirmPassword')?.value;
  
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



  // submit registration form data
  handleRegistration() {
    let registrationInputs = this.registerForm.value;
    console.log(registrationInputs);
    this.registerForm.reset(); 
  }

  // a function to check if the passwords match
 

  // return the form controls
 
  get field(){
    return this.registerForm.controls; 
  }
 
}
