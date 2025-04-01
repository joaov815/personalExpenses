import { Routes } from "@angular/router";

import { authGuard } from "./guards/auth.guard";
import { DefaultComponent } from "./layouts/default/default.component";
import { LoginComponent } from "./views/login/login.component";

export const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", title: "Login", component: LoginComponent },
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
