import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { CrudService } from "./crud.service";
import { PaymentKind } from "../models/payment-kind.model";

@Injectable({ providedIn: "root" })
export class PaymentKindService extends CrudService<PaymentKind> {
  constructor(httpClient: HttpClient) {
    super(httpClient, "PaymentKind");
  }
}
