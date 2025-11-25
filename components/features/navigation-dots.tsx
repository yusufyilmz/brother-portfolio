"use client";

import { cn } from "@/lib/utils";

type NavigationDotsProps = {
	count: number;
	currentIndex: number;
	onDotClick?: (index: number) => void;
	className?: string;
	ariaLabel?: (index: number) => string;
};

export function NavigationDots({
	count,
	currentIndex,
	onDotClick,
	className,
	ariaLabel,
}: NavigationDotsProps) {
	return (
		<div className={cn("flex items-center justify-center gap-2", className)}>
			{Array.from({ length: count }).map((_, index) => {
				const isActive = index === currentIndex;
				return (
					<button
						key={`dot-${index}`}
						type="button"
						onClick={() => onDotClick?.(index)}
						className={cn(
							"h-2 rounded-full transition-all duration-300",
							isActive ? "w-8 bg-accent" : "w-2 bg-muted/40 hover:bg-muted/60",
						)}
						aria-label={ariaLabel?.(index) || `Go to item ${index + 1}`}
						aria-current={isActive ? "true" : undefined}
					/>
				);
			})}
		</div>
	);
}
