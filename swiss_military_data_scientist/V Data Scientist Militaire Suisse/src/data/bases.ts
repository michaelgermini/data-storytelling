export interface BaseInfo {
	id: string;
	name: string;
	canton: string;
	position: [number, number, number];
	summary: string;
	metrics: { label: string; value: string | number }[];
	skills: string[];
	experiences: string[];
}

export const bases: BaseInfo[] = [
	{
		id: 'payerne',
		name: 'Base aérienne de Payerne',
		canton: 'Vaud',
		position: [-0.6, 0.13, -0.12],
		summary: 'Analyses de performance des opérations aériennes et optimisation des fenêtres de maintenance.',
		metrics: [
			{ label: 'Réduction délais log', value: '18%' },
			{ label: 'Taux dispo flotte', value: '92%' }
		],
		skills: ['Python', 'Pandas', 'Simulation', 'Optimisation'],
		experiences: [
			'Modèles de prévision de pannes (XGBoost)',
			'Simulation des sorties aérodromes sous contrainte météo'
		]
	},
	{
		id: 'thun',
		name: 'Place d’armes de Thoune',
		canton: 'Berne',
		position: [0.2, 0.13, -0.02],
		summary: 'Planification logistique et visualisation 3D des mouvements de troupes.',
		metrics: [
			{ label: 'Optimisation itinéraires', value: '12%' },
			{ label: 'Temps de transit', value: '-9%' }
		],
		skills: ['R', 'dplyr', 'GIS', 'Routage'],
		experiences: [
			'Cartographie dynamique des flux (Leaflet/Three.js)',
			'Analyse multi-critères des contraintes terrain'
		]
	},
	{
		id: 'andermatt',
		name: 'Secteur Andermatt',
		canton: 'Uri',
		position: [0.8, 0.13, 0.18],
		summary: 'Études tactiques en terrain alpin et évaluation des risques naturels.',
		metrics: [
			{ label: 'Couverture capteurs', value: '86%' },
			{ label: 'Risque avalanche', value: 'Modéré' }
		],
		skills: ['Python', 'PyTorch', 'Computer Vision', 'Détection'],
		experiences: [
			'Détection d’avalanches sur imagerie (CNN)',
			'Modélisation de lignes de vue 3D'
		]
	}
];


