import { Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';

import { expandContent, slide } from './animations/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, ButtonModule, DrawerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [slide, expandContent],
})
export class AppComponent {
  constructor() {
    setTimeout(() => this.animationsDisabled.set(false), 200);
  }

  isMobile = signal(false);
  isHidden = signal(false);
  animationsDisabled = signal(true);

  toggleSidebar(): void {
    this.isHidden.set(!this.isHidden());
  }
}
