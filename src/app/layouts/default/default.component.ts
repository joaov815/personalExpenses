import { Component, Signal, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { Store } from "@ngrx/store";

import { expandContent } from "../../animations/animations";
import { TopbarComponent } from "../topbar/topbar.component";
import { SidebarComponent } from "../sidebar/sidebar.component";
import { selectIsSidebarHidden } from "../../store/default/default.selectors";

@Component({
  selector: "pe-default",
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent],
  templateUrl: "./default.component.html",
  styleUrl: "./default.component.scss",
  animations: [expandContent],
})
export class DefaultComponent {
  constructor(private readonly _store: Store) {
    this.isHidden = this._store.selectSignal(selectIsSidebarHidden);
    setTimeout(() => this.animationsDisabled.set(false), 200);
  }

  isHidden: Signal<boolean>;
  isMobile = signal(false);
  animationsDisabled = signal(true);
}
