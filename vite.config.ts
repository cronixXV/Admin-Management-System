import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        exportType: 'default',
        ref: true,
        svgo: false,
        titleProp: true,
        icon: true
      },
      include: '**/*.svg'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/*': path.resolve(__dirname, './src/*')
    }
  }
});
