/* Content for the About the Department page (Figma frame 1287:1064). */

export const campusPhotos = [1, 2, 3, 4, 5].map((n) => `/about/strip-${n}.webp`);

export const strategicGoals = [
	{
		title: 'Strengthen Academic Excellence',
		description: 'Continuous curriculum improvement and standard maintenance.'
	},
	{
		title: 'Advance Research and Innovation',
		description: 'Promoting impactful research and capstone commercialization.'
	},
	{
		title: 'Enhance Faculty Excellence',
		description: 'Supporting certifications and professional staff growth.'
	},
	{
		title: 'Expand Outreach Programs',
		description: 'Community programs to improve regional ICT employability.'
	},
	{
		title: 'Foster Student Involvement',
		description: 'Active engagement in academic and tech organizations.'
	},
	{
		title: 'Nurture Strong Relationships',
		description: 'Building global industry partnerships and alumni ties.'
	}
];

export const quickFacts = [
	{
		label: 'Longevity',
		value: '47',
		unit: 'Years',
		description: 'In continuous existence since 1979.'
	},
	{
		label: 'Enrollment',
		value: '2000+',
		description: 'Students enrolled across all year levels.'
	},
	{
		label: 'Human Capital',
		value: '30',
		unit: 'Faculty',
		description: 'Dedicated industry experts and academic PhDs.'
	},
	{
		label: 'Partnerships',
		value: '100+',
		description: 'Industry partnerships established worldwide.'
	},
	{
		label: 'Employability Rate',
		value: '95.31%',
		description: 'Of graduates employed within 12 months.'
	},
	{
		label: 'Engagement',
		value: '10',
		unit: 'Orgs',
		description: 'Student organizations (Academic & Tech).'
	}
].map((fact, i) => ({ ...fact, image: `/about/stat-${i + 1}.webp` }));

export const certifications = ['ISO 9001:2015', 'AACCUP Level IV'];

export const milestones = [
	{
		year: '1969',
		title: 'The Drive Begins',
		description:
			'Philippine College of Commerce era; established strategic linkages with NCC and UP Diliman for mainframe processing time.'
	},
	{
		year: '1977',
		title: 'EDP/CDPM Unit',
		description:
			'Launch of the ladderized Bachelor in Computer Data Processing Management (BCDPM) program.'
	},
	{
		year: '1986',
		title: 'CCMIT Elevation',
		description:
			'Elevated to full college status (CCMIT) by Pres. Prudente; Dr. Carague appointed as the first Dean.'
	},
	{
		year: '1987',
		title: 'BIT Degree Launch',
		description:
			'Introduction of the Mathematics-oriented BIT degree and Post-Baccalaureate Diploma programs.'
	},
	{
		year: '1997 - 1998',
		title: 'Strategic Realignment',
		description:
			'Restructured per CHED MO No. 60; BCDPM transitioned to BSIT, while BIT became BSCS.'
	},
	{
		year: '2000 - 2007',
		title: 'Accreditation Milestones',
		description:
			'AACCUP Level 1 (2000), Level 2 (2003), and Level 2 Resurvey (2007); recognized as CODE-IT center.'
	},
	{
		year: '2009',
		title: 'Infrastructure Modernization',
		description:
			'Strategic transfer of computer laboratories to the 5th floor South Wing for expanded capacity.'
	},
	{
		year: '2012',
		title: 'Transition to CCIS',
		description:
			'Renamed to College of Computer and Information Sciences to emphasize information relevance in the digital age.'
	},
	{
		year: '2021',
		title: 'Excellence Recognized',
		description:
			'Awarded Level IV Accredited Status, affirming commitment to quality and academic excellence.'
	}
];

export const programObjectives = [
	{
		title: 'Professional IT Practice',
		description:
			'Graduates practice their expertise in the field of information technology and successfully engage in their chosen specialization.'
	},
	{
		title: 'Innovation & Ethical Contributions',
		description:
			'Contribute to technological advancements with innovations that solve real-world problems following social and ethical standards.'
	},
	{
		title: 'Career Advancement & Lifelong Growth',
		description:
			'Acquire supervisory positions and/or obtain advanced degrees or certifications to hone skills as well as to serve in professional organizations.'
	}
].map((objective, i) => ({ ...objective, image: `/about/objective-${i + 1}.webp` }));
