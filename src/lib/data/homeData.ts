import researchImg from '$lib/assets/nav-images/research.jpeg';
import teachingImg from '$lib/assets/nav-images/teaching-learning.jpg';
import communityImg from '$lib/assets/nav-images/community.JPG';
import internationalizationImg from '$lib/assets/nav-images/internationalization.JPG';
import planningImg from '$lib/assets/nav-images/planning.jpeg';
import complianceImg from '$lib/assets/nav-images/compliance.jpeg';

export const sections = [
	{
		id: 'research',
		image: researchImg,
		title: 'Research',
		subtitle: 'Innovating the future.'
	},
	{
		id: 'teaching-learning',
		image: teachingImg,
		title: 'Teaching & Learning',
		subtitle: 'Knowledge into practice.'
	},
	{
		id: 'community',
		image: communityImg,
		title: 'Community',
		subtitle: 'Technology for everyone.'
	},
	{
		id: 'internationalization',
		image: internationalizationImg,
		title: 'Internationalization',
		subtitle: 'Interlinked global minds.'
	},
	{
		id: 'planning',
		image: planningImg,
		title: 'Planning & Quality Assurance',
		subtitle: 'Excellence by design.'
	},
	{
		id: 'compliance',
		image: complianceImg,
		title: 'Compliance',
		subtitle: 'Standards you trust.'
	}
];
