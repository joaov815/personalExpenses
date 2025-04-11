import { Component, viewChild } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";
import { Popover, PopoverModule } from "primeng/popover";

import { toggleSidebar } from "../../store/default/default.reducer";
import { authLogout } from "../../store/auth/auth.actions";

@Component({
  selector: "pe-topbar",
  standalone: true,
  imports: [ButtonModule, MatIconModule, PopoverModule],
  templateUrl: "./topbar.component.html",
  styleUrl: "./topbar.component.scss",
})
export class TopbarComponent {
  constructor(private readonly _store: Store) {}

  op = viewChild<Popover>("op");

  toggleSidebar(): void {
    this._store.dispatch(toggleSidebar());
  }

  toggleOptions(event: any): void {
    this.op().toggle(event);
  }

  logout(event: any): void {
    this._store.dispatch(authLogout());
    this.op().toggle(event);
  }
}
