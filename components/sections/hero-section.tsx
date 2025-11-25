"use client";

import { useEffect, useRef } from "react";
import { siteCopy } from "@/config/siteCopy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function HeroSection() {
	const copy = siteCopy.hero;
	const videoRef = useRef<HTMLVideoElement | null>(null);

	// Auto-play video on load
	useEffect(() => {
		const video = videoRef.current;
		if (!video || !copy.video) return;

		video.play().catch((error) => {
			console.log("Video autoplay prevented:", error);
		});
	}, [copy.video]);

	return (
		<section className="relative isolate h-screen overflow-hidden">
			{/* Background video or gradient */}
			<div className="absolute inset-0">
				{copy.video ? (
					<video
						ref={videoRef}
						src={copy.video}
						className="w-full h-full object-cover"
						loop
						muted
						playsInline
						autoPlay
						preload="auto"
					>
						Your browser does not support the video tag.
					</video>
				) : (
					<div className="w-full h-full bg-gradient-to-br from-background via-surface to-background" />
				)}
				{/* Overlay for readability */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
			</div>

			{/* Content */}
			<div className="relative flex h-screen items-center">
				<div className="container">
					<div className="max-w-3xl space-y-6">
						<p className="text-sm uppercase tracking-wider text-accent-soft">
							{copy.eyebrow}
						</p>
						<h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
							{copy.heading}
						</h1>
						<p className="text-lg md:text-xl text-muted max-w-2xl">
							{copy.subheading}
						</p>
						<div className="flex flex-wrap gap-4 pt-4">
							<Button asChild size="lg">
								<Link href={copy.primaryCtaHref}>
									{copy.primaryCtaLabel}
								</Link>
							</Button>
							<Button asChild variant="secondary" size="lg">
								<Link href={copy.secondaryCtaHref}>
									{copy.secondaryCtaLabel}
								</Link>
							</Button>
						</div>
						<p className="pt-4 text-sm text-muted/80">
							{copy.highlightNote}
						</p>
					</div>
				</div>
			</div>

			{/* Scroll indicator */}
			<div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
				<div className="w-6 h-10 rounded-full border-2 border-muted/50 flex items-start justify-center p-2">
					<div className="w-1 h-2 rounded-full bg-muted/50" />
				</div>
			</div>
		</section>
	);
}

