/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                gray: '#5C6170',
                lavender: '#F3ECFD',
            },
            fontFamily: {
                sans: ['DM Sans', 'sans-serif'],
            },
            screens: {
                md: '760px',
                lg: '1024px',
                xl: '1440px',
            },
        },
    },
    plugins: [],
};
