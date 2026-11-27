// Teaching & Learning page content transcribed from the Area 2 draft
// (BSIT-Area-2-Teaching-and-Learning-WIP-10-19). Keep figures in sync with that draft.

const AREA2 = '/teaching-learning/area2';

/** Five Curriculum Revision Steps from the draft's diagram, in approval order. */
export interface RevisionStep {
	title: string;
	/** Governance level that owns the step; the diagram rises with it. */
	tier: string;
	detail?: string;
}

export const revisionSteps: RevisionStep[] = [
	{ title: 'Issuance of Memorandum', tier: 'University directive' },
	{
		title: 'Consultations with Different Stakeholders',
		tier: 'Faculty, students, alumni & industry'
	},
	{
		title: 'Drafting and Presentation of Revised Curriculum to the DCEC and the CCEC',
		tier: 'Department & College'
	},
	{
		title: 'Presentation to the UCEC and University Academic Council',
		tier: 'University'
	},
	{
		title: 'Submission to BOR for Approval',
		tier: 'Board of Regents',
		detail: 'BOR Resolution No. 2825 s. 2022'
	}
];

/** Excerpt of the 2022 University Curriculum Revision meeting minutes (linked from step 4). */
export const curriculumMinutes = [
	{
		src: `${AREA2}/ucrm-minutes-attendance.jpg`,
		alt: 'Attendance page of the minutes of the University Curriculum Revision meeting for the 2022 curricula'
	},
	{
		src: `${AREA2}/ucrm-minutes-photos.jpg`,
		alt: 'Screenshots of participants attending the University Curriculum Revision meeting by teleconference'
	}
];

export interface Milestone {
	year: number;
	/** Short name for the program or unit of that era, shown in the scroll story. */
	tag: string;
	title: string;
	desc: string;
}

/** "From BCDPM to BSIT" timeline. */
export const programHistory: Milestone[] = [
	{
		year: 1969,
		tag: 'EDP Courses',
		title: 'Electronic Data Processing',
		desc: 'Short-term EDP courses are offered under the Faculty of Accountancy.'
	},
	{
		year: 1979,
		tag: 'BCDPM',
		title: 'BCDPM is introduced',
		desc: 'The EDP/Computer Data Processing Management Unit opens the four-year ladderized BCDPM.'
	},
	{
		year: 1986,
		tag: 'CCMIT',
		title: 'CCMIT is established',
		desc: 'The College of Computer Management and Information Technology institutionalizes computer education at PUP.'
	},
	{
		year: 1997,
		tag: 'BSIT',
		title: 'BCDPM becomes BSIT',
		desc: 'Under CMO No. 69, s. 1996, the revised BSIT curriculum is implemented from SY 1997–1998.'
	},
	{
		year: 2022,
		tag: 'BSIT 2022',
		title: 'Revised BSIT curriculum',
		desc: 'The 2022 curriculum strengthens emerging IT areas, OBE, experiential learning and professional practice.'
	}
];

/** The draft's "continuous chain" of the Teaching and Learning system. */
export const learningChain = [
	'CHED Standards',
	'PUP Curriculum',
	'Course Learning Outcomes',
	'Teaching and Learning Activities',
	'Assessment',
	'Experiential Learning',
	'Industry/Stakeholder Validation',
	'Graduate Outcomes',
	'Continuous Improvement'
] as const;

export interface CurriculumCourse {
	code: string;
	title: string;
	lec: number;
	lab: number;
	units: number;
	tuition: number;
	prereqs: string[];
}

export interface CurriculumTerm {
	year: 1 | 2 | 3 | 4;
	term: 'First Semester' | 'Second Semester' | 'Midyear';
	courses: CurriculumCourse[];
}

/** Compact constructor: code, title, lec, lab, units, tuition hours, prerequisites. */
function c(
	code: string,
	title: string,
	lec: number,
	lab: number,
	units: number,
	tuition: number,
	...prereqs: string[]
): CurriculumCourse {
	return { code, title, lec, lab, units, tuition, prereqs };
}

