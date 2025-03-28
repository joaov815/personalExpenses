import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import Aura from "@primeng/themes/aura";

import { routes } from "./app.routes";
import { providePrimeNG } from "primeng/config";
import { provideHttpClient } from "@angular/common/http";
import { provideStore } from "@ngrx/store";
import { defaultReducer } from "./store/default/default.actions";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: { preset: Aura },
    }),
    provideHttpClient(),
    provideStore({ default: defaultReducer }),
  ],
};
