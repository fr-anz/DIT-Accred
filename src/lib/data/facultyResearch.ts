type ResearchRecord = {
	year: number;
	title: string;
	status?: string;
	publication?: { journal: string; year: number; url: string };
};

type FacultyResearcher = {
	name: string;
	image?: { src: string; focusX: string; focusY: string };
	records: ResearchRecord[];
};

const presentedAndPublished = 'Presented and published';

export const facultyResearch: FacultyResearcher[] = [
	{
		name: 'Ma. Leonila Amata',
		image: { src: '/research/faculty/amata.webp', focusX: '59%', focusY: '25%' },
		records: [
			{
				year: 2024,
				title:
					'Enhancing Student Outcomes: A Dual Methodology Using Naive Bayesian and Rule-Based Models',
				status: 'Published'
			}
		]
	},
	{
		name: 'Benilda Eleonor V. Comendador',
		image: { src: '/research/faculty/comendador.webp', focusX: '60%', focusY: '30%' },
		records: [
			{
				year: 2022,
				title: 'Student Physical Violence Detection Using Convolutional Neural Networks',
				status: 'Published'
			},
			{
				year: 2025,
				title:
					'QUEENAPP: A Decision-Support Production Scheduling System Toward Improved Pineapple Farming',
				status: 'Published'
			}
		]
	},
	{
		name: 'Illuminada Vivien R. Domingo',
		image: { src: '/research/faculty/domingo.webp', focusX: '59%', focusY: '25%' },
		records: [
			{
				year: 2020,
				title: 'Hearty: A Mobile Expert System for Diagnosing the Risk of Cardiovascular Diseases',
				status: 'Published'
			},
			{
				year: 2021,
				title:
					'FILENG: An Automatic English Subtitle Generator from Filipino Video Clips Using Hidden Markov Model',
				status: presentedAndPublished
			},
			{
				year: 2022,
				title:
					'iGYM: Implementation of Image Recognition Using Silhouette Extraction and Artificial Neural Network as Gym Instructor',
				status: presentedAndPublished
			},
			{
				year: 2023,
				title:
					'Real-Time Hand Gesture Recognition for Individuals with Aphasia Using Artificial Neural Network',
				status: presentedAndPublished
			},
			{
				year: 2023,
				title:
					'Aralin Baybayin: Intelligent Tutoring System for Baybayin Scripts with Character Recognition',
				status: presentedAndPublished
			},
			{
				year: 2024,
				title: 'Nude Content Detection on Video Using Haar Cascade Classifier',
				status: presentedAndPublished
			},
			{
				year: 2025,
				title:
					'Enhancing Swine Farm Profitability with PINILI-PIG: A Digital Swine Inventory and Sales Management System',
				status: presentedAndPublished
			},
			{ year: 2026, title: 'Engaging Mind: Interactive Teaching and Learning in Digital Age' }
		]
	},
	{
		name: 'Juancho Espineli',
		image: { src: '/research/faculty/espineli.webp', focusX: '55%', focusY: '26%' },
		records: [
			{
				year: 2020,
				title:
					'Classification and Detection of Nutritional Deficiencies in Coffee Plants Using Image Processing and Convolutional Neural Network (CNN)',
				status: 'Published'
			},
			{
				year: 2021,
				title: 'Internet of Things (IoT) Based Plant Monitoring Using Machine Learning',
				status: 'Published'
			},
			{
				year: 2024,
				title:
					'Capsure: A Novel Application of CNNs, OpenAI’s Language Model, and Google Text-to-Speech for Reliable Drug Recognition in the Philippines',
				status: 'Published'
			}
		]
	},
	{
		name: 'Jonnifer Mandigma',
		records: [
			{
				year: 2024,
				title: 'Credit Assessment and Recommendation (CARS) Using Naive Bayesian Algorithm',
				status: presentedAndPublished
			},
			{
				year: 2024,
				title:
					'Enhancing Student Outcomes: A Dual Methodology Using Naive Bayesian and Rule-Based Models',
				status: presentedAndPublished
			},
			{
				year: 2026,
				title:
					'iSCOUT: Scouting Mobile Application Using Rule-Based Algorithm to Evaluate the Activities of Boy Scouts of the Philippines',
				status: presentedAndPublished
			}
		]
	},
	{
		name: 'Jayson James M. Mayor',
		image: { src: '/research/faculty/mayor.webp', focusX: '65%', focusY: '24%' },
		records: [
			{
				year: 2021,
				title: 'EC Health Medical Clinic and Diagnostic Center Appointment System',
				status: presentedAndPublished
			},
			{
				year: 2025,
				title: 'A TF-IDF-LDA Approach for Training Recommender System Based on Faculty Interests',
				status: presentedAndPublished
			},
			{
				year: 2026,
				title: 'A TF-IDF-LDA Approach for Training Recommender System Based on Faculty Interests',
				status: 'Scopus indexed'
			}
		]
	},
	{
		name: 'Rachel A. Nayre',
		image: { src: '/research/faculty/nayre.webp', focusX: '62%', focusY: '27%' },
		records: [
			{
				year: 2023,
				title:
					'Real-Time Hand Gesture Recognition for Individuals with Aphasia Using Artificial Neural Network',
				status: 'Published'
			},
			{
				year: 2025,
				title:
					'Revisiting Polytechnic University of the Philippines – Sta. Mesa: An Augmented Reality Journey through Architectural Heritage and Genius Loci',
				status: 'Published'
			}
		]
	},
	{
		name: 'Janelle Kyra A. Sagum',
		image: { src: '/research/faculty/sagum.webp', focusX: '57%', focusY: '28%' },
		records: [
			{
				year: 2021,
				title: 'Web-Based Document Management System for PEP Squad Events and Marketing Services',
				status: 'Presented'
			},
			{
				year: 2023,
				title: 'Automated Filipino Language Treebank Generator',
				status: 'Published'
			},
			{
				year: 2024,
				title: 'Parallel Ensemble Approach for Named Entity Recognition in Filipino Text',
				status: 'Accepted'
			},
			{
				year: 2025,
				title: 'Integrating BERT Model for Document Classification in Document Management System',
				status: 'Published'
			},
			{
				year: 2025,
				title: 'Parallel Ensemble Approach for Named Entity Recognition in Filipino Text',
				status: 'Published'
			}
		]
	},
	{
		name: 'John Dustin D. Santos',
		image: { src: '/research/faculty/santos.webp', focusX: '66%', focusY: '27%' },
		records: [
			{
				year: 2020,
				title: 'PUP Herbarium Management Information System PSUCCESS',
				status: 'Presented'
			},
			{
				year: 2023,
				title:
					'Utilization of Convolutional Neural Networks on Coin Grading for BSP Series One Peso Coins',
				status: presentedAndPublished,
				publication: {
					journal: 'Technologique',
					year: 2024,
					url: 'https://doi.org/10.62718/vmca.tech-gjtdsi.2.1.SC-0624-027'
				}
			}
		]
	},
	{
		name: 'Mariel Leo T. Violeta',
		image: { src: '/research/faculty/violeta.webp', focusX: '68%', focusY: '28%' },
		records: [
			{
				year: 2024,
				title:
					'FloodWatcher: Forecasting Marikina River Level Using Generative Pre-Trained Transformer with Kernel PCA',
				status: 'Published'
			},
			{
				year: 2026,
				title:
					'Blockchain-Based Academic Credential Issuance and Verification Using Hyperledger Fabric in Higher Education Institutions',
				status: 'Presented'
			}
		]
	}
];

// The source reports annual totals separately from its per-faculty entries.
export const facultyResearchByYear = [
	{ year: 2020, presentations: 1, publications: 2 },
	{ year: 2021, presentations: 3, publications: 3 },
	{ year: 2022, presentations: 1, publications: 2 },
	{ year: 2023, presentations: 2, publications: 4 },
	{ year: 2024, presentations: 3, publications: 6 },
	{ year: 2025, presentations: 2, publications: 5 },
	{ year: 2026, presentations: 2, publications: 1 }
];
