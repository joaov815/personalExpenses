import { Routes } from "@angular/router";

import { authGuard } from "./guards/auth.guard";
import { DefaultComponent } from "./layouts/default/default.component";
import { LoginComponent } from "./views/login/login.component";
import { loginGuard } from "./guards/login.guard";

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
    title: "PE",
    children: [
      {
        path: "expenses",
        title: "PE - Expenses",
        loadComponent: () => import("./views/expenses/expenses.component").then(m => m.ExpensesComponent),
      },
    ],
  },
];
