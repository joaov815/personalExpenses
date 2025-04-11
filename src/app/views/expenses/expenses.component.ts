import { CommonModule } from "@angular/common";
import { Component, OnInit, signal, OnDestroy } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { Subscription } from "rxjs";

import { Expense } from "../../models/expense.model";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: "pe-expenses",
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule, RouterLink],
  templateUrl: "./expenses.component.html",
  styleUrl: "./expenses.component.scss",
})
export class ExpensesComponent implements OnInit, OnDestroy {
  constructor(private readonly expenseService: ExpenseService) {}

  expenses = signal<Expense[]>([]);
  expenseSubscription: Subscription;

  ngOnInit(): void {
    this.expenseSubscription = this.expenseService.list().subscribe(expenses => {
      this.expenses.set(expenses);
    });
  }

  ngOnDestroy(): void {
    this.expenseSubscription.unsubscribe();
  }
}
