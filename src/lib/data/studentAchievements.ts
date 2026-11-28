// Updated department posters in the Winners CDN folder. Local crops contain
// only the team photograph; the viewer opens the complete original poster.
export interface AchievementPhoto {
	/** Full congratulations poster, shown in the enlarged view. */
	src: string;
	/** Team photograph extracted from the updated, high-resolution poster. */
	photo: string;
	width: number;
	height: number;
	alt: string;
	team: string;
	result: string;
	event: string;
}

export const studentAchievementPhotos: AchievementPhoto[] = [
	{
		src: 'https://cdn.theavenir.dev/images/Winners/pldt.jpg',
		photo: 'https://cdn.theavenir.dev/images/Winners/pldt.jpg',
		width: 1090,
		height: 720,
		team: 'Lord of the Pings',
		result: 'Champion',
		event: 'PLDT AI in 30 Hours Hackathon',
		alt: 'Lord of the Pings receiving the champion award at the PLDT AI in 30 Hours Hackathon'
	},
	{
		src: 'https://cdn.theavenir.dev/images/Winners/Appsolutely.jpg',
		photo: '/teaching-learning/area2/photo-appsolutely.jpg',
		width: 1403,
		height: 600,
		team: 'Team Appsolutely',
		result: 'First Place',
		event: 'Future Builders: From Ideas to Impact, ICS x IBM Bobathon',
		alt: 'Team Appsolutely (Donita Salonga, Viviene Tricia Rabano, Ayen Mejorada, Troy Lazaro and Justin Carl Encio), First Place at Future Builders: From Ideas to Impact, ICS x IBM Bobathon'
	},
	{
		src: '/teaching-learning/area2/photo-zero-vector.jpg',
		photo: '/teaching-learning/area2/photo-zero-vector.jpg',
		width: 1400,
		height: 770,
		team: 'Zero Vector',
		result: 'Champion',
		event: 'Zero Vector Philippines Hackathon',
		alt: 'A student holding the ₱10,000 Zero Vector Ventures Studio prize cheque as Champion of the Zero Vector Philippines Hackathon'
	},
	{
		src: 'https://cdn.theavenir.dev/images/Winners/agrikalinga.jpg',
		photo: '/teaching-learning/area2/photo-agrikalinga.jpg',
		width: 1403,
		height: 600,
		team: 'Agrikalinga',
		result: '1st Runner Up',
		event: 'The Innovation Lab 2026',
		alt: 'Team Agrikalinga (Gianne Crizzle A. Dasco, Roi Aldrich S. Santos and Matthew Aiman L. Lopez), 1st Runner Up at The Innovation Lab 2026'
	},
	{
		src: 'https://cdn.theavenir.dev/images/Winners/kickstart.jpg',
		photo: '/teaching-learning/area2/photo-kickstart.jpg',
		width: 1403,
		height: 600,
		team: 'Kickstart PH',
		result: '2nd Place, Health and Well-being',
		event: 'HABI 4.0 Design Thinking Workshop',
		alt: 'Team Kickstart PH (Lawrence L. Panes, Dave Aillerr C. Rivas and Fahad A. Hadji Esmael), 2nd Place in Health and Well-being and Top 6 overall at the HABI 4.0 Design Thinking Workshop'
	},
	{
		src: 'https://cdn.theavenir.dev/images/Winners/Egovibes.jpg',
		photo: '/teaching-learning/area2/photo-egovibes.jpg',
		width: 1400,
		height: 599,
		team: 'eGovibes',
		result: 'Top 10 Finalist',
		event: 'eGovHackathon 2026',
		alt: 'Team eGovibes (Justin A. Jose, Mark Kenneth Galario, VJ Evangelista, Denise Jane Karim and Antonio Rene Casison), Top 10 Finalist at eGovHackathon 2026'
	}
];
