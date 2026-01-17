import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideFileRouter, requestContextInterceptor} from "@analogjs/router";
import {PreloadAllModules, withInMemoryScrolling, withNavigationErrorHandler, withPreloading} from "@angular/router";
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(withFetch(), withInterceptors([requestContextInterceptor])),
    provideFileRouter(
      withInMemoryScrolling({anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled'}),
      withNavigationErrorHandler(console.log),
      withPreloading(PreloadAllModules),
    ),
  ],
};
