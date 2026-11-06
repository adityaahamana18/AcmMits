import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Standalone Pure Frontend Configuration
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  }
})
