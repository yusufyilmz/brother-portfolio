import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { siteCopy } from "@/config/siteCopy";
import { activeTheme } from "@/config/themes";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export const metadata: Metadata = {
	title: siteCopy.site.metaTitle,
	description: siteCopy.site.metaDescription,
	keywords: siteCopy.site.keywords as unknown as string[],
	metadataBase: new URL(siteCopy.site.baseUrl),
	openGraph: {
		title: siteCopy.site.metaTitle,
		description: siteCopy.site.metaDescription,
		url: siteCopy.site.baseUrl,
		siteName: siteCopy.site.name,
		type: "website",
	},
	alternates: {
		canonical: siteCopy.site.baseUrl,
	},
};

type RootLayoutProps = {
	children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
	const theme = activeTheme;

	// Create CSS variables string for :root
	const cssVariables = `:root{--color-background:${theme.colors.background};--color-surface:${theme.colors.surface};--color-accent:${theme.colors.accent};--color-accent-soft:${theme.colors.accentSoft};--color-ink:${theme.colors.ink};--color-muted:${theme.colors.muted};}`;

	return (
		<html lang="en">
			<body className="min-h-screen bg-background text-ink antialiased m-0 p-0">
				<style dangerouslySetInnerHTML={{ __html: cssVariables }} />
				<SiteHeader />
				<main className="m-0 p-0">{children}</main>
				<SiteFooter />
			</body>
		</html>
	);
}
