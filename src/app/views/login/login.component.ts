import { Component } from "@angular/core";
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToggleSwitchModule } from "primeng/toggleswitch";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ToggleSwitchModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  form = new UntypedFormGroup({
    user: new UntypedFormControl("", [Validators.required]),
    password: new UntypedFormControl("", [Validators.required]),
    keepSignedIn: new UntypedFormControl(false),
  });

  submit() {
    console.log(this.form.value);
    console.log("SUBMIT");
  }
}
