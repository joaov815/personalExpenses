import { Component, signal, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DatePicker } from "primeng/datepicker";
import { InputNumber } from "primeng/inputnumber";
import { InputText } from "primeng/inputtext";
import { Select } from "primeng/select";
import { ToggleSwitch } from "primeng/toggleswitch";
import { Checkbox } from "primeng/checkbox";
import { Button } from "primeng/button";
import { Toast } from "primeng/toast";
import { MessageService } from "primeng/api";

import { AutofocusDirective } from "../../../directives/autofocus.directive";
import { ExpenseKind } from "../../../models/expense-kind.model";
import { PaymentKind } from "../../../models/payment-kind.model";
import { ExpenseService } from "../../../services/expense.service";
import { CategoryService } from "../../../services/category.service";
import { PaymentKindService } from "../../../services/paymentKind.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-expense-form",
  standalone: true,
  imports: [
    Button,
    Checkbox,
    DatePicker,
    InputNumber,
    InputText,
    Select,
    ToggleSwitch,
    ReactiveFormsModule,
    AutofocusDirective,
    Toast,
  ],
  providers: [MessageService],
  templateUrl: "./expense-form.component.html",
  styleUrl: "./expense-form.component.scss",
})
export class ExpenseFormComponent implements OnInit {
  constructor(
    private readonly _expenseService: ExpenseService,
    private readonly _categoryService: CategoryService,
    private readonly _paymentKindService: PaymentKindService,
    private readonly _activedRoute: ActivatedRoute,
    private readonly _router: Router,
    private readonly _messageService: MessageService,
  ) {}

  form = new FormGroup({
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
  });

  categories = signal<ExpenseKind[]>([]);
  paymentOptions = signal<PaymentKind[]>([]);
  id = signal<string | null>(null);

  ngOnInit(): void {
    this.id.set(this._activedRoute.snapshot.params["id"] ?? null);

    this._categoryService.list().subscribe(categories => {
      this.categories.set(categories);
      console.log(categories);
    });
    this._paymentKindService.list().subscribe(kinds => {
      this.paymentOptions.set(kinds);
      console.log(kinds);
    });

    if (this.id()) {
      this._expenseService.getById(this.id()).subscribe(expense => {
        console.log(expense);

        this.form.patchValue({
          ...expense,
          date: new Date(expense.date),
          hasInstallments: expense.installmentsTotal > 1,
        });
      });
    }
  }

  submit(): void {
    // this._expenseService.create();
    const payload = this.form.value;

    if (this.form.valid) {
      this._expenseService.updateById(this.id(), payload).subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Gasto atualizado com sucesso",
            life: 3000,
          });
        },
      });

      this._expenseService.create(payload).subscribe({
        next: () => {
          this._messageService.add({
            severity: "success",
            summary: "Sucesso",
            detail: "Gasto adicionado",
            life: 3000,
          });

          this.form.reset();
          this.form.patchValue({
            value: 0,
            date: new Date(),
          });
        },
        error: () => {
          this._messageService.add({
            severity: "error",
            summary: "Erro",
            detail: "Houve um erro ao salvar novo gasto",
            life: 3000,
          });
        },
      });
    } else {
      this.markAllFieldsAsTouchedAndDirty(this.form);
    }
  }

  markAllFieldsAsTouchedAndDirty(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      if ((control as any).controls) {
        this.markAllFieldsAsTouchedAndDirty(control as FormGroup);
      }
    });
  }
}
