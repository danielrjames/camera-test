/// <reference types="vitest" />

import { URL, fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import Pages from 'vite-plugin-pages';
import Vue from '@vitejs/plugin-vue';
import VueMacros from 'unplugin-vue-macros/vite';
import path from 'path';

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
    Pages(),
    AutoImport({
      imports: [
        'vue',
        'vue/macros',
        'vue-router',
        '@vueuse/core',
        '@vueuse/head',
        { '~/plugins/axios': ['useAxios'] },
        { '~/composables/useAuth': ['useAuth'] },
        { '~/composables/usePageTitle': ['usePageTitle'] },
        { '~/store/app': ['useAppStore'] },
        { '~/store/auth': ['useAuthStore'] },
        { '~/store/user': ['useUserStore'] },
      ],
      dts: true,
    }),
    Components({
      dts: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~/': `${path.resolve(__dirname, 'src')}/`,
    },
  },
  test: {
    environment: 'jsdom',
  },
});
