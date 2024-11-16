import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig(({ mode }) => ({
  plugins: [VitePWA({ registerType: "autoUpdate" })],
  base: mode === "production" ? "/katsuyou/" : "/",
}));
