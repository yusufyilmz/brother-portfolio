import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedWorkSection } from "@/components/sections/featured-work-section";
import { AboutPreviewSection } from "@/components/sections/about-preview-section";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
	return (
		<>
			<HeroSection />
			<FeaturedWorkSection />
			<AboutPreviewSection />
			<CtaSection />
		</>
	);
}

