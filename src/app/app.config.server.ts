import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(), provideHttpClient(withInterceptorsFromDi())],
};

export const config = mergeApplicationConfig(serverConfig);
