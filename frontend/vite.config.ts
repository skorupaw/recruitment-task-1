/// <reference types="vite/client" />
/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    proxy: {
      "/api": `http://127.0.0.1:3000/`,
      "/graphql": `http://127.0.0.1:3000/`,
    },
  },
  test: {
    setupFiles: ["./setup-tests.ts"],
    globals: true,
    environment: "happy-dom",
  },
});
