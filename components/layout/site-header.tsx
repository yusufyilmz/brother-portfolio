"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { siteCopy } from "@/config/siteCopy";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function SiteHeader() {
	const pathname = usePathname();
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const navItems = [
		{ label: siteCopy.navigation.work, href: "/work" },
		{ label: siteCopy.navigation.about, href: "/about" },
		{ label: siteCopy.navigation.contact, href: "/contact" },
	];

	return (
		<header className="sticky top-0 z-50 w-full border-b border-muted/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					{/* Logo / Name */}
					<Link
						href="/"
						className="flex items-center space-x-2 text-lg font-semibold hover:text-accent transition-colors"
					>
						{siteCopy.site.artistName}
					</Link>

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"text-sm font-medium transition-colors hover:text-accent",
									pathname === item.href
										? "text-accent"
										: "text-muted",
								)}
							>
								{item.label}
							</Link>
						))}
					</nav>

					{/* Mobile Menu Button */}
					<button
						type="button"
						className="md:hidden p-2 text-muted hover:text-accent"
						onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
						aria-label="Toggle menu"
					>
						{mobileMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</button>
				</div>

				{/* Mobile Navigation */}
				{mobileMenuOpen && (
					<nav className="md:hidden py-4 border-t border-muted/10">
						{navItems.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								className={cn(
									"block py-2 text-base font-medium transition-colors hover:text-accent",
									pathname === item.href
										? "text-accent"
										: "text-muted",
								)}
								onClick={() => setMobileMenuOpen(false)}
							>
								{item.label}
							</Link>
						))}
					</nav>
				)}
			</div>
		</header>
	);
}

