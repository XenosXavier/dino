import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@component": path.resolve(__dirname, "./src/component"),
      "@display": path.resolve(__dirname, "./src/display"),
      "@game-object": path.resolve(__dirname, "./src/game-object"),
      "@manager": path.resolve(__dirname, "./src/manager"),
      "@module": path.resolve(__dirname, "./src/module"),
      "@resource": path.resolve(__dirname, "./src/resource"),
      "@scene": path.resolve(__dirname, "./src/scene"),
      "@system": path.resolve(__dirname, "./src/system"),
      "@type": path.resolve(__dirname, "./src/type"),
    },
  },
});
