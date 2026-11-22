/* Each narrative report pairs with the site section that presents the same area.
   The summaries list what that section covers, taken from its navigation entries. */
export const narrativeReports = [
	{
		title: 'Research',
		href: 'https://bit.ly/ITL4Area1',
		section: '/research',
		summary:
			'Research development and policy, productivity metrics and faculty engagement, and the faculty research repository.'
	},
	{
		title: 'Teaching and Learning',
		href: 'https://bit.ly/ITL4Area2',
		section: '/teaching-learning',
		summary:
			'Program compliance and governance, curriculum and instruction delivery, faculty profiles, and student and graduate outcomes.'
	},
	{
		title: 'Community Service',
		href: 'https://bit.ly/ITL4Area3',
		section: '/community',
		summary:
			'The community extension policy and strategic agenda, technical profiles, and the PUP iVote++ system.'
	},
	{
		title: 'International Linkages',
		href: 'https://bit.ly/ITL4Area4',
		section: '/internationalization',
		summary:
			'International recognition, WURI innovation entries, partner institutions, joint research with UMPSA, and engagement abroad.'
	},
	{
		title: 'Planning and QA',
		href: 'https://bit.ly/ITL4Area5',
		section: '/planning',
		summary:
			'Strategic international benchmarking, university support functions, the department-level process, and rankings.'
	}
] as const;

export const complianceReports = [
	{ title: 'Vision, Mission, Goals, and Objectives', href: 'https://bit.ly/itc-area1' },
	{ title: 'Faculty', href: 'https://bit.ly/itc-area2' },
	{ title: 'Curriculum and Instruction', href: 'https://bit.ly/itc-area3' },
	{ title: 'Support to Students', href: 'https://bit.ly/itc-area4' },
	{ title: 'Research', href: 'https://bit.ly/itc-area5' },
	{ title: 'Extension and Community Involvement', href: 'https://bit.ly/itc-area6' },
	{ title: 'Library', href: 'https://bit.ly/itc-area7v2' },
	{ title: 'Physical Plant and Facilities', href: 'https://bit.ly/itc-area8' },
	{ title: 'Laboratories', href: 'https://bit.ly/itc-area9' },
	{ title: 'Administration', href: 'https://bit.ly/itc-area10' }
];
