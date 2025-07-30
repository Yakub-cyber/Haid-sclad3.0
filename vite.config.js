import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/Haid-sclad3.0/',
	server: {
		proxy: {
			'/api/sheets': {
				target: 'https://sheets.googleapis.com',
				changeOrigin: true,
				rewrite: path => path.replace(/^\/api\/sheets/, ''),
			},
		},
	},
	build: {
		outDir: 'dist',
		assetsDir: 'assets',
	},
})
