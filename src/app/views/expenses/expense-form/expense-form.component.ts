import { Component, signal, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule, Validators } from "@angular/forms";
import { Checkbox } from "primeng/checkbox";
import { DatePicker } from "primeng/datepicker";
import { InputNumber } from "primeng/inputnumber";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { ToggleSwitch } from "primeng/toggleswitch";

import { CrudForm } from "../../../common/crud-form";
import { AutofocusDirective } from "../../../directives/autofocus.directive";
import { FormLayoutComponent } from "../../../layouts/form-layout/form-layout.component";
import { ExpenseKind } from "../../../models/expense-kind.model";
import { PaymentKind } from "../../../models/payment-kind.model";
import { ExpenseKindService } from "../../../services/expense-kind.service";
import { ExpenseService } from "../../../services/expense.service";
import { PaymentKindService } from "../../../services/payment-kind.service";

@Component({
  selector: "pe-expense-form",
  standalone: true,
  imports: [
    Checkbox,
    DatePicker,
    InputNumber,
    InputText,
    Select,
    ToggleSwitch,
    ReactiveFormsModule,
    AutofocusDirective,
    FormLayoutComponent,
  ],
  templateUrl: "./expense-form.component.html",
  styleUrl: "./expense-form.component.scss",
})
export class ExpenseFormComponent implements OnInit {
  constructor(
    _expenseService: ExpenseService,
    private readonly _expenseKindService: ExpenseKindService,
    private readonly _paymentKindService: PaymentKindService,
  ) {
    this.form = new CrudForm({
      controls: {
        name: new FormControl("", [Validators.required]),
        value: new FormControl(0, [Validators.required, Validators.min(0.01)]),
        date: new FormControl(new Date(), [Validators.required]),
        description: new FormControl(null),
        expenseKindId: new FormControl(null),
        paymentKindId: new FormControl(null),
        installmentsTotal: new FormControl(null, [Validators.min(2)]),
        currentInstallment: new FormControl(null, [Validators.min(0)]),
        shouldAddOtherInstallments: new FormControl(false, []),
        hasInstallments: new FormControl(false, []),
      },
      crudService: _expenseService,
    });
  }

  form: CrudForm;
  categories = signal<ExpenseKind[]>([]);
  paymentOptions = signal<PaymentKind[]>([]);

  ngOnInit(): void {
    this._expenseKindService.list().subscribe(categories => {
      this.categories.set(categories);
    });
    this._paymentKindService.list().subscribe(kinds => {
      this.paymentOptions.set(kinds);
    });
  }
}
