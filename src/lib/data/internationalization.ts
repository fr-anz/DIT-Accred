import binusLogo from '$lib/assets/internationalization/binus.png';
import unpamLogo from '$lib/assets/internationalization/unpam.png';
import umpsaLogo from '$lib/assets/internationalization/umpsa.png';
import picabLogo from '$lib/assets/internationalization/pcab.png';

/* `lat`/`lon` place each partner on the network map. They are approximate
   campus locations; the map is illustrative, not a survey. */
export type Partner = {
	id: string;
	short: string;
	name: string;
	country: string;
	place: string;
	lat: number;
	lon: number;
	logo: string;
	description: string;
};

export const home = { name: 'PUP Manila', lat: 14.6, lon: 121.01 };

export const partners: Partner[] = [
	{
		id: 'binus',
		short: 'BINUS',
		name: 'Bina Nusantara University',
		country: 'Indonesia',
		place: 'Jakarta',
		lat: -6.2,
		lon: 106.78,
		logo: binusLogo,
		description: 'Signed a memorandum of understanding with PUP and co-hosted IICTC 2022.'
	},
	{
		id: 'umpsa',
		short: 'UMPSA',
		name: 'Universiti Malaysia Pahang Al-Sultan Abdullah',
		country: 'Malaysia',
		place: 'Pahang',
		lat: 3.7,
		lon: 103.2,
		logo: umpsaLogo,
		description:
			'Signed a memorandum of understanding with PUP, conducts joint research, and collaborated on ICoAIMS 2025.'
	},
	{
		id: 'unpam',
		short: 'UNPAM',
		name: 'Universitas Pamulang',
		country: 'Indonesia',
		place: 'South Tangerang',
		lat: -6.34,
		lon: 106.69,
		logo: unpamLogo,
		description: 'Hosted a PUP guest lecture, “AI and the Skills of the Future,” on March 13, 2025.'
	},
	{
		id: 'picab',
		short: 'PICAB',
		name: 'PCS Information and Computing Accreditation Board',
		country: 'Philippines',
		place: 'Metro Manila',
		lat: 14.55,
		lon: 121.03,
		logo: picabLogo,
		description: 'Its Computing Accreditation Commission certified PUP’s BSIT program in July 2026.'
	}
];

type WuriEntry = {
	id: string;
	project: string;
	category: string;
	rank: string | null;
	description: string;
	featured?: boolean;
};

export const wuriTimeline: { year: string; entries: WuriEntry[] }[] = [
	{
		year: '2024',
		entries: [
			{
				id: 'floodwatcher',
				project: 'Floodwatcher',
				category: 'Generative AI Application',
				rank: '21st',
				description: 'A BSCS project that forecasts water levels in the Marikina River.'
			}
		]
	},
	{
		year: '2025',
		entries: [
			{
				id: 'heatwatch',
				project: 'HEATWATCH (Climheat)',
				category: 'Technology Development & Application',
				rank: '41st',
				description: 'A heat-index and wellness app that earned DIT its first WURI ranking.',
				featured: true
			},
			{
				id: 'idrim',
				project: 'I-DRIM',
				category: 'Research Representative Project',
				rank: '65th',
				description:
					'The Innovative Disaster Risk Mitigation program brought together RESBAC and Flood Detect Waze.'
			}
		]
	},
	{
		year: '2026',
		entries: [
			{
				id: 'flood-detect-waze',
				project: 'Flood Detect Waze',
				category: 'Representative Research Project',
				rank: null,
				description: 'PUP endorsed the enhanced flood-alert app in September 2026.'
			}
		]
	}
];

/* One timeline from PUP's first flood project to the UMPSA agreement.
   Only FloodDetectWaze → IfloodSense is a direct lineage; earlier stops are
   PUP flood projects in date order. `datetime: null` marks a future step. */
export const floodTimeline = [
	{
		date: '2024',
		datetime: '2024',
		title: 'Floodwatcher',
		detail:
			'A BSCS project that forecasts water levels in the Marikina River. Ranked 21st in WURI 2024.'
	},
	{
		date: '2025',
		datetime: '2025',
		title: 'Flood Detect Waze',
		detail: 'Part of the I-DRIM program, then endorsed to WURI 2026 as an enhanced flood-alert app.'
	},
	{
		date: 'July 28, 2026',
		datetime: '2026-07-28',
		title: 'IfloodSense proposed',
		detail: 'PUP proposed IfloodSense to UMPSA as an international extension of FloodDetectWaze.'
	},
	{
		date: 'September 8, 2026',
		datetime: '2026-09-08',
		title: 'Second meeting',
		detail: 'PUP and UMPSA researchers met again to continue work on the project.'
	},
	{
		date: 'Next step',
		datetime: null,
		title: 'Memorandum of Agreement',
		detail: 'A Memorandum of Agreement is the next step for the collaboration.'
	}
];

export const ifloodsenseTeam = [
	{ name: 'Jomari Arago', role: 'BSIT student developer' },
	{ name: 'Harold Benedict Hernandez', role: 'BSIT student developer' },
	{ name: 'James Patrick Isidro', role: 'BSIT student developer' },
	{ name: 'Prof. Ma. Leonila Amata', role: 'UMPSA flood-risk study' }
];

export const studentTrip = {
	event: 'WCSE 2025',
	eventName: '15th International Workshop on Computer Science and Engineering',
	place: 'Jeju Island, South Korea',
	dates: 'June 28–30, 2025',
	lat: 33.45,
	lon: 126.5
};

export const facultyResearchers = [
	'Dr. Illuminada Vivien R. Domingo',
	'Dr. Benilda Eleonor V. Comendador',
	'Assoc. Prof. Rachel A. Nayre',
	'Jennifer Mandigma',
	'Ma. Leonila Amata'
];

export const facultyRoles = ['Technical committee', 'Paper reviewer', 'Session chair, ICFET 2026'];

export const facultyConferences = [
	{ year: '2022', events: [], award: 'ICHESMET' },
	{ year: '2023', events: ['NLPIR'] },
	{ year: '2024', events: ['AICCC'] },
	{ year: '2025', events: ['ICCBDC', 'ICoAIMS', 'ITSRCIT', 'ICCSCI'] },
	{ year: '2026', events: ['ICCIP', 'ICFET'] }
] as { year: string; events: string[]; award?: string }[];

export const studentPapers = [
	{
		title: 'Integrating BERT Model for Document Classification in Document Management System',
		model: 'BERT',
		authors: 'Jallane Roncales',
		adviser: 'Janelle Kyra A. Sagum'
	},
	{
		title: 'Risk Statement Classifier Using BERT and DistilBERT',
		model: 'BERT and DistilBERT',
		authors: 'Kurt Andrei C. Carreon',
		adviser: 'Carlo Inovero'
	},
	{
		title: 'Object Detection in Computer Laboratory Setting Utilizing YOLO Model',
		model: 'YOLO',
		authors: 'Leonardo M. Porteira',
		adviser: 'Carlo Inovero'
	},
	{
		title: 'Job Tier Classification in Applicant Tracking Systems Utilizing One-Dimensional CNN',
		model: '1D CNN',
		authors: 'Leonardo M. Porteira and John Bryan T. Cervantes',
		adviser: 'Michael B. Dela Fuente'
	}
];
