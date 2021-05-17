const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
	purge: ['./**/*.css', './{pages,components}/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				red: colors.red,
			},
		},
	},
	plugins: [require('tailwindcss-safe-area')],
}
