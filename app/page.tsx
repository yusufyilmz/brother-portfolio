import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { CtaSection } from "@/components/sections/cta-section";
import { YouTubeChannelsSection } from "@/components/work/youtube-channels-section";
import { siteCopy } from "@/config/siteCopy";

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<FeaturedWorkSection />
			<YouTubeChannelsSection
				sectionTitle={siteCopy.youtube.sectionTitle}
				sectionIntro={siteCopy.youtube.sectionIntro}
				channels={siteCopy.youtube.channels}
			/>
			{/* <AboutPreviewSection /> */}
			<CtaSection />
		</>
	);
}
