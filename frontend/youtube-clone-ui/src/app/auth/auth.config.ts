import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';
import { getRedirectUrl } from '../shared/shared-function';


export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://dev-izvueh8turp4j6m4.us.auth0.com',
    redirectUrl: getRedirectUrl(),
    clientId: '9OuewAZns2xEyUR1oQtzCR9rcsLndSro',
    scope: 'openid profile offline_access',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    logLevel: LogLevel.Debug,
  }
}
