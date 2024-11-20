import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authConfig } from './auth/auth.config';
import { provideAuth } from 'angular-auth-oidc-client';



export const appConfig: ApplicationConfig = {

  providers: [
    provideAuth(authConfig),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideAnimations(),
    provideToastr({
      timeOut: 5000
    })
  ]
};
