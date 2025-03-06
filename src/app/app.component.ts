import { Component, model, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DrawerModule } from 'primeng/drawer';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatIconModule, ButtonModule, DrawerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('slide', [
      state('open', style({ transform: 'translateX(0)' })),
      state('closed', style({ transform: 'translateX(-100%)' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ],
})
export class AppComponent {
  constructor(private breakpointObserver: BreakpointObserver) {
    this.breakpointObserver
      .observe([this.mobileBreakpoint])
      .subscribe((result) => {
        this.isMobile.set(result.matches);
      });
  }

  private readonly mobileBreakpoint = Breakpoints.Handset;

  visible = model(false);
  isMobile = signal(false);
  isHidden = signal(false); // Signal to track visibility

  toggleSidebar() {
    this.isHidden.set(!this.isHidden());
  }
}
