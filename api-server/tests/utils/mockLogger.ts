import { vi } from "vitest";

// Silence all logger methods
vi.mock("../../src/utils/logger.ts", () => ({
  default: {
    info: vi.fn(),
    error: vi.fn(),
    warn: vi.fn(),
    debug: vi.fn(),
  },
}));
