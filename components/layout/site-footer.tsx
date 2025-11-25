import Link from "next/link";
import { siteCopy } from "@/config/siteCopy";
import { Instagram, Youtube, Linkedin, Mail } from "lucide-react";

export function SiteFooter() {
	const currentYear = new Date().getFullYear();
	const social = siteCopy.contact.social;

	return (
		<footer className="border-t border-muted/10 bg-surface/50">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* Brand */}
					<div className="space-y-4">
						<h3 className="text-lg font-semibold">{siteCopy.site.artistName}</h3>
						<p className="text-sm text-muted max-w-xs">
							{siteCopy.hero.eyebrow}
						</p>
					</div>

					{/* Quick Links */}
					<div className="space-y-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider">
							Quick Links
						</h4>
						<nav className="flex flex-col space-y-2">
							<Link
								href="/work"
								className="text-sm text-muted hover:text-accent transition-colors"
							>
								Work
							</Link>
							<Link
								href="/about"
								className="text-sm text-muted hover:text-accent transition-colors"
							>
								About
							</Link>
							<Link
								href="/contact"
								className="text-sm text-muted hover:text-accent transition-colors"
							>
								Contact
							</Link>
						</nav>
					</div>

					{/* Social & Contact */}
					<div className="space-y-4">
						<h4 className="text-sm font-semibold uppercase tracking-wider">
							Connect
						</h4>
						<div className="flex space-x-4">
							{social.instagram && (
								<a
									href={social.instagram}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted hover:text-accent transition-colors"
									aria-label="Instagram"
								>
									<Instagram className="h-5 w-5" />
								</a>
							)}
							{social.youtube && (
								<a
									href={social.youtube}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted hover:text-accent transition-colors"
									aria-label="YouTube"
								>
									<Youtube className="h-5 w-5" />
								</a>
							)}
							{social.linkedin && (
								<a
									href={social.linkedin}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted hover:text-accent transition-colors"
									aria-label="LinkedIn"
								>
									<Linkedin className="h-5 w-5" />
								</a>
							)}
							{siteCopy.contact.email && (
								<a
									href={`mailto:${siteCopy.contact.email}`}
									className="text-muted hover:text-accent transition-colors"
									aria-label="Email"
								>
									<Mail className="h-5 w-5" />
								</a>
							)}
						</div>
						{siteCopy.contact.email && (
							<p className="text-sm text-muted">
								{siteCopy.contact.email}
							</p>
						)}
					</div>
				</div>

				<div className="mt-8 pt-8 border-t border-muted/10">
					<p className="text-sm text-muted text-center">
						© {currentYear} {siteCopy.site.artistName}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}

