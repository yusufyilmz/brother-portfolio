import { siteCopy } from "@/config/siteCopy";
import { WorkCard } from "@/components/work/work-card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function FeaturedWorkSection() {
	const work = siteCopy.work;
	const featuredItems = work.featured.slice(0, 3); // Show first 3 items

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

					{/* Work Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{featuredItems.map((item) => (
							<WorkCard
								key={item.id}
								id={item.id}
								title={item.title}
								category={item.category}
								thumbnailUrl={item.thumbnailUrl}
								year={item.year}
								isVideo={!!item.videoUrl}
							/>
						))}
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

