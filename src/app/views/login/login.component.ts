import { Component, Signal } from "@angular/core";
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { ToggleSwitchModule } from "primeng/toggleswitch";

import { authLogin } from "../../store/auth/auth.actions";
import { selectAuthIsLoading } from "../../store/auth/auth.selectors";

@Component({
  selector: "pe-login",
  standalone: true,
  imports: [ButtonModule, InputTextModule, ReactiveFormsModule, ToggleSwitchModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  constructor(private readonly _store: Store) {
    this.isLoading = _store.selectSignal(selectAuthIsLoading);
    this.form = new UntypedFormGroup({
      user: new UntypedFormControl("", [Validators.required]),
      password: new UntypedFormControl("", [Validators.required]),
      keepSignedIn: new UntypedFormControl(false),
    });
  }

  isLoading: Signal<boolean>;
  form: UntypedFormGroup;

  submit(): void {
    this._store.dispatch(authLogin(this.form.value));
  }
}
