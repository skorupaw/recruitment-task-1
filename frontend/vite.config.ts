/// <reference types="vite/client" />
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, "../") };
  return {
    plugins: [react()],
    server: {
      proxy: {
        "/graphql": `http://127.0.0.1:${env.VITE_GRAPHQL_PORT || 4001}/`,
        "/api": `http://127.0.0.1:${env.VITE_REST_PORT || 4000}/`,
      },
    },
    test: {
      globals: true,
      environment: "happy-dom",
      setupFiles: "./setup-tests.ts",
      // you might want to disable it, if you don't have tests that rely on CSS
      // since parsing CSS is slow
      css: true,
    },
  };
});
