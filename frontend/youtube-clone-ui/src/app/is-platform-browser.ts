import { InjectionToken, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export const IS_PLATFORM_BROWSER = new InjectionToken<string>('window.location.origin', {
    providedIn: 'root',
    factory: () => {
        const platformId = inject(PLATFORM_ID);
        if (isPlatformBrowser(platformId)) {
            return window.location.origin;
        } else {
            return 'defaultRedirectUrl'; // Замінити на відповідне значення за замовчуванням
        }
    },
});