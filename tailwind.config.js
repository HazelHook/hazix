/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			animation: {
				marquee: "marquee 25s linear infinite",
				marquee2: "marquee2 25s linear infinite",
				scroller3: "scroller3 25s linear infinite",
				"spin-slow": "spin 4s linear infinite",
				"spin-slower": "spin 6s linear infinite",
				"spin-reverse": "spin-reverse 1s linear infinite",
				"spin-reverse-slow": "spin-reverse 4s linear infinite",
				"spin-reverse-slower": "spin-reverse 6s linear infinite",
				scroller: "scroller 15s linear infinite",
				scroller2: "scroller2 20s linear infinite",
				"fade-in": "fade-in 0.5s linear forwards",
				meteor: "meteor 5s linear infinite",
			},
			keyframes: {
				marquee: {
					"0%": {
						transform: "translateX(0%)",
					},
					"100%": {
						transform: "translateX(-100%)",
					},
				},
				marquee2: {
					"0%": {
						transform: "translateX(100%)",
					},
					"100%": {
						transform: "translateX(0%)",
					},
				},
				scroller: {
					"0%": {
						transform: "translateY(10em)",
					},
					"100%": {
						transform: "translateY(-14em)",
					},
				},
				scroller2: {
					"0%": {
						transform: "translateY(10em)",
					},
					"100%": {
						transform: "translateY(-14em)",
					},
				},
				"fade-in": {
					from: {
						opacity: 0,
					},
					to: {
						opacity: 1,
					},
				},
				scroller3: {
					"100%": {
						transform: "translateY(-50%)",
					},
				},
				"spin-reverse": {
					to: {
						transform: "rotate(-360deg)",
					},
				},
				meteor: {
					"0%": { transform: "rotate(215deg) translateX(0)" },
					"70%": {},
					"100%": {
						transform: "rotate(215deg) translateX(-500px)",
					},
				},
			},

			boxShadow: {
				thick: "0px 7px 32px rgb(0 0 0 / 35%);",
				inset:
					"inset 6px 84px 79px -40px hsla(0,0%,100%,.025), inset 0 -4px 1px -3px hsla(0,0%,100%,.25), inset 0 4px 1px -3px hsla(0,0%,100%,.25);",
			},
			borderRadius: {
				"4xl": "2rem",
				"5xl": "3rem",
				"6xl": "5rem",
			},
			fontFamily: {
				sans: ["Inter", ...defaultTheme.fontFamily.sans],
			},
		},
	},
	plugins: [],
}
