import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';
import {ViteImageOptimizer} from 'vite-plugin-image-optimizer';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Сжимает все картинки в public/ при build без смены формата —
      // ссылки остаются прежними (.jpg, .JPG, .png), но размер падает на 30-60%.
      // Это критично для Core Web Vitals (LCP), который Google и Яндекс используют для ранжирования.
      ViteImageOptimizer({
        jpg: { quality: 80, mozjpeg: true },
        jpeg: { quality: 80, mozjpeg: true },
        png: { quality: 80 },
        svg: {
          multipass: true,
          // svgo preset-default — стандартная пресет-конфигурация
          // (typed loosely потому что vite-plugin-image-optimizer пере-экспортирует SVGO-типы строже, чем нужно)
          plugins: [
            { name: 'preset-default', params: { overrides: { removeViewBox: false } } } as any,
          ],
        },
        // Логируем результаты сжатия в консоль
        logStats: true,
      }),
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    build: {
      // Split vendor libraries into separate chunks for better caching
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'motion': ['framer-motion'],
            'icons': ['lucide-react'],
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      port: process.env.PORT ? Number(process.env.PORT) : undefined,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
    },
  };
});
