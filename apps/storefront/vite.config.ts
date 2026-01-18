/// <reference types="vitest" />

import analog from '@analogjs/platform';
import {defineConfig, splitVendorChunkPlugin} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'node:path';
// @ts-ignore
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  return {
    root: __dirname,
    publicDir: 'public',

    ssr: {
      noExternal: [
        '@spartan-ng/**',
        '@angular/cdk/**',
        'ngx-scrollbar/**',
        'ng-signal-forms/**',
        '@medusajs/js-sdk',
        '@medusajs/types',
      ],
    },

    optimizeDeps: {
      include: [
        '@angular/common',
        '@angular/forms',
        '@angular/platform-browser',
        'isomorphic-fetch',
        'ng-signal-forms',
      ],
    },

    build: {
      outDir: '../../dist/apps/storefront/client',
      reportCompressedSize: true,
      commonjsOptions: {transformMixedEsModules: true},
      target: ['es2020'],
    },

    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },

    plugins: [
      tailwindcss(),
      tsconfigPaths(),
      analog({
        content: {
          highlighter: 'prism',
        },
        prerender: {
          routes: [
            '/',
          ],
          sitemap: {
            host: 'http://localhost:4200',
          },
        },
      }),
      splitVendorChunkPlugin(),
    ],

    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
      cache: {
        dir: '../../node_modules/.vitest',
      },
    },

    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
