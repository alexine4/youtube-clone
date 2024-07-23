import { TIME_OUT } from './system.properties'

export function changeLoaderStatus(): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(false);
        }, TIME_OUT);
    });
}
