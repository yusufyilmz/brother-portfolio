import { WorkCard } from "@/components/work/work-card";
import { VideoGallery } from "@/components/work/video-gallery";
import { YouTubeChannelsSection } from "@/components/work/youtube-channels-section";
import { siteCopy } from "@/config/siteCopy";

export const metadata = {
	title: `Work | ${siteCopy.site.artistName}`,
	description: siteCopy.work.sectionIntro,
};

export default function WorkPage() {
	const workItems = siteCopy.work.featured;
	const youtubeSection = siteCopy.youtube;
	const hasYoutubeChannels =
		youtubeSection?.channels && youtubeSection.channels.length > 0;
	const youtubeChannelUrl = siteCopy.contact.social.youtube;

	return (
		<div className="min-h-screen">
			{/* Header Section */}
			<section className="section pt-24 md:pt-32">
				<div className="container">
					<div className="max-w-3xl space-y-4">
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold">
							{siteCopy.work.sectionTitle}
						</h1>
						<p className="text-lg text-muted">{siteCopy.work.sectionIntro}</p>
					</div>
				</div>
			</section>

			{/* Featured Work Grid (from siteCopy) */}
			{workItems.length > 0 && (
				<section className="section">
					<div className="container">
						<div className="mb-8">
							<h2 className="text-2xl md:text-3xl font-bold mb-4">
								Featured Work
							</h2>
						</div>
						<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
							{workItems.map((item) => {
								const hasVideos =
									Array.isArray((item as any).videos) &&
									(item as any).videos.length > 0;

								const images = (item as any).images as string[] | undefined;

								const thumbnail =
									// Prefer explicit thumbnailUrl if present, otherwise:
									// - fall back to imageUrl
									// - then fall back to first image in images[]
									(item as any).thumbnailUrl ??
									(item as any).imageUrl ??
									(images && images.length > 0 ? images[0] : undefined);

								if (!thumbnail) {
									// If we somehow don't have any visual asset, skip rendering this card
									// to avoid broken Next/Image elements.
									return null;
								}

								return (
									<WorkCard
										key={item.id}
										id={item.id}
										title={item.title}
										category={item.category}
										thumbnailUrl={thumbnail}
										year={item.year}
										isVideo={hasVideos}
									/>
								);
							})}
						</div>
					</div>
				</section>
			)}

			{/* YouTube Channels */}
			{hasYoutubeChannels && youtubeSection && (
				<YouTubeChannelsSection
					sectionTitle={youtubeSection.sectionTitle}
					sectionIntro={youtubeSection.sectionIntro}
					channels={youtubeSection.channels}
				/>
			)}

			{/* Legacy single-channel gallery fallback */}
			{!hasYoutubeChannels && youtubeChannelUrl && (
				<section className="section bg-surface/30">
					<div className="container">
						<div className="max-w-4xl mx-auto">
							<h2 className="text-2xl md:text-3xl font-bold mb-8">
								All Videos
							</h2>
							<VideoGallery videoUrl={youtubeChannelUrl} maxResults={50} />
						</div>
					</div>
				</section>
			)}
		</div>
	);
}
