"use client";

import { siteCopy } from "@/config/siteCopy";
import { Button } from "@/components/ui/button";
import { MediaCarousel } from "@/components/features/media-carousel";
import Link from "next/link";
import Image from "next/image";
import { VideoPlayer } from "@/components/features/video-player";

type MediaItem = {
	src: string;
	alt: string;
	type: "image" | "video";
	label?: string;
};

export function FeaturedWorkSection() {
	const work = siteCopy.work;
	const featuredItems = work.featured;

	// Separate images and videos from all featured items
	const imageItems: MediaItem[] = [];
	const videoItems: MediaItem[] = [];

	featuredItems.forEach((item) => {
		// Add images
		if (item.images && item.images.length > 0) {
			item.images.forEach((imageSrc) => {
				imageItems.push({
					src: imageSrc,
					alt: item.title,
					type: "image",
					label: `${item.title} - ${item.category}`,
				});
			});
		}

		// Add videos
		if (item.videoUrl) {
			videoItems.push({
				src: item.videoUrl,
				alt: item.title,
				type: "video",
				label: `${item.title} - ${item.category}`,
			});
		}
	});

	const hasImages = imageItems.length > 0;
	const hasVideos = videoItems.length > 0;

	return (
		<section className="section bg-surface/30">
			<div className="container">
				<div className="space-y-12">
					{/* Header */}
					<div className="max-w-3xl space-y-4">
						<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
							{work.sectionTitle}
						</h2>
						<p className="text-lg text-muted">{work.sectionIntro}</p>
					</div>

					{/* Media blocks - full-width sliders */}
					<div className="space-y-10">
						{/* Images Container */}
						{hasImages && (
							<div className="space-y-4">
								<h3 className="text-xl font-semibold">Fotoğraflar</h3>
								{imageItems.length === 1 ? (
									// Single image - no carousel
									<div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-surface/80">
										<Image
											src={imageItems[0].src}
											alt={imageItems[0].alt}
											fill
											className="object-cover"
											sizes="(min-width: 1024px) 100vw, 100vw"
										/>
										{imageItems[0].label && (
											<div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
												<p className="text-sm text-white">
													{imageItems[0].label}
												</p>
											</div>
										)}
									</div>
								) : (
									// Multiple images - show carousel
									<MediaCarousel
										items={imageItems}
										aspectRatio="aspect-[16/9]"
										autoPlayInterval={5000}
										showNavigation={true}
										showDots={true}
									/>
								)}
							</div>
						)}

						{/* Videos Container */}
						{hasVideos && (
							<div className="space-y-4">
								<h3 className="text-xl font-semibold">Videolar</h3>
								{videoItems.length === 1 ? (
									// Single video - no carousel
									<div className="space-y-3">
										<div className="relative aspect-[16/9] rounded-lg overflow-hidden bg-surface/80">
											<VideoPlayer
												src={videoItems[0].src}
												className="h-full w-full object-cover"
												containerClassName="absolute inset-0"
												loop={true}
												muted={false}
												autoPlay={false}
												showControls={true}
											/>
										</div>
										{videoItems[0].label && (
											<p className="text-sm text-muted">
												{videoItems[0].label}
											</p>
										)}
									</div>
								) : (
									// Multiple videos - show carousel
									<MediaCarousel
										items={videoItems}
										aspectRatio="aspect-[16/9]"
										autoPlayInterval={0}
										showNavigation={true}
										showDots={true}
										videoProps={{
											loop: true,
											muted: false,
											autoPlay: false,
											showControls: true,
										}}
									/>
								)}
							</div>
						)}
					</div>

					{/* View All Button */}
					<div className="flex justify-center pt-8">
						<Button asChild size="lg" variant="secondary">
							<Link href="/work">{siteCopy.ui.viewAllWork}</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
