import { Base } from "./base.model";

export class PaymentKind extends Base<PaymentKind> {
  name: string;
  description?: string | null;
}
