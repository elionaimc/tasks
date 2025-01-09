import { ApplicationConfig, Injector, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export let AppInjector: Injector;

export function setAppInjector(injector: Injector) {
  AppInjector = injector;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimations()
  ]
};