/** 2022 BSIT curriculum (CMO 25 s. 2015; BOR Resolution No. 2825 s. 2022). Totals 167 units. */
export const curriculumTerms: CurriculumTerm[] = [
	{
		year: 1,
		term: 'First Semester',
		courses: [
			c('GEED 032', 'Filipinolohiya at Pambansang Kaunlaran', 3, 0, 3, 3),
			c('GEED 005', 'Purposive Communication/Malayuning Komunikasyon', 3, 0, 3, 3),
			c('GEED 004', 'Mathematics in the Modern World/Matematika sa Makabagong Daigdig', 3, 0, 3, 3),
			c('ACCO 014', 'Principles of Accounting', 3, 0, 3, 3),
			c('COMP 001', 'Introduction to Computing', 2, 3, 3, 5),
			c('COMP 002', 'Computer Programming 1', 2, 3, 3, 5),
			c('PATHFIT 1', 'Physical Activity Towards Health and Fitness 1', 2, 0, 2, 2),
			c('NSTP 001', 'National Service Training Program 1', 3, 0, 3, 0)
		]
	},
	{
		year: 1,
		term: 'Second Semester',
		courses: [
			c('GEED 033', 'Pagsasalin sa Kontekstong Filipino', 3, 0, 3, 3, 'GEED 032'),
			c(
				'GEED 002',
				'Readings in Philippine History/Mga Babasahin Hinggil sa Kasaysayan ng Pilipinas',
				3,
				0,
				3,
				3
			),
			c('GEED 020', 'Politics, Governance and Citizenship', 3, 0, 3, 3),
			c('COMP 004', 'Discrete Structures 1', 3, 0, 3, 3, 'GEED 004'),
			c('COMP 003', 'Computer Programming 2', 2, 3, 3, 5, 'COMP 002'),
			c('GEED 010', "People and the Earth's Ecosystems", 3, 0, 3, 3),
			c('PATHFIT 2', 'Physical Activity Towards Health and Fitness 2', 2, 0, 2, 2, 'PATHFIT 1'),
			c('NSTP 002', 'National Service Training Program 2', 3, 0, 3, 0)
		]
	},
	{
		year: 2,
		term: 'First Semester',
		courses: [
			c('GEED 001', 'Understanding the Self/Pag-unawa sa Sarili', 3, 0, 3, 3),
			c('GEED 028', 'Reading Visual Arts', 3, 0, 3, 3),
			c('ELEC IT-FE1', 'BSIT Free Elective 1', 3, 0, 3, 3),
			c('COMP 007', 'Operating Systems', 2, 3, 3, 5, 'COMP 001'),
			c('INTE 201', 'Programming 3 (Structured Programming)', 2, 3, 3, 5, 'COMP 003'),
			c('COMP 008', 'Data Communications and Networking', 2, 3, 3, 5),
			c('COMP 006', 'Data Structures and Algorithms', 2, 3, 3, 5, 'COMP 003'),
			c('PATHFIT 3', 'Physical Activity Towards Health and Fitness 3', 2, 0, 2, 2, 'PATHFIT 2')
		]
	},
	{
		year: 2,
		term: 'Second Semester',
		courses: [
			c('ELEC IT-FE2', 'BSIT Free Elective 2', 3, 0, 3, 3),
			c('COMP 012', 'Network Administration', 2, 3, 3, 5, 'COMP 008'),
			c('COMP 013', 'Human Computer Interaction', 3, 0, 3, 3, 'COMP 002'),
			c('COMP 014', 'Quantitative Methods with Modeling and Simulation', 3, 0, 3, 3),
			c('INTE 202', 'Integrative Programming and Technologies 1', 2, 3, 3, 5),
			c('COMP 009', 'Object Oriented Programming', 2, 3, 3, 5, 'COMP 003'),
			c('COMP 010', 'Information Management', 2, 3, 3, 5, 'COMP 006'),
			c('PATHFIT 4', 'Physical Activity Towards Health and Fitness 4', 2, 0, 2, 2, 'PATHFIT 3')
		]
	},
	{
		year: 3,
		term: 'First Semester',
		courses: [
			c('GEED 006', 'Art Appreciation/Pagpapahalaga sa Sining', 3, 0, 3, 3),
			c('COMP 016', 'Web Development', 2, 3, 3, 5, 'COMP 009'),
			c('INTE 301', 'Systems Integration and Architecture 1', 3, 0, 3, 3, 'INTE 202'),
			c('COMP 017', 'Multimedia', 2, 3, 3, 5),
			c('ELEC IT-E1', 'IT Elective 1', 2, 3, 3, 5),
			c('COMP 018', 'Database Administration', 2, 3, 3, 5),
			c('COMP 015', 'Fundamentals of Research', 3, 0, 3, 3)
		]
	},
	{
		year: 3,
		term: 'Second Semester',
		courses: [
			c('GEED 003', 'The Contemporary World/Ang Kasalukuyang Daigdig', 3, 0, 3, 3),
			c('HRMA 001', 'Principles of Organization and Management', 3, 0, 3, 3),
			c('INTE 302', 'Information Assurance and Security 1', 2, 3, 3, 5, 'INTE 301'),
			c('GEED 008', 'Ethics/Etika', 3, 0, 3, 3),
			c('INTE 303', 'Capstone Project 1', 2, 3, 3, 5, 'COMP 015'),
			c('ELEC IT-E2', 'IT Elective 2', 2, 3, 3, 5),
			c('COMP 019', 'Applications Development and Emerging Technologies', 2, 3, 3, 5, 'COMP 009')
		]
	},
	{
		year: 3,
		term: 'Midyear',
		courses: [
			c('GEED 037', 'Life and Works of Rizal/Buhay at Mga Gawa ni Rizal', 3, 0, 3, 3),
			c('ELEC IT-E3', 'IT Elective 3', 2, 3, 3, 5)
		]
	},
	{
		year: 4,
		term: 'First Semester',
		courses: [
			c('GEED 007', 'Science, Technology and Society/Agham, Teknolohiya, at Lipunan', 3, 0, 3, 3),
			c('COMP 023', 'Social and Professional Issues in Computing', 3, 0, 3, 3),
			c('INTE 401', 'Information Assurance and Security 2', 3, 0, 3, 3, 'INTE 302'),
			c('INTE 402', 'Capstone Project 2', 3, 0, 3, 3, 'INTE 303'),
			c('INTE 403', 'Systems Administration and Maintenance', 2, 3, 3, 5, 'INTE 301'),
			c('ELEC IT-E4', 'IT Elective 4', 2, 3, 3, 5)
		]
	},
	{
		year: 4,
		term: 'Second Semester',
		courses: [
			c(
				'INTE 404',
				'Practicum (500 Hours)',
				6,
				0,
				6,
				6,
				'INTE 303',
				'INTE 302',
				'COMP 019',
				'COMP 008'
			),
			c('COMP 024', 'Technopreneurship', 3, 0, 3, 3, 'HRMA 001')
		]
	}
];

