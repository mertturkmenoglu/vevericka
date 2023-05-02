/// <reference types="vitest" />
/// <reference types="vite-plugin-svgr/client" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';
import codegen from 'vite-plugin-graphql-codegen';
import type { UserConfig as VitestUserConfigInterface } from 'vitest/config';

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
  },
};

// https://vitejs.dev/config/

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    codegen({
      runOnStart: false,
      enableWatcher: true,
      runOnBuild: false,
    }),
  ],
  // @ts-ignore
  test: vitestConfig.test,
});
