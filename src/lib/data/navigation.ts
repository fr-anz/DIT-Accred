export type NavSubItem = {
	label: string;
	href: string;
};

export type NavItem = {
	href: string;
	label: string;
	subItems?: NavSubItem[];
	description?: string;
};

export const navItems: NavItem[] = [
	{ href: '/', label: 'Home' },
	{
		href: '/research',
		label: 'Research',
		subItems: [
			{ label: 'Policy Framework & Governance Ecosystem', href: '/research#policy' },
			{ label: 'Key Productivity Metrics & Faculty Engagement', href: '/research#productivity' },
			{ label: 'Completed Research Repository', href: '/research#research-repository' },
			{ label: 'Published & Indexed Research Directory', href: '/research#published-research' },
			{
				label: 'Competitive Research Distinctions & International Awards',
				href: '/research#research-awards'
			},
			{ label: 'Strategic Future Research Development Blueprint', href: '/research#rd-blueprint' }
		]
	},
	{
		href: '/teaching-learning',
		label: 'Teaching & Learning',
		subItems: [
			{
				label: 'Program Compliance & Governance Framework',
				href: '/teaching-learning#program-compliance'
			},
			{
				label: 'Curriculum Architecture & Instruction Delivery',
				href: '/teaching-learning#curriculum-architecture'
			},
			{
				label: 'Academic Staff & Faculty Profiles',
				href: '/teaching-learning#staff-faculty-profile'
			},
			{ label: 'Student Outcomes', href: '/teaching-learning#student-outcomes' },
			{
				label: 'Learner & Graduates Quality Assessment',
				href: '/teaching-learning#learner-graduate-qa'
			},
			{
				label: 'External Program Quality Assurance Badges',
				href: '/teaching-learning#external-program-qa'
			}
		]
	},
	{
		href: '/community',
		label: 'Community',
		subItems: [
			{
				label: 'Community Extension Policy & Strategic Agenda',
				href: '/community#community-extension-agenda'
			},
			{
				label: 'Master Registry of Completed & Ongoing Extension Projects',
				href: '/community#registry-of-projects'
			},
			{
				label: 'Deep-Dive Profiles of Featured Extensions',
				href: '/community#profiles-extensions'
			},
			{ label: 'The PUP iVote++ System', href: '/community#vote-system' }
		]
	},
	{
		href: '/internationalization',
		label: 'Internationalization',
		subItems: [
			{
				label: 'Internationalization of Research Engagement',
				href: '/internationalization#research-engagement'
			},
			{
				label: 'Internationalization of the Student Learning Experience',
				href: '/internationalization#internationalization-experience'
			}
		]
	},
	{
		href: '/planning',
		label: 'Planning and Quality Assurance',
		description:
			"The Planning and Quality Assurance Page serves as a dedicated portal highlighting the institution's commitment to international excellence, curricular rigor, and strategic growth."
	},
	{
		href: '/compliance',
		label: 'Compliance',
		subItems: [
			{
				label: 'Quality Assurance & Institutional Accreditations',
				href: '/compliance#qa-accreditations'
			},
			{ label: 'Core Operational Pillars', href: '/compliance#core-pillars' },
			{ label: 'Quality Management Systems (ISO 9001:2015)', href: '/compliance#qms' }
		]
	}
];
