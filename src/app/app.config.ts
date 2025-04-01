import { provideHttpClient, withInterceptors } from "@angular/common/http";
import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { provideRouter } from "@angular/router";
import { provideEffects } from "@ngrx/effects";
import { provideStore } from "@ngrx/store";
import Aura from "@primeng/themes/aura";
import { providePrimeNG } from "primeng/config";

import * as authEffects from "./store/auth/auth.effects";
import { authReducer } from "./store/auth/auth.reducer";
import { routes } from "./app.routes";
import { defaultReducer } from "./store/default/default.actions";
import { authInterceptor } from "./interceptors/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura } }),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideStore({ default: defaultReducer, auth: authReducer }),
    provideEffects(authEffects),
  ],
};
