import grafanaLogo from '../../assets/sponsor-logos/grafana.svg';
import stadiaMapsLogo from '../../assets/sponsor-logos/stadia-maps.svg';
import tangledLogo from '../../assets/sponsor-logos/tangled.svg';
import rockyLinuxLogo from '../../assets/sponsor-logos/rockylinux.png';
import openUpLogo from '../../assets/sponsor-logos/nipa.svg';
import awsLogo from '../../assets/sponsor-logos/aws.png';
import ab180Logo from '../../assets/sponsor-logos/ab180.svg';

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
		government: 'Government Partner',
		venue: 'Venue Partner'
	},
	dialog: {
		website: 'Visit sponsor website',
		close: 'Close',
	},
	sponsors: [
		{
			name: 'Rocky Linux',
			level: 'gold',
			logo: rockyLinuxLogo,
			description:
				"Rocky Linux is an open-source enterprise operating system designed to be 100% bug-for-bug compatible with Red Hat Enterprise Linux®.",
			website: 'https://rockylinux.org',
		},
		{
			name: 'AB180',
			level: 'gold',
			logo: ab180Logo,
			description: "AB180(에이비일팔공)은 모바일 앱과 웹의 사용자 데이터·마케팅 성과를 분석해 최적화할 수 있도록 돕는 디지털 마케팅 솔루션 전문 기업입니다."
			website: 'https://www.ab180.co',
		},
		{
			name: 'Grafana Labs',
			level: 'silver',
			logo: grafanaLogo,
			description:
				"Grafana Labs delivers the open observability cloud, helping builders everywhere turn signals into action. We were founded on the principles of open source, open standards, open ecosystems, and open culture. Grafana Cloud, our fully managed observability platform, is flexible and built for scale, helping organizations run their software better, accelerate innovation, and move at the speed of their ambitions. We're also the team behind some of the world's most popular open source projects, including Grafana for dashboards and data visualization, and our horizontally scalable databases: Loki for logs, Mimir for metrics, and Tempo for traces.",
			website: 'https://grafana.com/',
		},
		{
			name: 'Tangled',
			level: 'silver',
			logo: tangledLogo,
			description:
				"Tangled is a federated git collaboration platform built on the AT Protocol. You can run your own infrastructure and still be discoverable: your identity and your projects aren't tied to any one server. Review happens in stacks rather than one large diff, and a vouch network handles the bots so maintainers don't have to. Open source in its entirety, on an open protocol.",
			website: 'https://tangled.org/',
		},
		{
			name: 'Stadia Maps',
			level: 'bronze',
			logo: stadiaMapsLogo,
			description: 'Stadia Maps offers location APIs for humans. Thousands of companies of all sizes use Stadia Maps to contextualize their data on a map, solve logistics problems, build fitness experiences, and more. We back our customers up with no-surprise billing, world-class reliability, strong privacy guarantees, and real human support.',
			website: 'https://stadiamaps.com/',
		},
		{
			name: 'OpenUP (NIPA)',
			level: 'government',
			logo: openUpLogo,
			description: 'OpenUP—an initiative under the National IT Industry Promotion Agency (NIPA)—serves as a hub for promoting open-source software (OSS). It supports developers, companies, and government entities interested in developing, sharing, and utilizing open-source software, fostering a virtuous cycle between demand (from businesses and public institutions) and supply (from developers and companies).',
			website: 'https://oss.kr/',
		},
		{
			name: "AWS Korea",
			level: "venue",
			logo: awsLogo,
			description: "Amazon Web Services (AWS) is the world’s most comprehensive and broadly adopted cloud, offering over 200 fully featured services from data centers globally. Millions of customers—including the fastest-growing startups, largest enterprises, and leading government agencies—use AWS to lower costs, become more agile, and accelerate innovation.",
			website: "https://aws.amazon.com/ko/"
		}
	],
};
