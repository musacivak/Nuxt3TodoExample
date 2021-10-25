module.exports = {
    mode: "jit",
    purge: [
        "./components/**/*.{vue,js}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
    ],
    darkMode: 'class', // or 'media' or 'class'
    theme: {
        container: {
            center: true,
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}
