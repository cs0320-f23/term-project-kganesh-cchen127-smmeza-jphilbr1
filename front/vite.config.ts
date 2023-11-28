/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [react()],
  server: {
    port: 8000,
  },
  test: {
    globals: true,
    environment: "happy-dom",
    include: ["tests-jest/*"],
    setupFiles: ["setupTest.ts"],
  },
});
