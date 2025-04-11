import { Routes } from "@angular/router";

import { authGuard } from "./guards/auth.guard";
import { loginGuard } from "./guards/login.guard";
import { DefaultComponent } from "./layouts/default/default.component";
import { LoginComponent } from "./views/login/login.component";
import { ExpenseKindFormComponent } from "./views/expense-kind/expense-kind-form/expense-kind-form.component";
import { ExpenseKindComponent } from "./views/expense-kind/expense-kind.component";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  {
    path: "login",
    title: "Login",
    component: LoginComponent,
    canActivate: [loginGuard],
  },
  {
    path: "",
    component: DefaultComponent,
    canActivate: [authGuard],
    title: "",
    children: [
      {
        path: "home",
        title: "Home",
        loadComponent: () => import("./views/home/home.component").then(m => m.HomeComponent),
      },
      {
        path: "expenses",
        title: "Expenses",
        loadComponent: () => import("./views/expenses/expenses.component").then(m => m.ExpensesComponent),
      },
      {
        path: "expense",
        title: "Expense",
        loadComponent: () =>
          import("./views/expenses/expense-form/expense-form.component").then(m => m.ExpenseFormComponent),
      },
      {
        path: "expense/:id",
        title: "Expense",
        loadComponent: () =>
          import("./views/expenses/expense-form/expense-form.component").then(m => m.ExpenseFormComponent),
      },
      {
        path: "categories",
        component: ExpenseKindComponent,
        data: { name: "Categories" },
      },
      {
        path: "category",
        component: ExpenseKindFormComponent,
        data: { name: "Category" },
      },
      {
        path: "category/:id",
        component: ExpenseKindFormComponent,
        data: { name: "Category" },
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];
