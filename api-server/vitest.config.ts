// vitest.config.ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
    include: ["tests/**/*.test.ts"], // or 'tests/**/*.spec.ts'
    setupFiles: ["./tests/utils/mockLogger.ts"],
  },
});
