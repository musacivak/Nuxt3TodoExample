import { defineNuxtConfig } from 'nuxt3'

export default defineNuxtConfig({
    css: [
        '~/assets/css/tailwind.css',
        '~/assets/css/main.css'
    ],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {},
                }
            }
        },
    }
})
