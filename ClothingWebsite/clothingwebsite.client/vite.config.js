import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import plugin from '@vitejs/plugin-react';

const target = process.env.ASPNETCORE_HTTPS_PORT
    ? `https://localhost:${process.env.ASPNETCORE_HTTPS_PORT}`
    : process.env.ASPNETCORE_URLS
    ? process.env.ASPNETCORE_URLS.split(';')[0]
    : 'http://localhost:7193';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [plugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        proxy: {
            // Proxy API requests to the backend
            '^/api': {
                target,
                secure: false, // Disable SSL verification for development
                changeOrigin: true, // Ensure the origin header is updated
            }
        },
        port: 53196,
        https: false // Disable HTTPS for the Vite server
    }
});
