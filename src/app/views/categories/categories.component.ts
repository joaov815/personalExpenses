import { CommonModule } from "@angular/common";
import { Component, OnInit, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { CategoryService } from "../../services/category.service";
import { Subscription } from "rxjs";
import { ExpenseKind } from "../../models/expense-kind.model";

@Component({
  selector: "pe-categories",
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule, RouterLink],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent implements OnInit {
  constructor(private readonly _categoryService: CategoryService) {}

  loadSubscription: Subscription;
  categories = signal<ExpenseKind[]>([]);

  ngOnInit(): void {
    this.loadSubscription = this._categoryService.list().subscribe(categories => {
      this.categories.set(categories);
    });
  }
}
