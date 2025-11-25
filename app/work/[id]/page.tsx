import { notFound } from "next/navigation";
import { siteCopy } from "@/config/siteCopy";
import { YouTubePlayer } from "@/components/work/youtube-player";
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

	const hasVideo = !!work.videoUrl;
	const hasImages = work.images && work.images.length > 0;

	return (
		<div className="min-h-screen">
			{/* Back Button */}
			<section className="pt-24 md:pt-32 pb-8">
				<div className="container">
					<Button asChild variant="ghost" size="sm">
						<Link href="/work">
							<ChevronLeft className="mr-2 h-4 w-4" />
							Back to Work
						</Link>
					</Button>
				</div>
			</section>

			{/* Header */}
			<section className="pb-12">
				<div className="container">
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
					<div className="max-w-6xl mx-auto space-y-8">
						{/* Video Player */}
						{hasVideo && (
							<div className="rounded-lg overflow-hidden shadow-2xl">
								<YouTubePlayer url={work.videoUrl!} />
							</div>
						)}

						{/* Image Gallery */}
						{hasImages && (
							<div className="rounded-lg overflow-hidden">
								<MediaCarousel
									items={work.images!.map((img, index) => ({
										src: img,
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
						)}
					</div>
				</div>
			</section>

			{/* Related Work or CTA */}
			<section className="section bg-surface/30">
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

