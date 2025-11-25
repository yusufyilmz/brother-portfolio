import Image from "next/image";
import { siteCopy } from "@/config/siteCopy";
import { Badge } from "@/components/ui/badge";
import { VideoPlayer } from "@/components/features/video-player";

export const metadata = {
	title: `About | ${siteCopy.site.artistName}`,
	description: siteCopy.about.body.join(" "),
};

export default function AboutPage() {
	const about = siteCopy.about;

	return (
		<div className="min-h-screen">
			{/* Header */}
			<section className="section pt-24 md:pt-32">
				<div className="container">
					<div className="max-w-3xl space-y-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
							{about.sectionTitle}
						</h1>
						<p className="text-2xl text-accent-soft">{about.heading}</p>
					</div>
				</div>
			</section>

			{/* Content */}
			<section className="section">
				<div className="container">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
						{/* Text Content */}
						<div className="space-y-6">
							{about.body.map((paragraph, index) => (
								<p key={index} className="text-lg text-muted leading-relaxed">
									{paragraph}
								</p>
							))}

							{/* Skills */}
							<div className="pt-6">
								<h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
									Skills & Expertise
								</h3>
								<div className="flex flex-wrap gap-2">
									{about.skills.map((skill) => (
										<Badge key={skill} variant="secondary">
											{skill}
										</Badge>
									))}
								</div>
							</div>
						</div>

						{/* Media */}
						<div className="space-y-6">
							{about.video ? (
								<VideoPlayer
									src={about.video}
									containerClassName="rounded-lg overflow-hidden"
									showControls={true}
								/>
							) : about.image ? (
								<div className="relative aspect-[4/3] rounded-lg overflow-hidden">
									<Image
										src={about.image}
										alt={siteCopy.site.artistName}
										fill
										className="object-cover"
										sizes="(min-width: 1024px) 50vw, 100vw"
									/>
								</div>
							) : null}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}

