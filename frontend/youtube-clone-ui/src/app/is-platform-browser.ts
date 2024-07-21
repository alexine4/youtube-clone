import { InjectionToken, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const IS_PLATFORM_BROWSER = new InjectionToken<boolean>(
    'Whether the current platform is a browser',
    {
        providedIn: 'root',
        factory: () => isPlatformBrowser(inject(PLATFORM_ID)),
    },
);