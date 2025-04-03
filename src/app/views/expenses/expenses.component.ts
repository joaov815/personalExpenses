import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

import { Expense } from "../../models/expense.model";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: "app-expenses",
  standalone: true,
  imports: [CommonModule, ButtonModule, TableModule],
  templateUrl: "./expenses.component.html",
  styleUrl: "./expenses.component.scss",
})
export class ExpensesComponent implements OnInit {
  constructor(private readonly expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.list().subscribe(console.log);
  }

  expenses = signal<Expense[]>([
    new Expense({
      id: "1",
      name: "Bala Mentos",
      date: new Date(),
      value: 14.98,
    }),
    new Expense({
      id: "2",
      name: "Livro de SP",
      date: new Date(),
      value: 80.98,
      installmentsTotal: 2,
      installmentsValue: 40.49,
      description: "Comprei mesmo, vamos ver se é bom",
      currentInstallment: 1,
      paymentKind: {
        id: "1",
        name: "Cartão de crédito",
      },
      expenseKind: {
        id: "1",
        name: "Cultura",
      },
    }),
  ]);
}
