import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--color-background)",
				surface: "var(--color-surface)",
				accent: "var(--color-accent)",
				"accent-soft": "var(--color-accent-soft)",
				ink: "var(--color-ink)",
				muted: "var(--color-muted)",
			},
			fontFamily: {
				display: ["var(--font-display)", "serif"],
				body: ["var(--font-body)", "sans-serif"],
			},
		},
	},
	plugins: [],
};

export default config;

