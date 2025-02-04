import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config();

export default defineConfig({
  define: {
    'process.env': process.env, // Make environment variables accessible in the client code
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'), // Add the alias for src
    },
  },
  server: {
    headers: {
      'Content-Security-Policy': "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com; object-src 'none'; sandbox allow-scripts allow-same-origin",
    },
  },
});
