import { siteCopy } from "@/config/siteCopy";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
	const contact = siteCopy.contact;

	return (
		<section className="section bg-accent/5">
			<div className="container">
				<div className="max-w-3xl mx-auto text-center space-y-8">
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
						{contact.heading}
					</h2>
					<p className="text-lg text-muted">{contact.body}</p>
					<div className="flex flex-wrap justify-center gap-4 pt-4">
						<Button asChild size="lg">
							<Link href="/contact">{siteCopy.ui.getInTouch}</Link>
						</Button>
						<Button asChild variant="secondary" size="lg">
							<Link href="/work">{siteCopy.ui.viewMoreWork}</Link>
						</Button>
					</div>
				</div>
			</div>
		</section>
	);
}
