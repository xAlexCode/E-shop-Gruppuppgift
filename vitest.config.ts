import { defineConfig } from "vitest/config";
import { loadEnv } from "vite";

// Vitest läser inte .env själv. loadEnv hämtar alla variabler därifrån
// (tredje argumentet "" betyder: inte bara de som börjar med VITE_).
export default defineConfig(({ mode }) => ({
  test: {
    env: loadEnv(mode, process.cwd(), ""),
  },
}));
