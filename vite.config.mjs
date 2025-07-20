import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tagger from "@dhiwise/component-tagger";

// https://vitejs.dev/config/
export default defineConfig({
  // This changes the out put dir from dist to build
  // comment this out if that isn't relevant for your project
  build: {
    outDir: "build",
    chunkSizeWarningLimit: 5000, // Erhöht von 2000 auf 5000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // React und React-DOM in separaten Chunk
          'react-vendor': ['react', 'react-dom'],
          // Routing Libraries
          'router': ['react-router-dom'],
          // UI Libraries (falls verwendet)
          'ui-vendor': [],
          // Supabase in separaten Chunk (falls groß)
          'supabase': ['@supabase/supabase-js']
        }
      }
    }
  },
  plugins: [tsconfigPaths(), react(), tagger()],
  server: {
    port: 3000,
    host: "0.0.0.0",
    strictPort: false,
    allowedHosts: ['.amazonaws.com', '.builtwithrocket.new']
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],
    css: true,
  },
});