import { LogLevel, PassedInitialConfig } from 'angular-auth-oidc-client';

export const authConfig: PassedInitialConfig = {
  config: {
    authority: 'https://dev-izvueh8turp4j6m4.us.auth0.com',
    redirectUrl: 'http://localhost:4200/callback',
    postLogoutRedirectUri: 'http://localhost:4200',
    clientId: '9OuewAZns2xEyUR1oQtzCR9rcsLndSro',
    scope: 'openid profile offline_access email',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    logLevel: LogLevel.Debug,
    secureRoutes: ['/api'], //path key for frondend req
    customParamsAuthRequest: {
      audience: 'http://localhost:8080', // path backend secure api
    },
  },
};
