import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExpenseKindComponent } from "./expense-kind.component";

const routes: Routes = [
  {
    path: "",
    component: ExpenseKindComponent,
    data: { name: "Categories" },
  },
  {
    path: ":id",
    component: ExpenseKindComponent,
    data: { name: "Category" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ExpenseKindModule {}
