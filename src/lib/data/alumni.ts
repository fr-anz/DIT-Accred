// Notable alumni featured on the Teaching & Learning page.
// videoUrl is the original Google Drive file link; videoEmbedUrl is its preview player.
export interface Alumni {
	name: string;
	classYear: number;
	role: string;
	company: string;
	/** Secondary role, when the alumnus holds one. */
	additionalRole: string;
	videoUrl: string;
	videoEmbedUrl: string;
}

export const alumniList: Alumni[] = [
	{
		name: 'Kent Julius B. Sarmiento',
		classYear: 2013,
		role: 'IT Senior Manager, Applications',
		company: 'Lizardbear Tasking Inc.',
		additionalRole: '',
		videoUrl: 'https://drive.google.com/file/d/1Q6fMQu2QYLGTEubXE8ecS6f0BzC9sjd2/view',
		videoEmbedUrl: 'https://drive.google.com/file/d/1Q6fMQu2QYLGTEubXE8ecS6f0BzC9sjd2/preview'
	},
	{
		name: 'Trisha Ann Mapacpac',
		classYear: 2017,
		role: 'Software Quality Assurance Engineer',
		company: 'eCapital, Waterloo Ontario',
		additionalRole: '',
		videoUrl: 'https://drive.google.com/file/d/1JYUQs_UVYboer8-o9u3DxxaiDGfZoXaJ/view',
		videoEmbedUrl: 'https://drive.google.com/file/d/1JYUQs_UVYboer8-o9u3DxxaiDGfZoXaJ/preview'
	},
	{
		name: 'Zorex R. Salvo',
		classYear: 2016,
		role: 'Software Engineer',
		company: 'TotalRewards Software, Inc.',
		additionalRole: 'President, Python Philippines',
		videoUrl: 'https://drive.google.com/file/d/1FL0vPbisWtq7HFp6vTguVFhtm4Z2ppeg/view',
		videoEmbedUrl: 'https://drive.google.com/file/d/1FL0vPbisWtq7HFp6vTguVFhtm4Z2ppeg/preview'
	}
];
