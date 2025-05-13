import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ghPages from 'vite.config.js';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), ghPages()],
})
