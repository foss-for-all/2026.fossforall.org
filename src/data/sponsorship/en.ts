import type { SponsorshipContent } from './types';

export const en: SponsorshipContent = {
	title: 'Become a Sponsor',
	description: 'FOSS for All Conference 2026 sponsorship prospectus',

	hero: {
		kicker: 'Sponsorship Prospectus',
		heading: 'FOSS for All Conference 2026',
		slogan: 'Your Gateway to Open Source',
		lead: 'Free and Open Source Software for All. A non-profit conference where projects and communities from Korea and abroad meet in one place.',
		facts: [
			{ label: 'Date', value: '28 Nov 2026 (Sat)' },
			{ label: 'Venue', value: 'Centerfield EAST, Seoul' },
			{ label: 'Scale', value: 'About 200 attendees' },
			{ label: 'Organizer', value: 'FOSS for All' },
		],
		prospectus: 'Download the PDF',
		register: 'Sponsor registration',
	},

	why: {
		num: '01',
		title: 'Why sponsor',
		lead: 'Sponsorship is more than just a donation. It is a direct investment in the open source ecosystem your own software already uses, and a chance to meet a clearly defined audience of working IT professionals.',
		reasons: [
			{
				icon: 'audience',
				title: 'A targeted audience',
				body: 'Most attendees work in the IT industry. You are not talking to a general crowd but to people who understand your product and the technology behind it.',
			},
			{
				icon: 'promotion',
				title: 'Product and service promotion',
				body: 'Meet potential and existing customers face to face, introduce what you build, and get honest feedback on the spot.',
			},
			{
				icon: 'talent',
				title: 'Talent acquisition',
				body: 'Developers who spend their own time on open source are hard to reach through ordinary hiring channels.',
			},
			{
				icon: 'leadership',
				title: 'Technical leadership',
				body: 'Share your open source strategy, your contributions, and your engineering culture with the community directly.',
			},
			{
				icon: 'branding',
				title: 'Brand visibility',
				body: 'Sponsor logos are displayed on banners, the website, attendee badges and break videos, and in media partner coverage.',
			},
			{
				icon: 'ecosystem',
				title: 'Real support for the ecosystem',
				body: 'Nearly all software that companies ship today uses open source. Sponsoring is the most direct way to help keep that foundation healthy.',
			},
			{
				icon: 'esg',
				title: 'An ESG contribution',
				body: 'Creating social value, supporting IT education, and developing the industry ecosystem map directly onto the ESG criteria global companies report against.',
			},
			{
				icon: 'transparency',
				title: 'Transparent spending',
				body: 'FOSS for All is a registered non-profit in Korea and publishes its financial statements continuously. You can check where your money went at any time.',
			},
		],
	},

	record: {
		num: '02',
		title: 'The 2025 edition',
		lead: 'The first FOSS for All Conference was held on 8 November 2025 at Kwangwoon University in Seoul. Four tracks and 29 talks in a single day, with 13 sponsors and 8 open source communities taking part.',
		stats: [
			{ value: '196', label: 'attendees' },
			{ value: '4', label: 'tracks' },
			{ value: '29', label: 'talks' },
			{ value: '13', label: 'sponsors' },
			{ value: '8', label: 'community booths' },
		],
		caption: 'At FOSS for All Conference 2025',
	},

	audience: {
		num: '03',
		title: 'Who attends',
		lead: 'Based on 200 registrations for the 2025 edition.',
		stats: [
			{ value: '58%', label: 'in engineering roles' },
			{ value: '68%', label: 'from companies' },
			{ value: '196', label: 'attendees in 2025' },
			{ value: '200', label: 'registrations' },
		],
		jobsTitle: 'Job function',
		jobs: [
			{ label: 'Engineering', value: 58 },
			{ label: 'Non-engineering roles', value: 14 },
			{ label: 'Infrastructure and security', value: 12 },
			{ label: 'Students', value: 11 },
			{ label: 'Data and AI', value: 5 },
		],
		affiliationTitle: 'Affiliation',
		affiliation: [
			{ label: 'Companies', value: 68 },
			{ label: 'Academia', value: 14 },
			{ label: 'Communities and projects', value: 10 },
			{ label: 'Independent', value: 7 },
		],
		note: 'Basis: 200 registrations from the 2025 edition. Job functions are based on free-text answers over the 186 records that could be classified (14 excluded); affiliation covers all 200.',
		channelsKicker: 'Online channels · as of 3 August 2026',
		channelsTotal: { value: '695', label: 'total social media followers' },
		channels: [
			{ name: 'LinkedIn', value: '224' },
			{ name: 'Discord', value: '207' },
			{ name: 'Facebook', value: '58' },
			{ name: 'X', value: '51' },
			{ name: 'Mastodon', value: '49' },
			{ name: 'GitHub', value: '37' },
			{ name: 'Instagram', value: '34' },
			{ name: 'KakaoTalk', value: '19' },
			{ name: 'YouTube', value: '16' },
		],
	},

	packages: {
		num: '04',
		title: 'Sponsorship packages',
		lead: 'Three tiers. Gold and Silver are limited in number.',
		tiers: [
			{ name: 'Gold', price: 'USD 1,400', priceSub: 'KRW 2,000,000', slots: '2 slots', accent: '#C8A24A' },
			{ name: 'Silver', price: 'USD 700', priceSub: 'KRW 1,000,000', slots: '5 slots', accent: '#9AA3AF' },
			{ name: 'Bronze', price: 'USD 350', priceSub: 'KRW 500,000', slots: 'unlimited', accent: '#B07A46' },
		],
		matrix: [
			{ type: 'group', label: 'Logo exposure' },
			{ type: 'item', label: 'Banner logo', values: ['Large', 'Medium', 'Small'] },
			{ type: 'item', label: 'Website logo', values: ['Large', 'Medium', 'Small'] },
			{ type: 'item', label: 'Attendee badge logo', values: [true, false, false] },
			{ type: 'group', label: 'Interaction' },
			{ type: 'item', label: 'Table booth', values: ['optional', 'optional', false] },
			{ type: 'item', label: 'Sponsor session', values: ['add-on', 'add-on', false] },
			{ type: 'item', label: 'Tickets', values: ['5', '3', '1'] },
			{ type: 'group', label: 'Marketing' },
			{ type: 'item', label: 'Social media promotion', values: [true, true, true] },
			{ type: 'item', label: 'Break video', values: [true, false, false] },
			{ type: 'item', label: 'Attendee data', values: ['email, name, affiliation, role', 'email', false] },
			{ type: 'group', label: 'Common' },
			{ type: 'item', label: 'Certificate of appreciation', values: [true, true, true] },
		],
		pricingTitle: 'Pricing',
		pricing: [
			'KRW amounts exclude 10% VAT.',
			'Foreign corporations without a place of business in Korea are invoiced in USD and zero-rated for VAT: nothing is added to the USD figure.',
		],
		availabilityTitle: 'Availability',
		availability: [
			'Gold is limited to 2 slots and Silver to 5. Bronze has no limit.',
			'Booths and sessions are limited and assigned in order of confirmation.',
			'To move up a tier or adjust a package, talk to the sponsorship team.',
		],
		callout: 'Support not on this table is welcome. Write to sponsors@fossforall.org before applying.',
	},

	addons: {
		num: '05',
		title: 'Add-ons and single items',
		lead: 'Beyond the tiers, you can add a sponsor session, buy a table booth on its own, or sponsor in kind.',
		session: {
			title: 'Sponsor session add-on',
			meta: 'Gold and Silver sponsors / 3 slots / 30 minutes',
			price: 'USD 700',
			priceSub: 'KRW 1,000,000',
			body: 'A 30-minute slot in the regular talk schedule. A good opportunity to present your experience with open source technology, a project your team maintains, or how your engineering organization works.',
			bullets: [
				'Proposal first, payment second. Submit a talk proposal, the program team reviews it, and you buy the add-on once it is accepted.',
				'Talks must be about open source and follow the <a href="/en/coc/">code of conduct</a>. Heavy product pitching is not allowed.',
				'Slots are assigned in order of acceptance, and room size follows that order. Keynotes are not available.',
				'Sponsor sessions are labelled as such on the website and in the program book.',
				'The proposal deadline will be announced once it is agreed with the program team.',
			],
		},
		booth: {
			title: 'Booth only',
			meta: 'Limited / first come, first served',
			price: 'USD 350',
			body: 'For those who want a booth without a tier package. Applications are open throughout, and booths are assigned in order one to two months before the event, once the number available is settled with the venue.',
		},
		inKind: {
			title: 'In-kind sponsorship',
			meta: 'Converted to a tier after review',
			body: 'You can sponsor goods and services the event needs. Send your proposal to the sponsorship team and, after review, we grant the benefits of the tier matching its cash value.',
		},
		examplesTitle: 'In-kind examples',
		examples:
			'Lunch and catering · coffee truck · swag · books · recording, audio and networking gear · venue WiFi · live interpretation and captions · tool licences for the organising team',
		caption: 'Sponsor booths at the 2025 edition',
	},

	benefits: {
		num: '06',
		title: 'Benefits in detail',
		groups: [
			{
				title: 'Logo exposure',
				items: [
					{ term: 'Banners', body: 'Sponsor logos are displayed, sized by tier, on banners at the venue entrance and in each session room.' },
					{ term: 'Website', body: 'Your logo, a short description, and a link go in the sponsor section of the conference website.' },
					{ term: 'Attendee badge', body: 'Gold sponsor logos are printed on the badge every attendee wears all day.' },
				],
			},
			{
				title: 'Interaction',
				items: [
					{
						term: 'Table booth',
						body: 'Gold and Silver sponsors may take a table booth, talk to attendees directly, and run their own booth events or mini sessions. Booths are limited and assigned in the order sponsorships are confirmed.',
					},
					{ term: 'Sponsor session', body: 'Available as an add-on. See the previous section.' },
					{ term: 'Tickets', body: 'Tickets are provided according to tier so your team can attend and meet attendees in person.' },
				],
			},
			{
				title: 'Marketing',
				items: [
					{ term: 'Social media', body: 'A sponsor introduction post goes out on the FOSS for All social media channels.' },
					{ term: 'Break video', body: 'Gold sponsors may supply a video to be played between sessions.' },
					{
						term: 'Attendee data',
						body: 'Attendee data is provided so you can follow up with attendees after the event. Gold sponsors receive email address, name, affiliation, and role; Silver sponsors receive email addresses.',
					},
				],
			},
			{
				title: 'Common',
				items: [{ term: 'Certificate of appreciation', body: 'A certificate commemorating your sponsorship of the conference.' }],
			},
		],
		callout: {
			term: 'Conditions on attendee data',
			body: 'Only data from attendees who consented to third-party sharing is provided, and which fields you receive depends on the tier. Use and retention follow the conference privacy policy, and you must tell us in advance the company name and address, contact person, purpose of use, and disposal method after the retention period, so that they can be written into the policy.',
		},
	},

	partners: {
		num: '07',
		title: 'Who was with us',
		lead: 'Thirteen companies and organizations sponsored FOSS for All Conference 2025: open source companies from Korea and abroad, a public agency, a community, and media partners.',
		walls: [
			{
				label: 'Gold',
				logos: [
					{ file: 'couchbase.svg', ar: 4.41, name: 'Couchbase' },
					{ file: 'rockylinux.png', ar: 5.39, name: 'Rocky Linux' },
					{ file: 'tenstorrent.svg', ar: 5.94, name: 'Tenstorrent' },
				],
			},
			{
				label: 'Silver',
				logos: [
					{ file: 'onlyoffice.svg', ar: 5.32, name: 'ONLYOFFICE' },
					{ file: 'opdc.svg', ar: 2.92, name: 'OPDC' },
				],
			},
			{
				label: 'Bronze',
				logos: [
					{ file: 'rainlab.svg', ar: 4.46, name: 'Rainlab' },
					{ file: 'expressvpn.svg', ar: 5.26, name: 'ExpressVPN' },
					{ file: 'DeepComputing.svg', ar: 8.2, name: 'DeepComputing' },
					{ file: 'stadiamaps.svg', ar: 1.27, name: 'Stadia Maps', scale: 0.82 },
				],
			},
			{ label: 'Public Partner', logos: [{ file: 'nipa.svg', ar: 1.39, name: 'NIPA' }] },
			{ label: 'Meeting Space', logos: [{ file: 'modulabs.svg', ar: 2.55, name: 'Modulabs' }] },
			{
				label: 'Media Partner',
				logos: [
					{ file: 'bylinenetwork.png', ar: 6.12, name: 'Byline Network' },
					{ file: 'yozmit.svg', ar: 3.98, name: 'Yozm IT' },
				],
			},
		],
		communitiesTitle: 'Communities',
		communitiesLead: 'Eight open source communities ran booths at the 2025 edition, alongside the sponsor booths.',
		communities: [
			{ file: 'coscup.svg', ar: 2.96, name: 'COSCUP', body: "Taiwan's annual conference, jointly organised by its open source communities." },
			{ file: 'debian.png', ar: 0.76, name: 'Debian', body: 'A free software operating system built by volunteers worldwide.' },
			{
				file: 'osm-korea.svg',
				ar: 1.0,
				name: 'OpenStreetMap Korea',
				body: 'The Korean community of OpenStreetMap, the free map of the world.',
			},
			{
				file: 'ospn.jpg',
				ar: 1.0,
				name: 'OSPN OpenSource People Network Japan',
				body: 'Runs the Open Source Conference across Japan since 2004.',
			},
			{ file: 'videolan.png', ar: 1.0, name: 'VideoLAN', body: 'The non-profit behind VLC, FFmpeg, x264 and dav1d.' },
			{
				file: 'ubuntu-korea.svg',
				ar: 4.7,
				name: 'Ubuntu Korea Community',
				body: 'An official Ubuntu local community recognised by the Ubuntu Community Council.',
			},
			{ file: 'code-for-korea.png', ar: 4.0, name: 'Code for Korea', body: 'A civic hacking community solving social problems with technology.' },
			{
				file: 'ksug.png',
				ar: 3.06,
				name: 'Korea Spring User Group',
				body: 'Founded in 2007, running Spring Camp and study groups for Spring developers.',
			},
		],
		callout:
			'Thank you to every 2025 sponsor. We would be glad to have you with us again in 2026. Returning sponsors get first priority on tier slots, booths and sessions.',
	},

	process: {
		num: '08',
		title: 'How to sponsor',
		timelineTitle: 'Timeline',
		timeline: [
			{ when: 'Early Aug', what: 'Applications open', done: true },
			{ when: 'Sep', what: 'Info session / second round' },
			{ when: 'Late Oct', what: 'Applications close' },
			{ when: 'Oct - Nov', what: 'Promotion, certificates, swag' },
			{ when: '28 Nov', what: 'FOSS for All Conference 2026' },
			{ when: '31 Dec', what: 'Final payment deadline' },
		],
		stepsTitle: 'Registration',
		steps: [
			{
				n: '01',
				title: 'Choose a package and apply',
				body: 'Pick a tier and any add-ons, then submit the sponsor registration form. If slots remain, we proceed with registration. If you want to adjust the package details or sponsor in kind, talk to the sponsorship team before applying.',
			},
			{
				n: '02',
				title: 'Paperwork',
				bullets: [
					{ term: 'Quotation', body: 'Issued on request for your internal approval process.' },
					{ term: 'Contract', body: 'Drafted on request, and skipped if you do not need one.' },
					{
						term: 'Tax invoice or invoice',
						body: 'Issued under the name "FOSS for All" after the contract is signed, or after your internal approval if the contract is skipped. Foreign corporations without a place of business in Korea receive a USD invoice.',
					},
					{ term: 'Statement of account', body: 'Issued separately from the tax invoice on request.' },
				],
			},
			{
				n: '03',
				title: 'Payment',
				body: 'Transfer the sponsorship fee, including VAT where applicable, to the account we provide. Registration is complete once payment is confirmed. The deadline is the date in the contract. Without a contract, it is two weeks from the date of a Korean tax invoice, or net 30 (within 30 days) for a USD invoice. Extensions can be arranged, but payment must be complete by 31 December 2026 at the latest.',
			},
			{
				n: '04',
				title: 'Confirmation and benefits',
				body: 'Once registered, your logo goes up on the website and we guide you through your booth, session, break video, and other benefits. After the event we send a thank you note, the certificate, and the attendee data.',
			},
		],
		callout: 'Applications and questions go to sponsors@fossforall.org.',
	},

	about: {
		num: '09',
		title: 'About FOSS for All',
		lead: 'An initiative for a sustainable free and open source software ecosystem.',
		body: 'FOSS for All is an initiative created so that free and open source projects, communities, companies, contributors, and users, in Korea and elsewhere, can connect with each other and keep going. Projects face more than technical work: accounting, administration, running events, managing sponsorships, and legal review. FOSS for All exists so that a project does not have to found its own legal entity or repeat the same administrative work from scratch.',
		items: [
			{
				term: 'FOSS for All Conference',
				body: 'An annual conference where free and open source communities meet, lesser-known projects get an audience, and participants work through shared problems together.',
			},
			{
				term: 'Fiscal sponsorship',
				body: 'Our mid-term goal is to let communities and projects raise and manage funds transparently without founding a legal entity. We are studying how Open Source Collective in the US and Open Culture Foundation in Taiwan do it.',
			},
			{
				term: 'FOSS for All Microgrant',
				body: 'A program that distributes small grants to open source projects and communities, aimed at giving early-stage projects real support.',
			},
			{
				term: 'Ecosystem network',
				body: 'Building connections between maintainers, contributors, users, companies, and institutions, and acting as a catalyst between them.',
			},
		],
		homepage: 'https://fossforall.org/en',
	},

	closing: {
		title: 'Join us',
		lines: [
			'Thank you for considering sponsorship.',
			'For package availability, adjustments, in-kind support, or any other question, write to the sponsorship team.',
			'We will respond within two business days.',
		],
		mail: 'sponsors@fossforall.org',
		site: 'https://2026.fossforall.org/en',
		siteLabel: '2026.fossforall.org/en',
	},
};
