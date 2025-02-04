import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/main.tsx', // Pointing to the entry file for your widget
      name: 'Widget',
      fileName: (format) => `widget.${format}.js`,
      formats: ['umd'], // UMD format to support CDN
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react-router-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react-router-dom': 'ReactRouterDOM',
        },
      },
    },
  },
  define: {
    'process.env': {}  // Polyfill process.env to avoid errors
  },
});
