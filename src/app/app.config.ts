import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import Material from "@primeng/themes/material";

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
      theme: {
        preset: Material,
        options: {
          mode: "light",
          primaryColor: "#007BFF",
          fontColor: "#000",
        },
      },
    }),
    provideHttpClient(),
    provideStore({ default: defaultReducer }),
  ],
};
