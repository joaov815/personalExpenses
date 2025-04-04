import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";

@Component({
  selector: "app-categories",
  standalone: true,
  imports: [ButtonModule, CommonModule, TableModule],
  templateUrl: "./categories.component.html",
  styleUrl: "./categories.component.scss",
})
export class CategoriesComponent {
  categories = signal([]);
}
