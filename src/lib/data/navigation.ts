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
			{ label: 'Research Development & Policy Framework', href: '/research#policy' },
			{ label: 'Research Productivity & Indexation', href: '/research#productivity' },
			{ label: 'Faculty Research Repository', href: '/research#published-research' }
		]
	},
	{
		href: '/teaching-learning',
		label: 'Teaching & Learning',
		subItems: [
			{ label: 'Program Compliance & Governance', href: '/teaching-learning#program-compliance' },
			{
				label: 'Curriculum Architecture & Instruction Delivery',
				href: '/teaching-learning#curriculum-architecture'
			},
			{
				label: 'Academic Staff & Faculty Profiles',
				href: '/teaching-learning#staff-faculty-profile'
			},
			{ label: 'Student Eco-System', href: '/teaching-learning#student-outcomes' },
			{ label: 'Learning & Graduates Outcome', href: '/teaching-learning#learner-graduate-qa' }
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
			{ label: 'Technical Profiles', href: '/community#technical-profiles' },
			{ label: 'PUP iVote++ System', href: '/community#ivote-showcase' }
		]
	},
	{
		href: '/internationalization',
		label: 'Internationalization',
		subItems: [
			{
				label: 'International Recognition & Quality Assurance',
				href: '/internationalization#recognition'
			},
			{ label: 'WURI Innovation Entries', href: '/internationalization#wuri-innovation' },
			{ label: 'Partner Institutions', href: '/internationalization#partners' },
			{ label: 'Joint Research with UMPSA', href: '/internationalization#joint-research' },
			{
				label: 'International Faculty Engagement',
				href: '/internationalization#faculty-engagement'
			},
			{ label: 'Student Research Abroad', href: '/internationalization#student-research' }
		]
	},
	{
		href: '/planning',
		label: 'Planning and Quality Assurance',
		subItems: [
			{ label: 'Strategic International Benchmarking', href: '/planning#strategic-benchmarking' },
			{ label: 'University Support Functions', href: '/planning#university-support' },
			{ label: 'Department-Level Process', href: '/planning#dept-process' },
			{
				label: 'International Rankings & Institutional Impact',
				href: '/planning#rankings'
			}
		]
	},
	{ href: '/compliance', label: 'Compliance' }
];
