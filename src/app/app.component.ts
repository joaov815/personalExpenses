import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { expandContent, slide } from './animations/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<router-outlet />`,
  animations: [slide, expandContent],
})
export class AppComponent {}
