import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
const { resolve } = require('path')

export default ({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
    return defineConfig({
        plugins: [vue(), VitePWA({
            base: '/',
            registerType: 'autoUpdate',
            injectRegister: 'auto',
            manifest: {
                "start_url": "/",
                "display": "standalone",
                "prefer_related_applications": true,
            }
        })],
        server: {
            port: process.env.VITE_PORT,
        },
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        build: {
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html'),
                }
            } 
        }
    });
}