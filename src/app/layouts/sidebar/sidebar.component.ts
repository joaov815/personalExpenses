import { Component, Signal } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterLink } from "@angular/router";
import { Store } from "@ngrx/store";

import { slide } from "../../animations/animations";
import { selectIsSidebarHidden } from "../../store/default/default.selectors";

@Component({
  selector: "pe-sidebar",
  standalone: true,
  imports: [MatIconModule, RouterLink],
  animations: [slide],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.scss",
})
export class SidebarComponent {
  constructor(private readonly _store: Store) {
    this.isHidden = this._store.selectSignal(selectIsSidebarHidden);
  }

  isHidden: Signal<boolean>;
}
