import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ExpenseKindComponent } from "./expense-kind.component";
import { ExpenseKindFormComponent } from "./expense-kind-form/expense-kind-form.component";

const routes: Routes = [
  {
    path: "",
    component: ExpenseKindComponent,
    data: { name: "Categories" },
  },
  {
    path: ":id",
    component: ExpenseKindFormComponent,
    data: { name: "Category" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ExpenseKindModule {}
