import { Routes } from '@angular/router';
import { ExpensesComponent } from './views/expenses/expenses.component';

export const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  {
    component: ExpensesComponent,
    path: 'expenses',
    title: 'Expenses',
  },
];
