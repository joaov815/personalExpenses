import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { ExpenseKind } from "../models/expense-kind.model";

import { CrudService } from "./crud.service";

@Injectable({ providedIn: "root" })
export class ExpenseKindService extends CrudService<ExpenseKind> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "ExpenseKind");
  }
}