/** Four elective tracks from the draft's graphic. */
export const electiveTracks = [
	{
		key: 'isd',
		title: 'Information Systems Development',
		desc: 'Developing and implementing information systems and software solutions.'
	},
	{
		key: 'cyber',
		title: 'Cybersecurity',
		desc: 'Information security, system protection and addressing cybersecurity threats.'
	},
	{
		key: 'data',
		title: 'Data Science',
		desc: 'Data analysis, data-driven solutions and emerging data technologies.'
	},
	{
		key: 'net',
		title: 'Networking',
		desc: 'Computer networks, network administration and IT infrastructure.'
	}
] as const;

/** Additional distinctions not already represented by the team photo features. */
export const competitionHonors = [
	{
		place: 'Champion',
		event: 'Zero Vector Philippines Hackathon',
		title: 'Zero Vector',
		detail: 'Philippines Hackathon'
	},
	{
		place: 'Top 12',
		event: 'OGIS IGNITE PH Hackathon 2026',
		title: 'OGIS IGNITE',
		detail: 'PH Hackathon · 2026'
	}
];

/** BSIT results from the PUP Online Graduate Tracer Study 2022 (Tables 1–4.2). */
export const tracerStudy = {
	reportUrl: 'https://drive.google.com/file/d/1uq0OCiW0IKn8q6E4gpmnbcnq0yWBnOVP/view',
	graduates: 199,
	respondents: 83,
	hiredWithin: [
		{ months: 12, count: 78 },
		{ months: 24, count: 81 }
	],
	currentlyEmployed: 79,
	currentJobAligned: 68
};

export const alumniCertificates = [
	{
		src: `${AREA2}/alumni-cert-1.jpg`,
		alt: 'ISO/IEC 27701:2025 Lead Auditor certificate of competency'
	},
	{
		src: `${AREA2}/alumni-cert-2.jpg`,
		alt: 'IIBA Certified Business Analysis Professional certificate'
	},
	{ src: `${AREA2}/alumni-cert-3.jpg`, alt: 'EC-Council Certified Incident Handler certificate' },
	{ src: `${AREA2}/alumni-cert-4.jpg`, alt: 'Certified SAFe 6 Practitioner certificate' }
];
