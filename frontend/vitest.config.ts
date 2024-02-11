/// <reference types="vitest" />
/// <reference types="vite/client"/>

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: "./tests/setup.ts",
    globals: true,
    css: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul", // or 'v8'
    },
  },
});
