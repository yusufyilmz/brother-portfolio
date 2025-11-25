import Image from "next/image";
import { siteCopy } from "@/config/siteCopy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutPreviewSection() {
	const about = siteCopy.about;

	return (
		<section className="section">
			<div className="container">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					{/* Text Content */}
					<div className="space-y-6">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
							{about.heading}
						</h2>
						{about.body.slice(0, 1).map((paragraph, index) => (
							<p key={index} className="text-lg text-muted leading-relaxed">
								{paragraph}
							</p>
						))}
						<Button asChild variant="secondary" size="lg">
							<Link href="/about">{siteCopy.ui.moreAboutMe}</Link>
						</Button>
					</div>

					{/* Image */}
					<div className="relative aspect-[4/3] rounded-lg overflow-hidden">
						{about.image && (
							<Image
								src={about.image}
								alt={siteCopy.site.artistName}
								fill
								className="object-cover"
								sizes="(min-width: 1024px) 50vw, 100vw"
							/>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}

