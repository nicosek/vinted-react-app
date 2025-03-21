import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // 🔥 Corrige les chemins relatifs pour Netlify
  build: {
    outDir: "dist", // Assure que Vite génère bien les fichiers dans dist/
  },
});
