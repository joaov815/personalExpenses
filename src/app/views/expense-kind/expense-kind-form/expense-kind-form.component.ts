import { Component } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { InputText } from "primeng/inputtext";

import { AutofocusDirective } from "../../../directives/autofocus.directive";
import { ExpenseKindService } from "../../../services/expense-kind.service";
import { CrudForm } from "../../../common/crud-form";
import { FormLayoutComponent } from "../../../layouts/form-layout/form-layout.component";

@Component({
  selector: "pe-category-form",
  standalone: true,
  imports: [InputText, ReactiveFormsModule, AutofocusDirective, FormLayoutComponent],
  templateUrl: "./expense-kind-form.component.html",
  styleUrl: "./expense-kind-form.component.scss",
  providers: [MessageService],
})
export class ExpenseKindFormComponent {
  constructor(expenseKindService: ExpenseKindService) {
    this.form = new CrudForm({
      controls: {
        name: new FormControl("", [Validators.required]),
        description: new FormControl(null),
      },
      crudService: expenseKindService,
    });
  }

  form: CrudForm;
}
