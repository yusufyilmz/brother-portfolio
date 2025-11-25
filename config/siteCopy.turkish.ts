export const siteCopyTurkish = {
	site: {
		name: "Yaratıcı Portföy",
		artistName: "Yunus Yilmaz", // Gerçek isimle güncellenecek
		domain: "kardesininadi.com", // Gerçek domain ile güncellenecek
		baseUrl: "https://www.kardesininadi.com", // Gerçek URL ile güncellenecek
		metaTitle: "Yaratıcı Portföy | Video & Fotoğraf Çalışmaları",
		metaDescription:
			"Video prodüksiyonu, sinematografi ve fotoğrafçılık çalışmalarını sergileyen profesyonel portföy.",
		keywords: [
			"video prodüksiyonu",
			"sinematografi",
			"fotoğrafçılık",
			"videograf",
			"film yapımcısı",
		] as const,
	},
	hero: {
		eyebrow: "Yaratıcı Yönetmen & Videograf",
		heading: "Yankı uyandıran görsel hikayeler yaratıyorum.",
		subheading:
			"Video prodüksiyonu, sinematografi ve yaratıcı yönetim konularında uzmanlaşmış. Konseptten final kurguya kadar, vizyonları hayata geçiriyorum.",
		primaryCtaLabel: "Çalışmaları Gör",
		primaryCtaHref: "/work",
		secondaryCtaLabel: "İletişime Geç",
		secondaryCtaHref: "/contact",
		highlightNote: "Projeler için müsait · [Konum] merkezli",
		// Hero video CDN'den sunuluyor
		video: "https://files.catbox.moe/glutuj.mp4", // CDN hosted video
	},
	work: {
		sectionTitle: "Seçilmiş Çalışmalar",
		sectionIntro:
			"Video prodüksiyonu, sinematografi ve fotoğrafçılık alanlarında son projelerden oluşan bir koleksiyon.",
		// Çalışma öğeleri aşağıda tanımlanacak
		featured: [
			{
				id: "project-1",
				title: "Proje Başlığı 1",
				category: "Video Prodüksiyonu",
				description: "Projenin kısa açıklaması",
				images: ["/media/image1.jpg", "/media/image2.jpg", "/media/image3.jpg"],
				videoUrl: "", // Video URL'si buraya eklenecek (örn: "/media/video1.mp4" veya YouTube URL)
				year: "2025",
			},
			{
				id: "project-2",
				title: "Proje Başlığı 2",
				category: "Sinematografi",
				description: "Projenin kısa açıklaması",
				images: ["/media/image2.jpg"],
				videoUrl: "", // Video URL'si buraya eklenecek
				year: "2025",
			},
			{
				id: "project-3",
				title: "Proje Başlığı 3",
				category: "Fotoğrafçılık",
				description: "Projenin kısa açıklaması",
				images: ["/media/image3.jpg"],
				videoUrl: "", // Video URL'si buraya eklenecek
				year: "2025",
			},
		],
	},
	youtube: {
		sectionTitle: "YouTube Kanalları",
		sectionIntro:
			"Farklı formatlarda içerik ürettiğimiz aktif YouTube kanalları. Aşağıdan kanalları inceleyip yayınlanan son videolara göz atabilirsiniz.",
		channels: [
			{
				id: "exeetyb",
				handle: "@EXEETYB",
				channelUrl: "https://www.youtube.com/@EXEETYB",
				label: "EXEETYB",
				tagline: "Oyun & eğlence içerikleri",
				fallbackDescription:
					"Ekip tarafından hazırlanan oyun, eğlence ve günlük vlog içerikleri. İçerik temposu yüksek, izleyicilerle aktif etkileşim kuruyor.",
				maxResults: 6,
			},
			// Yeni kanallar bu listeye eklenebilir
		],
	},
	about: {
		sectionTitle: "Hakkımda",
		heading: "Görsel medya aracılığıyla hikaye anlatıcısı.",
		body: [
			"Kardeşinizin geçmişi, deneyimi ve görsel hikaye anlatımına olan tutkusu hakkında bir paragraf.",
			"Çalışma yaklaşımları, onları neyin motive ettiği ve yaratıcı felsefeleri hakkında başka bir paragraf.",
		],
		skills: [
			"Video Prodüksiyonu",
			"Sinematografi",
			"Fotoğrafçılık",
			"Renk Düzenleme",
			"Post Prodüksiyon",
			"Yaratıcı Yönetim",
		],
		image: "/media/about.jpg",
		video: "/media/about.mp4",
	},
	contact: {
		heading: "Birlikte bir şeyler yaratalım.",
		body: "Aklınızda bir proje olsun ya da sadece vizyonunuz hakkında sohbet etmek isteyin, sizden haber almak isterim.",
		email: "iletisim@kardesininadi.com", // Gerçek e-posta ile güncellenecek
		social: {
			instagram: "https://www.instagram.com/kullaniciadi",
			youtube: "https://youtu.be/VSm6psGvRwM",
			vimeo: "", // İsteğe bağlı
			linkedin: "", // İsteğe bağlı
		},
	},
	navigation: {
		work: "Çalışmalar",
		about: "Hakkımda",
		contact: "İletişim",
	},
	ui: {
		viewAllWork: "Tüm Çalışmaları Gör",
		moreAboutMe: "Hakkımda Daha Fazla",
		getInTouch: "İletişime Geç",
		viewMoreWork: "Daha Fazla Çalışma Gör",
		connectOnSocial: "Sosyal Medyada Bağlan",
		instagram: "Instagram",
		youtube: "YouTube",
		linkedin: "LinkedIn",
	},
};

export type SiteCopyTurkish = typeof siteCopyTurkish;
