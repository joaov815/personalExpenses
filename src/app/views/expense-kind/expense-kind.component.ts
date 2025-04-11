import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { Subscription } from "rxjs";

import { ExpenseKindService } from "../../services/expense-kind.service";
import { ExpenseKind } from "../../models/expense-kind.model";

@Component({
  selector: "pe-categories",
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule, RouterLink],
  templateUrl: "./expense-kind.component.html",
  styleUrl: "./expense-kind.component.scss",
})
export class ExpenseKindComponent implements OnInit {
  constructor(private readonly _expenseKindService: ExpenseKindService) {}

  loadSubscription: Subscription;
  categories = signal<ExpenseKind[]>([]);

  ngOnInit(): void {
    this.loadSubscription = this._expenseKindService.list().subscribe(categories => {
      this.categories.set(categories);
    });
  }
}
