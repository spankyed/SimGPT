import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

const resolve = (...dirs) => path.resolve(__dirname, '../../', ...dirs);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
      game: resolve('./src/game')
    },
  },
})
