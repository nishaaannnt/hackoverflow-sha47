import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    'process.env.VITE_REACT_APP_MAP_API': JSON.stringify(process.env.VITE_REACT_APP_MAP_API),
    'process.env.VITE_APP_MAP_ID': JSON.stringify(process.env.VITE_APP_MAP_ID)
  }
})
