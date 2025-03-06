import { Base } from "./base.model";

export class Account extends Base<Account> {
  name: string;
  email: string;
  keycloakId: string;
}
