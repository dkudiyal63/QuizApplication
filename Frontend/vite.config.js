import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: [/\.jsx?$/],
  },
  server: {
    port: 3000,
    open: false,
  },
  preview: {
    port: 3000,
  },
  define: {
    'process.env': {},
  },
});


