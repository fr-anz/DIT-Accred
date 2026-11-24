// BSIT faculty roster from the Area 2 (Teaching and Learning) report, Faculty Profile tables.
// Full-time covers the permanent and temporary regular faculty; part-time covers lecturers.

export type FacultyStatus = 'full-time' | 'part-time';

/** Cutout crop from Figma 880:1597, as percentages of the card. */
export interface FacultyCutout {
	width: number;
	height: number;
	left: number;
	top: number;
}

export interface FacultyMember {
	name: string;
	specialization: string;
	education: string[];
	courses: string[];
	photo: string;
	/** Transparent Figma cutout positioned inside the card. Plain photos fill the card instead. */
	cutout?: FacultyCutout;
	/** Crop alignment for plain photos whose subject is off-center. */
	photoPosition?: string;
}

const plainPhoto = (slug: string) => '/teaching-learning/faculty/photos/' + slug + '.jpg';

export const fullTimeFaculty: FacultyMember[] = [
	{
		name: 'Aguila, Fermin',
		specialization: 'Network and Infrastructure',
		education: ['Bachelor in Computer Data Processing Management (1989)'],
		courses: ['Data Communications and Networking', 'Network Administration'],
		photo: plainPhoto('aguila'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Amata, Maria Leonila',
		specialization: 'IT Service Management',
		education: [
			'Bachelor in Computer Data Processing Management (1996)',
			'Master in Education Management (2017)',
			'Master of Science in Information Technology (ongoing)'
		],
		courses: ['Introduction to Computing', 'Social and Professional Issues in Computing'],
		photo: plainPhoto('amata'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Canlas, Rosita',
		specialization: 'Software Development',
		education: [
			'Bachelor in Computer Data Processing Management (1986)',
			'Master in Information Technology (2005)'
		],
		courses: ['Computer Programming 1 and 2'],
		photo: plainPhoto('canlas'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Comendador, Benilda Eleonor',
		specialization: 'IT Service Management, Systems Development',
		education: [
			'Bachelor in Computer Data Processing Management (1989)',
			'Master of Science in Information Technology (2002)',
			'Master of Science in Global Information and Telecommunication Studies (2010)',
			'Doctor in Information Technology (2017)'
		],
		courses: ['Fundamentals of Research'],
		photo: plainPhoto('comendador'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Domingo, Iluminada Vivien',
		specialization: 'IT Service Management, Data Analytics',
		education: [
			'Bachelor in Business Education (1986)',
			'Master in Business Administration (1990)',
			'Doctor in Business Administration (2004)'
		],
		courses: ['Fundamentals of Research', 'E/M-Commerce'],
		// Figma repeats Comendador's photo on this card; use the supplied faculty original instead.
		photo: 'https://cdn.theavenir.dev/images/teaching-learning/faculty/originals/domingo.png'
	},
	{
		name: 'Espineli, Juancho',
		specialization: 'Data Analytics, Web and Cloud Computing, Software Development',
		education: [
			'Bachelor of Science in Business Administration major in Computer Management (1996)',
			'Master in Information Technology (2012)',
			'Master of Arts in Education major in Educational Management (2023)',
			'Doctor in Information Technology (2019)'
		],
		courses: ['Information Management', 'Quantitative Methods with Modeling and Simulation'],
		photo: plainPhoto('espineli'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Mandigma, Jonnifer',
		specialization: 'IT Service Management, Software Development',
		education: [
			'Bachelor of Science in Information Technology (2016)',
			'Master in Information Technology (2026)'
		],
		courses: ['Information Assurance and Security 1 and 2', 'Cybersecurity Electives'],
		photo: plainPhoto('mandigma')
	},
	{
		name: 'Mayor, Jayson James',
		specialization: 'IT Service Management, Software Development',
		education: [
			'Bachelor in Business Teacher Education major in Information and Communications Technology (2016)',
			'Master in Information Technology (2026)'
		],
		courses: ['Computer Programming 1 and 2', 'Multimedia', 'Web Development'],
		photo: plainPhoto('mayor'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Miclat, Segundina',
		specialization: 'Data Analytics',
		education: [
			'Bachelor of Science in Office Administration (1993)',
			'Master in Educational Management (2007)',
			'Doctor in Educational Management (academic requirements completed)'
		],
		courses: ['Introduction to Computing', 'Social and Professional Issues in Computing'],
		photo: plainPhoto('miclat'),
		photoPosition: 'center 5%'
	},
	{
		name: 'Munsayac, Joel',
		specialization: 'Data Analytics',
		education: ['PhD in Educational Management'],
		courses: ['Project Management', 'Living in the IT Era'],
		photo: plainPhoto('munsayac')
	},
	{
		name: 'Nayre, Rachel',
		specialization: 'IT Service Management, Systems Development',
		education: [
			'Bachelor in Computer Data Processing Management (1999)',
			'Master of Science in Information Technology (2015)',
			'Doctor in Information Technology (ongoing)'
		],
		courses: [
			'Computer Programming 3',
			'Object-oriented Programming',
			'Integrative Programming and Technologies'
		],
		photo: plainPhoto('nayre')
	},
	{
		name: 'Reyes, Maria Esperanza',
		specialization: 'IT Service Management, Systems Development',
		education: [
			'Bachelor in Computer Data Processing Management (1999)',
			'Master in Government Management (2000)'
		],
		courses: [
			'Capstone Project',
			'Social and Professional Issues in Computing',
			'Introduction to Cyber Ethics'
		],
		photo: plainPhoto('reyes')
	},
	{
		name: 'Sagum, Janelle Kyra',
		specialization: 'Human-Computer Interaction, IT Service Management, Systems Development',
		education: [
			'Bachelor of Science in Information Science (2016)',
			'Master in Information Science (2019)'
		],
		courses: ['Fundamentals of Research', 'Operating Systems', 'Human-Computer Interaction'],
		photo: plainPhoto('sagum')
	},
	{
		name: 'Santos, John Dustin',
		specialization: 'Human-Computer Interaction, Cybersecurity, Game Development',
		education: [
			'Bachelor of Science in Information Technology (2017)',
			'Master in Information Technology (2023)'
		],
		courses: [
			'Operating Systems',
			'Human-Computer Interaction',
			'Information Assurance and Security 1 and 2'
		],
		photo: plainPhoto('santos')
	}
];

export const partTimeFaculty: FacultyMember[] = [
	{
		name: 'Arcinas, Erico',
		specialization: 'Project Management',
		education: [
			'Bachelor of Science in Information Technology (2019)',
			'Master of Technology Management (2025)'
		],
		courses: ['Living in the IT Era', 'Project Management'],
		photo: plainPhoto('arcinas')
	},
	{
		name: 'Bedis, Severino Jr.',
		specialization: 'Systems Development',
		education: [
			'Bachelor of Science in Information Technology (2019)',
			'Master of Science in Information Technology (2026)'
		],
		courses: [
			'Applications Development and Emerging Technologies',
			'Web Development',
			'Object-oriented Programming'
		],
		photo: plainPhoto('bedis')
	},
	{
		name: 'Cayabyab, Desiderata',
		specialization: 'Project Management',
		education: [
			'Bachelor of Science in Information Technology (2019)',
			'Graduate Diploma in Project Management (2023)',
			'Master in Information Technology (ongoing)'
		],
		courses: ['Project Management'],
		photo: plainPhoto('cayabyab')
	},
	{
		name: 'Escueta, Niño Danielle',
		specialization: 'Data Management',
		education: [
			'Bachelor of Science in Information Technology (2019)',
			'Master of Technology Management (2023)'
		],
		courses: ['Information Management', 'Database Administration'],
		photo: plainPhoto('escueta')
	},
	{
		name: 'Esparrago, Yuzef Ezeckiel',
		specialization: 'Applications Development',
		education: [
			'Bachelor of Science in Information Technology (2019)',
			'Master of Science in Computer Science (ongoing)'
		],
		courses: ['Applications Development and Emerging Technologies', 'Web Development'],
		photo: plainPhoto('esparrago')
	},
	{
		name: 'Fabregas, Arnie',
		specialization: 'Programming',
		education: [
			'Bachelor in Computer Data Processing Management',
			'Master of Science in Computer Science (ongoing)'
		],
		courses: ['Computer Programming 1 and 2'],
		photo: plainPhoto('fabregas')
	},
	{
		name: 'Garcia, Flordeliz',
		specialization: 'E-Commerce',
		education: ['Master in Information Technology'],
		courses: ['E/M-Commerce'],
		photo: plainPhoto('garcia')
	},
	{
		name: 'Lastimosa, Sancho Glen',
		specialization: 'Networking',
		education: [
			'Bachelor in Computer Data Processing Management (1990)',
			'Master in Information Technology (2007)'
		],
		courses: ['Data Communications and Networking', 'Network Administration'],
		photo: plainPhoto('lastimosa')
	},
	{
		name: 'Libunao, Alexis',
		specialization: 'Applications Development',
		education: ['Master in Information Technology (ongoing)'],
		courses: ['Object-oriented Programming'],
		photo: plainPhoto('libunao')
	},
	{
		name: 'Lim, Roberto',
		specialization: 'IT Education',
		education: [
			'Bachelor in Computer Data Processing Management (1987)',
			'Master in Business Administration (2004)'
		],
		courses: ['Living in the IT Era'],
		photo: plainPhoto('lim')
	},
	{
		name: 'Lingad, Jazarene',
		specialization: 'Project Management',
		education: [
			'Bachelor of Science in Information Systems (2017)',
			'Master of Technology Management (2024)'
		],
		courses: ['Project Management'],
		photo: plainPhoto('lingad')
	},
	{
		name: 'Luna, Antonio',
		specialization: 'Multimedia',
		education: [
			'Bachelor of Science in Business Administration – Accounting (1983)',
			'Master of Science in Information Technology (15 units earned)'
		],
		courses: ['Multimedia'],
		photo: plainPhoto('luna')
	},
	{
		name: 'Sales, Angela',
		specialization: 'Multimedia',
		education: ['Master in Information Technology'],
		courses: ['Multimedia', 'Human-Computer Interaction'],
		photo: plainPhoto('sales')
	},
	{
		name: 'San Luis, Angelo Joshua',
		specialization: 'Applications Development',
		education: ['Master in Information Technology (ongoing)'],
		courses: ['Web Development'],
		photo: plainPhoto('san-luis')
	},
	{
		name: 'Tuason, Shena',
		specialization: 'Software Engineering',
		education: ['Master in Information Technology (ongoing)'],
		courses: ['Software Engineering'],
		photo: plainPhoto('tuason')
	},
	{
		name: 'Untalan, Kevin Paul',
		specialization: 'Database Management',
		education: ['Master in Information Technology (ongoing)'],
		courses: ['Information Management'],
		photo: plainPhoto('untalan')
	},
	{
		name: 'Violeta, Mariel Leo',
		specialization: 'IT Education',
		education: ['Master in Information Technology'],
		courses: ['Computer Programming 1 and 2', 'Discrete Structures'],
		photo: plainPhoto('violeta')
	}
];
