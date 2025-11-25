import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type WorkCardProps = {
	id: string;
	title: string;
	category: string;
	thumbnailUrl: string;
	year?: string;
	isVideo?: boolean;
	className?: string;
};

export function WorkCard({
	id,
	title,
	category,
	thumbnailUrl,
	year,
	isVideo = true,
	className,
}: WorkCardProps) {
	return (
		<Link href={`/work/${id}`} className={cn("group", className)}>
			<Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300">
				<div className="relative aspect-video overflow-hidden bg-surface">
					<Image
						src={thumbnailUrl}
						alt={title}
						fill
						className="object-cover transition-transform duration-300 group-hover:scale-105"
						sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
					/>
					{isVideo && (
						<div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
							<div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 shadow-lg">
								<Play className="h-8 w-8 text-ink ml-1" />
							</div>
						</div>
					)}
				</div>
				<CardContent className="p-4 space-y-2">
					<div className="flex items-center justify-between">
						<Badge variant="secondary">{category}</Badge>
						{year && <span className="text-xs text-muted">{year}</span>}
					</div>
					<h3 className="font-semibold text-lg group-hover:text-accent transition-colors">
						{title}
					</h3>
				</CardContent>
			</Card>
		</Link>
	);
}
