import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { TODO_API_BASE_URL } from './services/todo-api.config';

const API_BASE_URL = import.meta.env.BACKEND_API_BASE_URL || 'http://localhost:8080';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAnimationsAsync(),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: TODO_API_BASE_URL,
      useValue: API_BASE_URL
    }
  ]
};
