import {
	Award,
	BookCopy,
	FilePenLine,
	Globe,
	Landmark,
	Leaf,
	Medal,
	Microscope,
	Network,
	Server,
	ShieldCheck,
	TrendingUp,
	Trophy
} from '@lucide/svelte';
import type { Component } from 'svelte';

/* Content follows the Planning and QA Update Guide (Nov 2026). Ranking figures
   stay in the Rankings section; initiative 09 only points there. */

export type Initiative = {
	no: string;
	title: string;
	description: string;
	icon: Component;
	link?: { label: string } & ({ anchor: string } | { url: string });
};

export const qaInitiatives: Initiative[] = [
	{
		no: '01',
		title: 'Restructuring of the Quality Assurance Center',
		description:
			'Clearer QA roles and reporting lines from the University down to each department.',
		icon: Network
	},
	{
		no: '02',
		title: 'Program Accreditation',
		description: 'BSIT holds AACCUP Level IV status, with the application on-going.',
		icon: BookCopy,
		link: { anchor: 'strategic-benchmarking', label: 'See AACCUP status' }
	},
	{
		no: '03',
		title: 'Outcomes-Based Education and Continuous Quality Improvement',
		description: 'Program outcomes are measured and fed back into teaching through the PDCA cycle.',
		icon: TrendingUp,
		link: { anchor: 'pdca', label: 'See the PDCA cycle' }
	},
	{
		no: '04',
		title: 'Curriculum Planning and Development',
		description:
			'The BSIT curriculum and syllabi are reviewed against CHED policies and industry needs.',
		icon: FilePenLine,
		link: { anchor: 'dept-process', label: 'See the department process' }
	},
	{
		no: '05',
		title: 'AACCUP Institutional Accreditation',
		description:
			'University-wide accreditation, separate from and supported by program-level accreditation.',
		icon: Landmark
	},
	{
		no: '06',
		title: 'CHED Institutional Sustainability Assessment',
		description: "CHED's assessment of the University's capacity to sustain quality.",
		icon: Leaf
	},
	{
		no: '07',
		title: 'Institutional Accreditation and Sustainability',
		description: 'Keeping accreditation gains in place across cycles.',
		icon: Award
	},
	{
		no: '08',
		title: 'International Program Accreditation',
		description: 'Learning outcomes aligned with ASEAN standards.',
		icon: Globe,
		link: { anchor: 'aun-qa', label: 'See AUN-QA alignment' }
	},
	{
		no: '09',
		title: 'International Ranking and Rating',
		description: 'QS Stars, WURI and THE Impact Rankings.',
		icon: Medal,
		link: { anchor: 'rankings', label: 'See verified rankings' }
	},
	{
		no: '10',
		title: 'ISO Certification',
		description:
			'ISO 9001:2015 and ISO 21001:2018 quality management systems, certified across all PUP campuses.',
		icon: ShieldCheck
	},
	{
		no: '11',
		title: 'Philippine Quality Award',
		description:
			'PUP was recognized at the 27th Philippine Quality Awards, the only awardee among NCR state universities and colleges.',
		icon: Trophy,
		link: {
			url: 'https://www.pup.edu.ph/news/?go=oOL21UwIdYg%3D',
			label: "Read PUP's article"
		}
	}
];

export const implementationCycle = [
	{ year: 2025, phase: 'Establish and initiate' },
	{
		year: 2026,
		phase: 'Implement and assess',
		milestone: 'AACCUP Level IV Cycle II accreditation visit, November 2026'
	},
	{ year: 2027, phase: 'Expand and strengthen' },
	{ year: 2028, phase: 'Consolidate and sustain' }
];

export type DevelopmentPlan = { unit: string; name: string; level: string; url: string };

/* A plan without a url renders as an inert button until its link is filled in. */
export const developmentPlans: DevelopmentPlan[] = [
	{
		unit: 'DIT',
		name: 'DIT Development Plan',
		level: 'Department',
		url: 'https://drive.google.com/file/d/1Mw99kuVGl7rVMF7pmUu00s9Co5wv2QJb/view?usp=sharing'
	}
];

/* A document image opened in the evidence preview. */
export type EvidenceDoc = { src: string; alt: string; caption: string };

