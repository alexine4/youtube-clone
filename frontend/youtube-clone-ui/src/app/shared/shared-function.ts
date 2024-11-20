import { TIME_OUT } from './system.properties'

export function changeLoaderStatus(): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, TIME_OUT);
    });
}

export function getRedirectUrl(): string {
    if (typeof window !== 'undefined') {
        return window.location.origin;
    } else {
        return 'defaultRedirectUrl'; // Замініть на відповідне значення за замовчуванням
    }
}
