import { Base } from "./base.model";
import { ExpenseKind } from "./expense-kind.model";
import { PaymentKind } from "./payment-kind.model";

export class Expense extends Base<Expense> {
  constructor(partial: Partial<Expense>) {
    super(partial);
    Object.assign(this, partial);
  }

  name: string;
  value: number;
  date: Date;
  description?: string | null;
  installmentsTotal?: number | null;
  installmentsValue?: number | null;
  currentInstallment?: number | null;
  expenseKind?: ExpenseKind | null;
  paymentKind?: PaymentKind | null;
  hasInstallments?: boolean;

  get isOneTimePayment(): boolean {
    return !!(this.installmentsTotal && this.installmentsValue);
  }
}
