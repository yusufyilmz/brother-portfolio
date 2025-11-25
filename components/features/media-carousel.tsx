"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoPlayer } from "./video-player";
import { NavigationDots } from "./navigation-dots";
import { cn } from "@/lib/utils";

type MediaItem = {
	src: string;
	alt: string;
	type: "image" | "video";
	label?: string;
};

type MediaCarouselProps = {
	items: MediaItem[];
	className?: string;
	containerClassName?: string;
	aspectRatio?: string;
	autoPlayInterval?: number;
	pauseOnHover?: boolean;
	showNavigation?: boolean;
	showDots?: boolean;
	videoProps?: {
		loop?: boolean;
		muted?: boolean;
		autoPlay?: boolean;
		showControls?: boolean;
	};
};

export function MediaCarousel({
	items,
	className,
	containerClassName,
	aspectRatio = "aspect-[16/9]",
	autoPlayInterval = 4000,
	pauseOnHover = true,
	showNavigation = true,
	showDots = true,
	videoProps,
}: MediaCarouselProps) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isPaused, setIsPaused] = useState(false);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const totalItems = items.length;

	const nextItem = () => {
		setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
	};

	const prevItem = () => {
		setCurrentIndex((prev) => (prev === 0 ? totalItems - 1 : prev - 1));
	};

	const goToItem = (index: number) => {
		setCurrentIndex(index);
	};

	// Auto-play functionality for carousel
	useEffect(() => {
		if (totalItems <= 1 || isPaused) {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
				intervalRef.current = null;
			}
			return;
		}

		intervalRef.current = setInterval(() => {
			setCurrentIndex((prev) => (prev === totalItems - 1 ? 0 : prev + 1));
		}, autoPlayInterval);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [isPaused, totalItems, autoPlayInterval]);

	return (
		<div
			className={cn("relative", className)}
			onMouseEnter={() => pauseOnHover && setIsPaused(true)}
			onMouseLeave={() => pauseOnHover && setIsPaused(false)}
		>
			<div
				className={cn(
					"relative overflow-hidden rounded-lg bg-surface/80",
					aspectRatio,
					containerClassName,
				)}
			>
				{items.map((item, index) => {
					const isActive = index === currentIndex;
					return (
						<div
							key={`${item.type}-${item.src}-${index}`}
							className={cn(
								"absolute inset-0 transition-opacity duration-500",
								isActive ? "opacity-100" : "opacity-0",
							)}
						>
							{item.type === "video" ? (
								<VideoPlayer
									src={item.src}
									className="h-full w-full object-cover"
									containerClassName="absolute inset-0"
									loop={videoProps?.loop ?? true}
									muted={videoProps?.muted ?? true}
									autoPlay={videoProps?.autoPlay ?? false}
									showControls={videoProps?.showControls ?? true}
								/>
							) : (
								<Image
									src={item.src}
									alt={item.alt}
									fill
									className="object-cover"
									sizes="(min-width: 1024px) 1000px, 100vw"
								/>
							)}
						</div>
					);
				})}

				{/* Navigation buttons */}
				{showNavigation && totalItems > 1 && (
					<>
						<button
							type="button"
							onClick={() => {
								setIsPaused(true);
								prevItem();
							}}
							className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-all hover:bg-white hover:scale-110"
							aria-label="Previous item"
						>
							<ChevronLeft className="h-5 w-5" />
						</button>
						<button
							type="button"
							onClick={() => {
								setIsPaused(true);
								nextItem();
							}}
							className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-all hover:bg-white hover:scale-110"
							aria-label="Next item"
						>
							<ChevronRight className="h-5 w-5" />
						</button>
					</>
				)}
			</div>

			{/* Dots indicator */}
			{showDots && (
				<NavigationDots
					count={totalItems}
					currentIndex={currentIndex}
					onDotClick={(index) => {
						setIsPaused(true);
						goToItem(index);
					}}
					className="mt-4"
					ariaLabel={(index) => {
						const item = items[index];
						return `Go to ${item.type} ${index + 1}`;
					}}
				/>
			)}

			{/* Label for current item */}
			{items[currentIndex]?.label && (
				<p className="mt-3 text-sm text-muted">{items[currentIndex].label}</p>
			)}
		</div>
	);
}
