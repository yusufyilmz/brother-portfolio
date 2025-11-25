"use client";

import ReactPlayer from "react-player/youtube";
import { cn } from "@/lib/utils";

type YouTubePlayerProps = {
	url: string;
	className?: string;
	containerClassName?: string;
};

export function YouTubePlayer({
	url,
	className,
	containerClassName,
}: YouTubePlayerProps) {
	return (
		<div className={cn("relative aspect-video", containerClassName)}>
			<ReactPlayer
				url={url}
				width="100%"
				height="100%"
				controls
				className={cn("rounded-lg overflow-hidden", className)}
			/>
		</div>
	);
}

