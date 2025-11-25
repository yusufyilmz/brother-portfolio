import { siteCopy } from "@/config/siteCopy";
import { Button } from "@/components/ui/button";
import { Mail, Instagram, Youtube, Linkedin } from "lucide-react";

export const metadata = {
	title: `Contact | ${siteCopy.site.artistName}`,
	description: siteCopy.contact.body,
};

export default function ContactPage() {
	const contact = siteCopy.contact;
	const social = contact.social;

	return (
		<div className="min-h-screen">
			<section className="section pt-24 md:pt-32">
				<div className="container">
					<div className="max-w-3xl mx-auto text-center space-y-8">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
							{contact.heading}
						</h1>
						<p className="text-xl text-muted">{contact.body}</p>

						{/* Email */}
						{contact.email && (
							<div className="pt-8">
								<Button asChild size="lg">
									<a href={`mailto:${contact.email}`}>
										<Mail className="mr-2 h-5 w-5" />
										{contact.email}
									</a>
								</Button>
							</div>
						)}

						{/* Social Links */}
						<div className="pt-12">
							<h3 className="text-sm font-semibold uppercase tracking-wider mb-6">
								{siteCopy.ui.connectOnSocial}
							</h3>
							<div className="flex items-center justify-center gap-6">
								{social.instagram && (
									<a
										href={social.instagram}
										target="_blank"
										rel="noopener noreferrer"
										className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
									>
										<Instagram className="h-8 w-8" />
										<span className="text-sm">{siteCopy.ui.instagram}</span>
									</a>
								)}
								{social.youtube && (
									<a
										href={social.youtube}
										target="_blank"
										rel="noopener noreferrer"
										className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
									>
										<Youtube className="h-8 w-8" />
										<span className="text-sm">{siteCopy.ui.youtube}</span>
									</a>
								)}
								{social.linkedin && (
									<a
										href={social.linkedin}
										target="_blank"
										rel="noopener noreferrer"
										className="flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
									>
										<Linkedin className="h-8 w-8" />
										<span className="text-sm">{siteCopy.ui.linkedin}</span>
									</a>
								)}
							</div>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
