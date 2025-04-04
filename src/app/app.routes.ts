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
        path: "categories",
        title: "Categories",
        loadChildren: () => import("./views/categories/categories.module").then(m => m.CategoriesModule),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "home",
  },
];
