import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-vite-plugin';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';

// https://vitejs.dev/config/
/** @type {import('vite').UserConfig} */
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react(), TanStackRouterVite(), vanillaExtractPlugin()],
    define: {
      __API_URL__: JSON.stringify(env.API_URL),
    },
  };
});
