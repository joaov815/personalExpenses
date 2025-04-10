import { Routes } from "@angular/router";

import { authGuard } from "./guards/auth.guard";
import { loginGuard } from "./guards/login.guard";
import { DefaultComponent } from "./layouts/default/default.component";
import { LoginComponent } from "./views/login/login.component";

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
        title: "Categories",
        loadChildren: () => import("./views/expense-kind/expense-kind.module").then(m => m.ExpenseKindModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];
