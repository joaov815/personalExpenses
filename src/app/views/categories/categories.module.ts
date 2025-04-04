import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CategoriesComponent } from "./categories.component";
import { CategoryFormComponent } from "./category-form/category-form.component";

const routes: Routes = [
  {
    path: "",
    component: CategoriesComponent,
    data: { name: "Categories" },
  },
  {
    path: ":id",
    component: CategoryFormComponent,
    data: { name: "Category" },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class CategoriesModule {}
