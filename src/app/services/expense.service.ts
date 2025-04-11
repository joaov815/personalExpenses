import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Expense } from "../models/expense.model";

import { CrudService } from "./crud.service";
import { map, Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class ExpenseService extends CrudService<Expense> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "Expense");
  }

  override getById(id: string): Observable<Expense> {
    return super.getById(id).pipe(
      map(expense => {
        expense.date = new Date(expense.date);
        expense.hasInstallments = expense.installmentsTotal > 1;

        return expense;
      }),
    );
  }
}
