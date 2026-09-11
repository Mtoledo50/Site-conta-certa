import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'localhost',
      '127.0.0.1',
      'www.contacerta.com.br',
      'contacerta.com.br',
      'radar.contacerta.com.br',
      'api.contacerta.com.br',
      'extrator.contacerta.com.br',
      '.contacerta.com.br', // Permite QUALQUER subdomínio de contacerta.com.br
    ],
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})