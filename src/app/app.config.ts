import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, PreloadAllModules, withPreloading } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LayoutModule } from './layout/layout.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi()),
    importProvidersFrom(LayoutModule),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ]
};
