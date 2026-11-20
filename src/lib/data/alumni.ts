// Notable alumni featured on the Teaching & Learning page.
// videoUrl is the original Google Drive file link; videoEmbedUrl is its preview player.
export interface Alumni {
	name: string;
	classYear: number;
	role: string;
	company: string;
	imageUrl: string;
	imageAlt: string;
	/** Crop alignment for photos whose subject is off-center. */
	imagePosition?: string;
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
		imageUrl: 'https://cdn.theavenir.dev/images/Alumni/Kent%20Julius.png',
		imageAlt: 'Portrait of Kent Julius B. Sarmiento',
		additionalRole: '',
		videoUrl: 'https://drive.google.com/file/d/1Q6fMQu2QYLGTEubXE8ecS6f0BzC9sjd2/view',
		videoEmbedUrl: 'https://drive.google.com/file/d/1Q6fMQu2QYLGTEubXE8ecS6f0BzC9sjd2/preview'
	},
	{
		name: 'Trisha Ann Mapacpac',
		classYear: 2017,
		role: 'Software Quality Assurance Engineer',
		company: 'eCapital, Waterloo Ontario',
		imageUrl: 'https://cdn.theavenir.dev/images/Alumni/Trisha%20Ann.jpg',
		imageAlt: 'Portrait of Trisha Ann Mapacpac',
		additionalRole: '',
		videoUrl: 'https://drive.google.com/file/d/1JYUQs_UVYboer8-o9u3DxxaiDGfZoXaJ/view',
		videoEmbedUrl: 'https://drive.google.com/file/d/1JYUQs_UVYboer8-o9u3DxxaiDGfZoXaJ/preview'
	},
	{
		name: 'Zorex R. Salvo',
		classYear: 2016,
		role: 'Software Engineer',
		company: 'TotalRewards Software, Inc.',
		imageUrl: 'https://cdn.theavenir.dev/images/Alumni/Zorex.jpg',
		imageAlt: 'Zorex R. Salvo speaking at PythonAsia 2026',
		imagePosition: 'right top',
		additionalRole: 'President, Python Philippines',
		videoUrl: 'https://drive.google.com/file/d/1FL0vPbisWtq7HFp6vTguVFhtm4Z2ppeg/view',
		videoEmbedUrl: 'https://drive.google.com/file/d/1FL0vPbisWtq7HFp6vTguVFhtm4Z2ppeg/preview'
	},
	{
		name: 'Philip Frias, Jr.',
		classYear: 2018,
		role: 'Head of Cybersecurity',
		company: 'OGIS Philippines',
		imageUrl: 'https://cdn.theavenir.dev/images/Alumni/Philip.png',
		imageAlt: 'Portrait of Philip Frias, Jr.',
		additionalRole: '',
		videoUrl: 'https://drive.google.com/file/d/1Ql7ObShDfZceQkWwgxbefDU-8Ozumvc5/view?usp=sharing',
		videoEmbedUrl: 'https://drive.google.com/file/d/1Ql7ObShDfZceQkWwgxbefDU-8Ozumvc5/preview'
	},
	{
		name: 'Denimar F. Fernandez',
		classYear: 2016,
		role: 'AI Lead | Senior Full Stack Engineer',
		company: 'Navrix Health',
		imageUrl: 'https://cdn.theavenir.dev/images/Alumni/Denimar.png',
		imageAlt: 'Portrait of Denimar F. Fernandez',
		additionalRole: '',
		videoUrl:
			'https://drive.google.com/file/d/1td4UB4KkjyzEJqkv_hHApQO_LNE-ZtfS/view?usp=share_link',
		videoEmbedUrl: 'https://drive.google.com/file/d/1td4UB4KkjyzEJqkv_hHApQO_LNE-ZtfS/preview'
	},
	{
		name: 'Glenn Arvin Tobillo',
		classYear: 2007,
		role: 'Senior Software Engineer',
		company: 'Westpac',
		imageUrl: 'https://cdn.theavenir.dev/images/Alumni/8d695e9238a82785d8e9af98e45fcc32.jpeg',
		imageAlt: 'Portrait of Glenn Arvin Tobillo',
		additionalRole: '',
		videoUrl: 'https://drive.google.com/file/d/1Z0Mg97j8j1sI3nIxRcqowpxUvTUyZrvo/view?usp=drivesdk',
		videoEmbedUrl: 'https://drive.google.com/file/d/1Z0Mg97j8j1sI3nIxRcqowpxUvTUyZrvo/preview'
	}
];
