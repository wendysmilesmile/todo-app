import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { mockBackendInterceptor } from './services/mock-backend.interceptor';
import { TODO_API_BASE_URL } from './services/todo-api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([mockBackendInterceptor])),
    {
      provide: TODO_API_BASE_URL,
      useValue: 'http://localhost:5151'
    }
  ]
};
