import tailwindcss from "@tailwindcss/vite";
import {
  cssConfig,
  modulesConfig,
  pluginsConfig,
  runtimeEnvConfig,
} from "./config/main.js";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  future: {
    compatibilityVersion: 4,
  },
  modules: modulesConfig,
  css: [
    ...cssConfig,
    'notivue/notifications.css',
    'notivue/animations.css',
  ],
  runtimeConfig: runtimeEnvConfig,
  plugins: pluginsConfig,
  ssr: false,
  vite: {
    plugins: [tailwindcss()],
  },
});
