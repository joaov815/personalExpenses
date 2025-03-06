import { Base } from './base.model';

export class ExpenseKind extends Base<ExpenseKind> {
  name: string;
  description?: string | null;
}
