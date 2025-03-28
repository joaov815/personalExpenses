import { Routes } from '@angular/router';

import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './views/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', title: 'Login', component: LoginComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [],
    title: 'PE',
    children: [
      {
        path: 'expenses',
        title: 'PE - Expenses',
        loadComponent: () =>
          import('./views/expenses/expenses.component').then(
            (m) => m.ExpensesComponent
          ),
      },
    ],
  },
];
