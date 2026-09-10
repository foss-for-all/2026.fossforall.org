import grafanaLogo from '../../assets/sponsor-logos/grafana.svg';
import stadiaMapsLogo from '../../assets/sponsor-logos/stadia-maps.svg';
import type { SponsorContent } from './types';

export const en: SponsorContent = {
	title: 'Our Sponsors',
	kicker: 'Sponsors',
	description: 'Meet the sponsors of FOSS for All Conference 2026.',
	intro: 'The organizations helping make FOSS for All Conference possible.',
	viewAll: 'View all sponsors',
	empty: 'Sponsors will be announced soon.',
	levels: {
		gold: 'Gold',
		silver: 'Silver',
		bronze: 'Bronze',
	},
	dialog: {
		website: 'Visit sponsor website',
		close: 'Close',
	},
	sponsors: [
		{
			name: 'Grafana Labs',
			level: 'silver',
			logo: grafanaLogo,
			description:
				"Grafana Labs delivers the open observability cloud, helping builders everywhere turn signals into action. We were founded on the principles of open source, open standards, open ecosystems, and open culture. Grafana Cloud, our fully managed observability platform, is flexible and built for scale, helping organizations run their software better, accelerate innovation, and move at the speed of their ambitions. We're also the team behind some of the world's most popular open source projects, including Grafana for dashboards and data visualization, and our horizontally scalable databases: Loki for logs, Mimir for metrics, and Tempo for traces.",
			website: 'https://grafana.com/',
    },
    {
      name: 'Stadia Maps',
      level: 'bronze',
      logo: stadiaMapsLogo,
      description: 'Stadia Maps offers location APIs for humans. Thousands of companies of all sizes use Stadia Maps to contextualize their data on a map, solve logistics problems, build fitness experiences, and more. We back our customers up with no-surprise billing, world-class reliability, strong privacy guarantees, and real human support.',
      website: 'https://stadiamaps.com/',
    }
	],
};
