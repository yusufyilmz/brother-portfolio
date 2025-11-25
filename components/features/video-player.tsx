"use client";

import { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
	src: string;
	className?: string;
	containerClassName?: string;
	loop?: boolean;
	muted?: boolean;
	playsInline?: boolean;
	preload?: "auto" | "metadata" | "none";
	autoPlay?: boolean;
	showControls?: boolean;
	onPlayStateChange?: (isPlaying: boolean) => void;
};

export function VideoPlayer({
	src,
	className,
	containerClassName,
	loop = true,
	muted: initialMuted = false,
	playsInline = true,
	preload = "auto",
	autoPlay = false,
	showControls = true,
	onPlayStateChange,
}: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement | null>(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [isMuted, setIsMuted] = useState(initialMuted);

	// Track video play/pause state
	useEffect(() => {
		const video = videoRef.current;
		if (!video) return;

		const handlePlay = () => {
			setIsPlaying(true);
			onPlayStateChange?.(true);
		};
		const handlePause = () => {
			setIsPlaying(false);
			onPlayStateChange?.(false);
		};

		video.addEventListener("play", handlePlay);
		video.addEventListener("pause", handlePause);

		return () => {
			video.removeEventListener("play", handlePlay);
			video.removeEventListener("pause", handlePause);
		};
	}, [onPlayStateChange]);

	// Auto-play on mount if requested
	useEffect(() => {
		if (autoPlay && videoRef.current) {
			videoRef.current.play().catch((error) => {
				console.log("Video autoplay prevented:", error);
			});
		}
	}, [autoPlay]);

	const togglePlay = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play().catch((error) => {
					console.log("Video play failed:", error);
				});
			}
		}
	};

	const toggleMute = () => {
		if (videoRef.current) {
			videoRef.current.muted = !isMuted;
			setIsMuted(!isMuted);
		}
	};

	return (
		<div className={cn("relative group", containerClassName)}>
			<video
				ref={videoRef}
				src={src}
				className={cn("h-full w-full object-cover", className)}
				loop={loop}
				muted={isMuted}
				playsInline={playsInline}
				preload={preload}
			>
				Your browser does not support the video tag.
			</video>
			{showControls && (
				<>
					{/* Play/Pause button - centered */}
					<button
						type="button"
						onClick={togglePlay}
						className="absolute left-1/2 top-1/2 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-ink shadow-xl transition-all hover:bg-white hover:scale-110 group-hover:opacity-100"
						aria-label={isPlaying ? "Pause video" : "Play video"}
					>
						{isPlaying ? (
							<Pause className="h-6 w-6 ml-0.5" />
						) : (
							<Play className="h-6 w-6 ml-1" />
						)}
					</button>
					{/* Mute/Unmute button */}
					<button
						type="button"
						onClick={toggleMute}
						className="absolute bottom-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink shadow-lg transition-all hover:bg-white hover:scale-110"
						aria-label={isMuted ? "Unmute video" : "Mute video"}
					>
						{isMuted ? (
							<VolumeX className="h-5 w-5" />
						) : (
							<Volume2 className="h-5 w-5" />
						)}
					</button>
				</>
			)}
		</div>
	);
}

