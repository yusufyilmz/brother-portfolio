import { notFound } from "next/navigation";
import { siteCopy } from "@/config/siteCopy";
import { MediaCarousel } from "@/components/features/media-carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type WorkDetailPageProps = {
	params: {
		id: string;
	};
};

export async function generateStaticParams() {
	return siteCopy.work.featured.map((item) => ({
		id: item.id,
	}));
}

export async function generateMetadata({ params }: WorkDetailPageProps) {
	const work = siteCopy.work.featured.find((item) => item.id === params.id);

	if (!work) {
		return {
			title: "Work Not Found",
		};
	}

	return {
		title: `${work.title} | ${siteCopy.site.artistName}`,
		description: work.description,
	};
}

export default function WorkDetailPage({ params }: WorkDetailPageProps) {
	const work = siteCopy.work.featured.find((item) => item.id === params.id);

	if (!work) {
		notFound();
	}

	const imageSources: string[] =
		// Prefer explicit images array if provided
		Array.isArray((work as any).images) && (work as any).images.length > 0
			? (work as any).images
			: // Fallback to single imageUrl as a one-item gallery
				(work as any).imageUrl
				? [(work as any).imageUrl]
				: [];

	const videoSources: string[] =
		Array.isArray((work as any).videos) && (work as any).videos.length > 0
			? (work as any).videos
			: [];

	const hasImageSlider = imageSources.length > 0;
	const hasVideoSlider = videoSources.length > 0;

	return (
		<div className="min-h-screen">
			{/* Header (matches Work page style, no background strip) */}
			<section className="section pt-24 md:pt-32">
				<div className="container space-y-6">
					<Button asChild variant="ghost" size="sm">
						<Link href="/work">
							<ChevronLeft className="mr-2 h-4 w-4" />
							Back to Work
						</Link>
					</Button>
					<div className="max-w-4xl space-y-4">
						<div className="flex items-center gap-3">
							<Badge variant="secondary">{work.category}</Badge>
							{work.year && (
								<span className="text-sm text-muted">{work.year}</span>
							)}
						</div>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
							{work.title}
						</h1>
						<p className="text-xl text-muted">{work.description}</p>
					</div>
				</div>
			</section>

			{/* Media Content */}
			<section className="section">
				<div className="container">
					<div className="space-y-10">
						{/* Image Gallery */}
						{hasImageSlider && (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold">Image Gallery</h2>
								<div className="rounded-lg overflow-hidden">
									<MediaCarousel
										items={imageSources.map((src, index) => ({
											src,
											alt: `${work.title} - Image ${index + 1}`,
											type: "image",
										}))}
										aspectRatio="aspect-video"
										showNavigation={true}
										showDots={true}
										videoProps={{
											showControls: false,
										}}
									/>
								</div>
							</div>
						)}

						{/* Video Gallery */}
						{hasVideoSlider && (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold">Video Gallery</h2>
								<div className="rounded-lg overflow-hidden">
									<MediaCarousel
										items={videoSources.map((src, index) => ({
											src,
											alt: `${work.title} - Video ${index + 1}`,
											type: "video",
										}))}
										aspectRatio="aspect-video"
										showNavigation={true}
										showDots={true}
										videoProps={{
											showControls: true,
											muted: false,
										}}
									/>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>

			{/* Related Work or CTA */}
			<section className="section">
				<div className="container">
					<div className="max-w-3xl mx-auto text-center space-y-6">
						<h2 className="text-2xl md:text-3xl font-bold">
							Interested in working together?
						</h2>
						<p className="text-lg text-muted">
							Get in touch to discuss your next project.
						</p>
						<div className="flex flex-wrap justify-center gap-4 pt-4">
							<Button asChild size="lg">
								<Link href="/contact">Get in Touch</Link>
							</Button>
							<Button asChild variant="secondary" size="lg">
								<Link href="/work">View More Work</Link>
							</Button>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
