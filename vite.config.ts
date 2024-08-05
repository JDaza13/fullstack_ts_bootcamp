import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import express from "vite3-plugin-express";
import obfuscateSourcemaps from "./vite-plugins/vite-plugin-obfuscate-sourcemaps";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), obfuscateSourcemaps("dist/assets"), express("src/server")],
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1024 * 1024 * 1,
  },
});
