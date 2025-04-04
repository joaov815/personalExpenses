import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Expense } from "../models/expense.model";

import { CrudService } from "./crud.service";

@Injectable({ providedIn: "root" })
export class CategoryService extends CrudService<Expense> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "ExpenseKind");
  }
}
