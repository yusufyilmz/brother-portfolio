"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type {
	YouTubeChannelDetails,
	YouTubeVideo,
} from "@/utils/fetchChannelVideos";

type ChannelConfig = {
	id: string;
	handle: string;
	channelUrl?: string;
	label?: string;
	tagline?: string;
	fallbackDescription?: string;
	maxResults?: number;
};

type ChannelState = {
	loading: boolean;
	error?: string;
	channel?: YouTubeChannelDetails;
	videos?: YouTubeVideo[];
};

type YouTubeChannelsSectionProps = {
	sectionTitle: string;
	sectionIntro?: string;
	channels: ChannelConfig[];
};

const numberFormatter = new Intl.NumberFormat("tr-TR", {
	notation: "compact",
	maximumFractionDigits: 1,
});

const formatNumber = (value?: number) => {
	if (typeof value !== "number") return "—";
	return numberFormatter.format(value);
};

const toEmbedUrl = (url: string): string => {
	if (url.includes("youtu.be/")) {
		const videoId = url.split("youtu.be/")[1]?.split("?")[0];
		return `https://www.youtube.com/embed/${videoId}`;
	}
	if (url.includes("watch?v=")) {
		const videoId = url.split("watch?v=")[1]?.split("&")[0];
		return `https://www.youtube.com/embed/${videoId}`;
	}
	if (url.includes("embed/")) {
		return url;
	}
	const match = url.match(
		/(?:youtube\.com\/|youtu\.be\/)(?:watch\?v=|embed\/|v\/)?([^&\n?#]+)/,
	);
	if (match && match[1]) {
		return `https://www.youtube.com/embed/${match[1]}`;
	}
	return url;
};

export function YouTubeChannelsSection({
	sectionTitle,
	sectionIntro,
	channels,
}: YouTubeChannelsSectionProps) {
	const initialState = useMemo<Record<string, ChannelState>>(
		() =>
			channels.reduce(
				(acc, channel) => ({
					...acc,
					[channel.id]: { loading: true },
				}),
				{},
			),
		[channels],
	);

	const [channelData, setChannelData] =
		useState<Record<string, ChannelState>>(initialState);

	useEffect(() => {
		setChannelData(initialState);

		const controllers: AbortController[] = [];

		channels.forEach((channel) => {
			const controller = new AbortController();
			controllers.push(controller);

			async function fetchChannel() {
				try {
					const params = new URLSearchParams({
						handle: channel.handle,
						maxResults: String(channel.maxResults ?? 6),
					});

					const response = await fetch(
						`/api/youtube/channel?${params.toString()}`,
						{ signal: controller.signal },
					);
					const result = await response.json();

					if (!result.success) {
						throw new Error(result.error || "Failed to fetch channel data");
					}

					setChannelData((prev) => ({
						...prev,
						[channel.id]: {
							loading: false,
							channel: result.data.channel,
							videos: result.data.videos,
						},
					}));
				} catch (error) {
					if (controller.signal.aborted) return;
					const message =
						error instanceof Error ? error.message : "Unknown error";
					setChannelData((prev) => ({
						...prev,
						[channel.id]: {
							loading: false,
							error: message,
						},
					}));
				}
			}

			fetchChannel();
		});

		return () => {
			controllers.forEach((controller) => controller.abort());
		};
	}, [channels, initialState]);

	if (channels.length === 0) {
		return null;
	}

	return (
		<section className="section bg-surface/40">
			<div className="container space-y-12">
				<div className="max-w-3xl space-y-4">
					<p className="text-sm tracking-[0.2em] uppercase text-muted">
						YouTube
					</p>
					<h2 className="text-3xl md:text-4xl font-semibold">{sectionTitle}</h2>
					{sectionIntro && (
						<p className="text-base md:text-lg text-muted">{sectionIntro}</p>
					)}
				</div>

				<div className="space-y-10">
					{channels.map((config) => {
						const state = channelData[config.id] || { loading: true };
						const channel = state.channel;
						const videos = state.videos ?? [];

						return (
							<article
								key={config.id}
								className="rounded-3xl border border-border/40 bg-background/80 p-6 md:p-10 shadow-lg shadow-black/5 space-y-8"
							>
								<div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
									<div className="flex flex-col md:flex-row gap-4 md:items-center">
										<div className="h-16 w-16 flex items-center justify-center rounded-full bg-surface border border-border overflow-hidden">
											{channel?.thumbnails?.high ? (
												<Image
													src={channel.thumbnails.high}
													alt={channel.title}
													width={64}
													height={64}
													className="h-full w-full object-cover"
												/>
											) : (
												<span className="text-xl font-semibold">
													{config.label?.charAt(0) || "Y"}
												</span>
											)}
										</div>
										<div className="space-y-1">
											<div className="flex flex-wrap items-center gap-2">
												<h3 className="text-2xl font-semibold">
													{channel?.title || config.label || config.handle}
												</h3>
												<span className="text-sm text-muted">
													{channel?.customUrl || config.handle}
												</span>
											</div>
											{config.tagline && (
												<p className="text-sm text-muted">{config.tagline}</p>
											)}
										</div>
									</div>
									{(config.channelUrl || channel?.customUrl) && (
										<Link
											href={config.channelUrl || channel?.customUrl || "#"}
											target="_blank"
											className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-sm font-medium transition hover:bg-foreground hover:text-background"
										>
											Kanala git
										</Link>
									)}
								</div>

								<div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
									<div>
										<p className="text-2xl font-semibold">
											{formatNumber(channel?.subscriberCount)}
										</p>
										<p className="text-xs uppercase tracking-wide text-muted">
											Abone
										</p>
									</div>
									<div>
										<p className="text-2xl font-semibold">
											{formatNumber(channel?.videoCount)}
										</p>
										<p className="text-xs uppercase tracking-wide text-muted">
											VİDEO
										</p>
									</div>
									<div>
										<p className="text-2xl font-semibold">
											{formatNumber(channel?.viewCount)}
										</p>
										<p className="text-xs uppercase tracking-wide text-muted">
											İzlenme
										</p>
									</div>
									<div>
										<p className="text-2xl font-semibold">
											{channel?.publishedAt
												? new Date(channel.publishedAt).getFullYear()
												: "—"}
										</p>
										<p className="text-xs uppercase tracking-wide text-muted">
											Yayınlanma
										</p>
									</div>
								</div>

								<div className="space-y-6">
									<p className="text-sm md:text-base text-muted leading-relaxed">
										{channel?.description || config.fallbackDescription}
									</p>

									{state.loading && (
										<div className="grid gap-6 md:grid-cols-2">
											{Array.from({ length: config.maxResults ?? 6 }).map(
												(_, index) => (
													<div
														/* eslint-disable-next-line react/no-array-index-key */
														key={index}
														className="h-56 animate-pulse rounded-2xl bg-surface"
													/>
												),
											)}
										</div>
									)}

									{state.error && (
										<p className="text-sm text-red-500">
											Hata: {state.error}. Detaylar için konsolu kontrol edin.
										</p>
									)}

									{!state.loading && !state.error && videos.length === 0 && (
										<p className="text-sm text-muted">
											Bu kanalda gösterilecek video bulunamadı.
										</p>
									)}

									{!state.loading && !state.error && videos.length > 0 && (
										<div className="grid gap-6 md:grid-cols-2">
											{videos.map((video) => (
												<div key={video.id} className="space-y-3">
													<div className="aspect-video w-full overflow-hidden rounded-2xl border border-border/40 bg-black/80">
														<iframe
															src={toEmbedUrl(video.url)}
															title={video.title}
															className="h-full w-full"
															allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
															allowFullScreen
														/>
													</div>
													<div>
														<h4 className="text-base font-medium">
															{video.title}
														</h4>
														<p className="text-xs text-muted">
															{new Date(video.publishedAt).toLocaleDateString(
																"tr-TR",
																{
																	year: "numeric",
																	month: "short",
																	day: "numeric",
																},
															)}
														</p>
													</div>
												</div>
											))}
										</div>
									)}
								</div>
							</article>
						);
					})}
				</div>
			</div>
		</section>
	);
}
