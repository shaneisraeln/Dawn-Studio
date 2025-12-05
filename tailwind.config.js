/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                gold: {
                    DEFAULT: '#c9a961',
                    dark: '#b89850',
                },
                dark: {
                    DEFAULT: '#0a0a0a',
                    lighter: '#1a1a1a',
                    light: '#2a2a2a',
                },
            },
            fontFamily: {
                montserrat: ['Montserrat', 'sans-serif'],
                lato: ['Lato', 'sans-serif'],
            },
        },
    },
    plugins: [],
}