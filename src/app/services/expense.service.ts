import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CrudService } from "./crud.service";

@Injectable({ providedIn: "root" })
export class ExpenseService extends CrudService {
  constructor(httpClient: HttpClient) {
    super(httpClient, "expenses");
  }
}
