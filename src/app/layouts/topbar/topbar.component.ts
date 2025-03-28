import { Component } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { Store } from "@ngrx/store";
import { ButtonModule } from "primeng/button";

import { toggleSidebar } from "../../store/default/default.reducer";

@Component({
  selector: "app-topbar",
  standalone: true,
  imports: [ButtonModule, MatIconModule],
  templateUrl: "./topbar.component.html",
  styleUrl: "./topbar.component.scss",
})
export class TopbarComponent {
  constructor(private readonly _store: Store) {}

  toggleSidebar(): void {
    this._store.dispatch(toggleSidebar());
  }
}
