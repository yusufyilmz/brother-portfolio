export type ThemeId = "dark" | "light" | "cinematic";

export type ThemeDefinition = {
	id: ThemeId;
	label: string;
	description: string;
	colors: {
		background: string;
		surface: string;
		accent: string;
		accentSoft: string;
		ink: string;
		muted: string;
	};
};

export const themes: Record<ThemeId, ThemeDefinition> = {
	dark: {
		id: "dark",
		label: "Dark",
		description: "Professional dark theme with cinematic feel",
		colors: {
			background: "#0a0a0a",
			surface: "#1a1a1a",
			accent: "#3b82f6",
			accentSoft: "#60a5fa",
			ink: "#f5f5f5",
			muted: "#a3a3a3",
		},
	},
	light: {
		id: "light",
		label: "Light",
		description: "Clean light theme with professional aesthetic",
		colors: {
			background: "#ffffff",
			surface: "#f5f5f5",
			accent: "#2563eb",
			accentSoft: "#3b82f6",
			ink: "#0a0a0a",
			muted: "#737373",
		},
	},
	cinematic: {
		id: "cinematic",
		label: "Cinematic",
		description: "Dark theme with warm accents for video work",
		colors: {
			background: "#0f0f0f",
			surface: "#1c1c1c",
			accent: "#f59e0b",
			accentSoft: "#fbbf24",
			ink: "#fafafa",
			muted: "#a3a3a3",
		},
	},
};

export const activeThemeId: ThemeId = "dark";

export const activeTheme = themes[activeThemeId];