export type PdcaStage = {
	id: 'plan' | 'do' | 'check' | 'act';
	name: string;
	question: string;
	actions: string[];
	/* `seal` is an optional logo crop shown in the round badge; the badge previews `src`. */
	evidence?: (EvidenceDoc & { seal?: string })[];
	plans?: DevelopmentPlan[];
};

export const pdcaStages: PdcaStage[] = [
	{
		id: 'plan',
		name: 'Plan',
		question: 'What will we achieve, and how?',
		actions: [
			"Set targets from the University's strategic priorities",
			'Revise the curriculum per CHED memoranda',
			'Prepare and update syllabi',
			'Set department targets in the DIT Development Plan'
		]
	},
	{
		id: 'do',
		name: 'Do',
		question: 'Carry out the plan.',
		actions: [
			'Deliver outcomes-based instruction',
			'Run internships with industry partners under MOAs',
			'Conduct research and extension projects',
			'Pursue international partnerships and mobility'
		],
		plans: developmentPlans
	},
	{
		id: 'check',
		name: 'Check',
		question: 'Did we meet our targets?',
		actions: [
			'Measure results against the College and DIT development plans',
			'Hold mid-year and year-end assessments',
			'Undergo internal audits and accreditation visits',
			'Gather student and stakeholder feedback'
		],
		evidence: [
			{
				src: '/planning/evidence/tuv-iso-9001-certificate.webp',
				alt: 'TÜV SÜD PSB Philippines ISO 9001:2015 certificate for the Polytechnic University of the Philippines, valid until 2028-12-25',
				caption: 'ISO 9001 · TÜV SÜD',
				seal: '/planning/evidence/tuv-iso-9001.webp'
			},
			{
				src: '/planning/evidence/tuv-iso-21001-certificate.webp',
				alt: 'TÜV SÜD PSB Philippines ISO 21001:2018 certificate for the Polytechnic University of the Philippines, valid until 2028-12-25',
				caption: 'ISO 21001 · TÜV SÜD',
				seal: '/planning/evidence/tuv-iso-21001.webp'
			},
			{
				src: '/planning/evidence/picab-accreditation-summary.webp',
				alt: 'PICAB Summary of Accreditation Actions for the PUP Sta. Mesa BSCS and BSIT programs, 2025–2026 cycle',
				caption: 'PICAB summary · 2025–26',
				seal: '/planning/evidence/picab-seal.webp'
			}
		]
	},
	{
		id: 'act',
		name: 'Act',
		question: 'Improve and standardize.',
		actions: [
			'Address accreditor recommendations',
			'Update the curriculum, syllabi and processes',
			'Adjust targets for the next cycle',
			'Adopt what worked as standard practice'
		]
	}
];

export const isoCertifications = [
	{
		standard: '21001',
		year: '2018',
		scope: 'Educational Organization Management System',
		seal: '/planning/evidence/tuv-iso-21001.webp',
		certificate: '/planning/evidence/tuv-iso-21001-certificate.webp'
	},
	{
		standard: '9001',
		year: '2015',
		scope: 'Quality Management System',
		seal: '/planning/evidence/tuv-iso-9001.webp',
		certificate: '/planning/evidence/tuv-iso-9001-certificate.webp'
	}
];

/* University Support Functions: the three priorities map to the three slabs of
   the PUP pylon, left to right. */
export const strategicPriorities = [
	'Academic Program Development & Internationalization',
	'Human Resource Development',
	'Institutional-Level Quality Assurance'
];

export const coreFunctions = [
	'Higher Education Programs',
	'Research Programs',
	'Extension & Tech Advisory',
	'Customer Satisfaction'
];

export type SupportService = {
	title: string;
	description: string;
	icon: Component;
};

export const supportServices: SupportService[] = [
	{
		title: 'Quality Assurance',
		description: 'Training via QAC and UTLDO for syllabi development and accreditation monitoring.',
		icon: ShieldCheck
	},
	{
		title: 'Research & Faculty',
		description:
			'Incentives for research presentation and faculty development grants (FSD PHP 20,000).',
		icon: Microscope
	},
	{
		title: 'Infrastructure',
		description: 'PUP SINTA and Document Tracking System (DTS) for efficient request management.',
		icon: Server
	}
];

export const narrativeReportUrl = 'https://bit.ly/ITL4Area5';
