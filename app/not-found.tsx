import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<div className="min-h-screen flex items-center justify-center">
			<div className="container">
				<div className="max-w-2xl mx-auto text-center space-y-6">
					<h1 className="text-6xl md:text-8xl font-bold text-muted/20">404</h1>
					<h2 className="text-3xl md:text-4xl font-bold">Page not found</h2>
					<p className="text-lg text-muted">
						Sorry, we couldn't find the page you're looking for.
					</p>
					<div className="pt-6">
						<Button asChild size="lg">
							<Link href="/">Go back home</Link>
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}

