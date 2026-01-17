import '@angular/platform-server/init';

import {provideServerContext} from '@analogjs/router/server';
import type {ServerContext} from '@analogjs/router/tokens';
import {bootstrapApplication, type BootstrapContext} from '@angular/platform-browser';
import {renderApplication} from '@angular/platform-server';
import {config} from './app.config.server';
import {App} from './app/app';


const bootstrap = (context: BootstrapContext) => bootstrapApplication(App, config, context);

export default async function render(url: string, document: string, serverContext: ServerContext) {
  return await renderApplication(bootstrap, {
    document,
    url: url,
    platformProviders: [provideServerContext(serverContext)]
  });
}
