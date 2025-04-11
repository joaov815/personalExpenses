import { Component, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Button } from "primeng/button";
import { InputText } from "primeng/inputtext";
import { Toast } from "primeng/toast";

import { AutofocusDirective } from "../../../directives/autofocus.directive";
import { ExpenseKindService } from "../../../services/expense-kind.service";

@Component({
  selector: "pe-category-form",
  standalone: true,
  imports: [Button, InputText, ReactiveFormsModule, AutofocusDirective, Toast],
  templateUrl: "./expense-kind-form.component.html",
  styleUrl: "./expense-kind-form.component.scss",
  providers: [MessageService],
})
export class ExpenseKindComponent {
  constructor(
    private readonly _expenseKindService: ExpenseKindService,
    private readonly _messageService: MessageService,
  ) {}

  form = new FormGroup({
    name: new FormControl("", [Validators.required]),
    description: new FormControl(null),
  });

  id = signal<string | null>(null);

  submit() {
    //
  }
}
