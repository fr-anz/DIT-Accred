// NOTE: PLACEHOLDER DATA.
// These tiles reuse images already present in `static/` so the globe looks populated.
// Replace `baseImages` with the real accreditation assets (certificates, awards, event
// photos, partner logos, media mentions) when they are available.

export type GalleryImage = {
	src: string;
	alt: string;
	caption: string;
};

/** Distinct source images currently available in /static. */
const baseImages: GalleryImage[] = [
	{
		src: '/research/dit-seal.png',
		alt: 'Department of Information Technology seal',
		caption: 'DIT Official Seal'
	},
	{
		src: '/planning/qs-logo.png',
		alt: 'QS World University Rankings logo',
		caption: 'QS World University Rankings'
	},
	{
		src: '/planning/qs-stars-box.png',
		alt: 'QS Stars rating',
		caption: 'QS Stars Rating'
	},
	{
		src: '/planning/wuri-logo.png',
		alt: 'WURI Ranking logo',
		caption: 'WURI Innovation Ranking'
	},
	{
		src: '/planning/video-placeholder.png',
		alt: 'Featured media coverage',
		caption: 'Media Feature'
	},
	{
		src: '/research/faculty-placeholder.jpg',
		alt: 'Faculty researcher portrait',
		caption: 'Faculty Researcher'
	},
	{
		src: '/teaching-learning/faculty-placeholder.jpg',
		alt: 'Faculty member portrait',
		caption: 'Academic Staff'
	},
	{
		src: '/teaching-learning/alum-irene.png',
		alt: 'Notable alumna portrait',
		caption: 'Notable Alumna'
	},
	{
		src: '/teaching-learning/alum-hoshi.png',
		alt: 'Notable alumnus portrait',
		caption: 'Notable Alumnus'
	},
	{
		src: '/teaching-learning/alum-jaemin.png',
		alt: 'Notable alumnus portrait',
		caption: 'Notable Alumnus'
	}
];

/** Extra caption flavors so duplicated tiles do not all read identically. */
const captionFlavors = [
	'Accreditation Evidence',
	'AACCUP Level IV',
	'Program Milestone',
	'Award & Recognition',
	'Partner Institution',
	'Research Output',
	'Industry Linkage',
	'Quality Assurance'
];

/**
 * Build a dense set of tiles by cycling the base images.
 * A larger count makes the sphere read as solid (no gaps).
 */
export function buildGalleryImages(count = 150): GalleryImage[] {
	const tiles: GalleryImage[] = [];
	for (let i = 0; i < count; i++) {
		const base = baseImages[i % baseImages.length];
		// Keep the real caption on the first pass, then vary it on later cycles.
		const cycle = Math.floor(i / baseImages.length);
		const caption =
			cycle === 0 ? base.caption : captionFlavors[i % captionFlavors.length];
		tiles.push({ src: base.src, alt: base.alt, caption });
	}
	return tiles;
}

export const galleryImages: GalleryImage[] = buildGalleryImages(150);
