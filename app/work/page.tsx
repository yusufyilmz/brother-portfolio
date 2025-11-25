import { WorkCard } from "@/components/work/work-card";
import { siteCopy } from "@/config/siteCopy";

export const metadata = {
	title: `Work | ${siteCopy.site.artistName}`,
	description: siteCopy.work.sectionIntro,
};

export default function WorkPage() {
	const workItems = siteCopy.work.featured;

	return (
		<div className="min-h-screen">
			{/* Header Section */}
			<section className="section pt-24 md:pt-32">
				<div className="container">
					<div className="max-w-3xl space-y-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
							{siteCopy.work.sectionTitle}
						</h1>
						<p className="text-lg text-muted">
							{siteCopy.work.sectionIntro}
						</p>
					</div>
				</div>
			</section>

			{/* Work Grid */}
			<section className="section">
				<div className="container">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{workItems.map((item) => (
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
				</div>
			</section>
		</div>
	);
}

