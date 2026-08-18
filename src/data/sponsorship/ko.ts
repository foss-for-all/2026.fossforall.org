import type { SponsorshipContent } from './types';

export const ko: SponsorshipContent = {
	title: '후원사로 참여하기',
	description: 'FOSS for All Conference 2026 후원 제안서',

	hero: {
		kicker: '후원 제안서 / Sponsorship Prospectus',
		heading: 'FOSS for All Conference 2026',
		slogan: '오픈소스로 향하는 첫 걸음',
		lead: '모두를 위한 자유·오픈소스 소프트웨어. 국내외 프로젝트와 커뮤니티가 한자리에 모이는 비영리 컨퍼런스입니다.',
		facts: [
			{ label: '일시', value: '2026. 11. 28. (토)' },
			{ label: '장소', value: '센터필드 EAST, 서울 강남' },
			{ label: '규모', value: '참가자 200명' },
			{ label: '주최', value: 'FOSS for All (포스포올)' },
		],
		prospectus: '제안서 PDF 내려받기',
		register: '후원사 등록 신청',
	},

	why: {
		num: '01',
		title: '후원해야 하는 이유',
		lead: '후원은 단순 협찬이 아니라, 기업이 이미 사용하고 있는 오픈소스 생태계에 직접 투자하는 일입니다. 동시에 IT 실무자로 구성된 명확한 청중을 만나는 자리이기도 합니다.',
		reasons: [
			{
				icon: 'audience',
				title: '정해진 대상 청중',
				body: '참가자 대부분이 IT 업계 종사자입니다. 불특정 다수가 아니라 제품과 기술을 이해하는 청중에게 직접 이야기할 수 있습니다.',
			},
			{
				icon: 'promotion',
				title: '제품 및 서비스 홍보',
				body: '잠재 고객과 기존 고객을 대면하여 제품을 소개하고, 그 자리에서 솔직한 피드백을 받을 수 있습니다.',
			},
			{
				icon: 'talent',
				title: '인재 영입',
				body: '오픈소스에 자기 시간을 쓰는 개발자는 채용 시장에서 찾기 어려운 인재입니다. 부스와 세션이 자연스러운 접점이 됩니다.',
			},
			{
				icon: 'leadership',
				title: '기술 리더십 구축',
				body: '후원사의 오픈소스 전략, 기여 사례, 엔지니어링 문화를 커뮤니티에 직접 전달할 수 있습니다.',
			},
			{
				icon: 'branding',
				title: '브랜딩 강화',
				body: '현수막, 웹사이트, 명찰, 홍보 영상, 소셜 미디어와 미디어 파트너 보도에 후원사가 노출됩니다.',
			},
			{
				icon: 'ecosystem',
				title: '생태계에 대한 실질적 기여',
				body: '오늘날 기업이 만드는 소프트웨어 대부분이 오픈소스를 사용합니다. 후원은 그 기반을 유지하는 가장 직접적인 방법입니다.',
			},
			{
				icon: 'esg',
				title: 'ESG 활동으로서의 후원',
				body: '사회적 가치 창출, IT 교육, 산업 생태계 발전에 동참하는 활동으로 글로벌 기업의 ESG 평가 항목과 직접 연결됩니다.',
			},
			{
				icon: 'transparency',
				title: '투명한 집행',
				body: '포스포올은 법인으로 보는 단체로 등록되어 있으며, 재무제표를 상시 공개합니다. 후원금이 어디에 쓰였는지 언제든 확인하실 수 있습니다.',
			},
		],
	},

	record: {
		num: '02',
		title: '2025년의 기록',
		lead: '첫 번째 행사인 FOSS for All Conference 2025는 2025년 11월 8일 광운대학교에서 열렸습니다. 하루 동안 4개의 트랙과 29개의 발표가 진행되었고, 13개 후원사와 8개 오픈소스 커뮤니티가 함께했습니다.',
		stats: [
			{ value: '196', label: '참석자' },
			{ value: '4', label: '트랙' },
			{ value: '29', label: '발표' },
			{ value: '13', label: '후원사' },
			{ value: '8', label: '커뮤니티 부스' },
		],
		caption: 'FOSS for All Conference 2025 현장',
	},

	audience: {
		num: '03',
		title: '어떤 분들이 오나요',
		lead: '2025년 행사 등록 정보 200건을 집계했습니다.',
		stats: [
			{ value: '58%', label: '개발 직군' },
			{ value: '68%', label: '기업 소속' },
			{ value: '196', label: '2025년 총 참석자' },
			{ value: '200', label: '참가 신청자 수' },
		],
		jobsTitle: '직무 분포',
		jobs: [
			{ label: '개발', value: 58 },
			{ label: '비개발 직군', value: 14 },
			{ label: '인프라·보안', value: 12 },
			{ label: '학생', value: 11 },
			{ label: '데이터·AI', value: 5 },
		],
		affiliationTitle: '소속 유형',
		affiliation: [
			{ label: '기업', value: 68 },
			{ label: '학계·학교', value: 14 },
			{ label: '커뮤니티·프로젝트', value: 10 },
			{ label: '개인·무소속', value: 7 },
		],
		note: '집계 기준: 2025년 행사 등록 정보 200건. 직무는 자유 응답을 분류한 결과이며, 무응답 및 분류 불가 14건을 제외한 186건 기준입니다. 소속 유형은 200건 전체 기준입니다.',
		channelsKicker: '온라인 채널 · 2026년 8월 3일 기준',
		channelsTotal: { value: '695', label: '소셜 채널 팔로워 합계' },
		channels: [
			{ name: 'LinkedIn', value: '224' },
			{ name: 'Discord', value: '207' },
			{ name: 'Facebook', value: '58' },
			{ name: 'X', value: '51' },
			{ name: 'Mastodon', value: '49' },
			{ name: 'GitHub', value: '37' },
			{ name: 'Instagram', value: '34' },
			{ name: '카카오톡 채널', value: '19' },
			{ name: 'YouTube', value: '16' },
		],
	},

	packages: {
		num: '04',
		title: '후원 패키지',
		lead: '세 개의 등급으로 구성되며, 골드와 실버는 수량이 한정되어 있습니다.',
		tiers: [
			{ name: 'Gold', price: '200만원', priceSub: 'USD 1,400', slots: '2 슬롯', accent: '#C8A24A' },
			{ name: 'Silver', price: '100만원', priceSub: 'USD 700', slots: '5 슬롯', accent: '#9AA3AF' },
			{ name: 'Bronze', price: '50만원', priceSub: 'USD 350', slots: '수량 제한 없음', accent: '#B07A46' },
		],
		matrix: [
			{ type: 'group', label: '로고 노출' },
			{ type: 'item', label: '현수막 로고', values: ['대', '중', '소'] },
			{ type: 'item', label: '홈페이지 로고', values: ['대', '중', '소'] },
			{ type: 'item', label: '참가자 명찰 로고', values: [true, false, false] },
			{ type: 'group', label: '상호 작용' },
			{ type: 'item', label: '테이블 부스', values: ['선택', '선택', false] },
			{ type: 'item', label: '후원사 세션', values: ['애드온으로 구매 가능', '애드온으로 구매 가능', false] },
			{ type: 'item', label: '입장권 지원', values: ['5매', '3매', '1매'] },
			{ type: 'group', label: '마케팅' },
			{ type: 'item', label: '소셜 미디어 홍보', values: [true, true, true] },
			{ type: 'item', label: '쉬는시간 홍보 영상', values: [true, false, false] },
			{ type: 'item', label: '참가자 명단 제공', values: ['이메일 주소, 성명, 소속, 직무 등', '이메일 주소', false] },
			{ type: 'group', label: '공통' },
			{ type: 'item', label: '후원 증서', values: [true, true, true] },
		],
		pricingTitle: '금액 안내',
		pricing: [
			'원화 금액은 부가가치세 10% 별도입니다.',
			'국내 사업장이 없는 해외 법인에는 USD 인보이스가 발행되고 부가가치세 영세율이 적용됩니다. 표기된 USD 금액 외에 10%가 붙지 않습니다.',
		],
		availabilityTitle: '수량과 배정',
		availability: [
			'골드 2 슬롯, 실버 5 슬롯으로 한정됩니다. 브론즈는 수량 제한이 없습니다.',
			'부스와 세션은 수량이 한정되어 있어 후원 확정 순서대로 배정됩니다.',
			'등급 상향이나 패키지 조정이 필요하시면 후원사 팀과 협의해 주십시오.',
		],
		callout:
			'표에 없는 형태의 후원도 환영합니다. 특정 프로그램만 후원하고 싶으시거나 다른 구성을 원하시는 경우, 신청 전에 sponsors@fossforall.org 로 연락 주시면 감사하겠습니다.',
	},

	addons: {
		num: '05',
		title: '애드온과 단품 후원',
		lead: '등급 패키지 외에 후원사 세션과 테이블 부스를 단품으로 선택하시거나, 현물로 후원하실 수 있습니다.',
		session: {
			title: '후원사 세션 애드온',
			meta: '골드·실버 후원사 대상 / 3 슬롯 / 30분',
			price: '100만원',
			priceSub: 'USD 700',
			body: '30분 분량의 일반 세션 한 자리를 확보하실 수 있습니다. 후원사의 오픈소스 기술 경험과 사례, 직접 개발한 프로젝트, 엔지니어링 문화를 소개하기에 좋은 기회입니다.',
			bullets: [
				'제안서 심사 후 구매하는 방식입니다. 제안서를 먼저 제출하시면 프로그램팀 검토 후 구매 절차를 안내드립니다.',
				'세션 내용은 오픈소스와 관련되어야 하며 <a href="/coc/">행동강령</a>을 준수해야 합니다. 과도한 제품 홍보는 제한됩니다.',
				'승인 순서대로 배정되며 발표장 규모도 그 순서를 따릅니다. 키노트는 제공되지 않습니다.',
				'웹사이트와 프로그램북에 후원사 세션으로 표시됩니다.',
				'제안서 제출 마감일은 프로그램팀과 협의 후 별도로 안내드립니다.',
			],
		},
		booth: {
			title: '테이블 부스 단품',
			meta: '수량 한정 / 선착순',
			price: '50만원',
			body: '등급 후원 없이 부스만 원하시는 경우 선택하실 수 있습니다. 신청은 상시 받으며, 배정 가능한 부스 수가 확정되는 행사 1-2개월 전에 신청 순서대로 배정해 드립니다.',
		},
		inKind: {
			title: '현물 후원',
			meta: '협의 후 등급 환산',
			body: '행사 운영에 필요한 물품과 서비스를 현물로 후원하실 수 있습니다. 후원사 팀에 제안해 주시면 검토 후, 현금으로 환산한 가치에 비례하여 등급표의 혜택을 제공해 드립니다.',
		},
		examplesTitle: '현물 후원 예시',
		examples: '점심·케이터링 · 커피차 · 기념품·굿즈 · 도서 · 촬영·음향·네트워크 장비 · 행사장 WiFi · 통역과 자막',
		caption: '2025년 후원사 부스 현장',
	},

	benefits: {
		num: '06',
		title: '혜택 세부사항',
		groups: [
			{
				title: '로고 노출',
				items: [
					{ term: '현수막', body: '행사장 입구와 각 발표장에 설치되는 현수막에 등급별 크기로 로고가 노출됩니다.' },
					{ term: '홈페이지', body: '컨퍼런스 홈페이지 후원사 영역에 로고와 소개 문구, 링크가 게재됩니다.' },
					{ term: '참가자 명찰', body: '참가자가 하루 종일 착용하는 명찰에 골드 후원사 로고가 인쇄됩니다.' },
				],
			},
			{
				title: '상호 작용',
				items: [
					{
						term: '테이블 부스',
						body: '골드·실버 후원사는 테이블 부스를 선택하실 수 있습니다. 부스에서 참가자와 직접 소통하고, 부스 이벤트나 미니 세션 같은 프로그램을 운영하실 수 있습니다. 부스 수량이 한정되어 있어 후원 확정 순서대로 배정됩니다.',
					},
					{ term: '후원사 세션', body: '애드온으로 구매하실 수 있습니다. 자세한 내용은 앞 절을 참고하시기 바랍니다.' },
					{
						term: '입장권 지원',
						body: '등급에 따라 입장권을 지원해 드립니다. 지원받으신 티켓으로 팀이 직접 참여하여 참가자와 교류하실 수 있습니다.',
					},
				],
			},
			{
				title: '마케팅',
				items: [
					{ term: '소셜 미디어 홍보', body: 'FOSS for All 소셜 미디어 채널에 후원사 소개 게시물이 게재됩니다.' },
					{ term: '쉬는시간 홍보 영상', body: '세션 사이 쉬는 시간에 골드 후원사가 제공한 홍보 영상이 재생됩니다.' },
					{
						term: '참가자 명단 제공',
						body: '행사 이후에도 참가자와 이어질 수 있도록 참가자 데이터를 제공합니다. 골드 후원사에는 이메일 주소, 성명, 소속, 직무 등을, 실버 후원사에는 이메일 주소를 제공합니다.',
					},
				],
			},
			{
				title: '공통',
				items: [{ term: '후원 증서', body: '후원해 주신 데 대한 감사의 뜻으로, 컨퍼런스 후원 참여를 기념하는 증서를 드립니다.' }],
			},
		],
		callout: {
			term: '참가자 명단 제공 조건',
			body: '제3자 정보 제공에 동의한 참가자의 정보만 제공되며, 제공 항목은 후원 등급에 따라 다릅니다. 컨퍼런스 개인정보처리방침에 따라 보유·이용하실 수 있으며, 방침에 기재할 후원사 상호명과 주소, 담당자 연락처, 이용 목적, 보유 기간 만료 후 폐기 방법을 사전에 알려 주셔야 합니다.',
		},
	},

	partners: {
		num: '07',
		title: '함께한 분들',
		lead: '지난해 13개 기업과 단체가 FOSS for All Conference 2025를 후원했습니다. 국내외 오픈소스 기업, 공공기관, 커뮤니티, 미디어가 함께했습니다.',
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
			{ label: 'Meeting Space', logos: [{ file: 'modulabs.svg', ar: 2.55, name: '모두의연구소' }] },
			{
				label: 'Media Partner',
				logos: [
					{ file: 'bylinenetwork.png', ar: 6.12, name: '바이라인네트워크' },
					{ file: 'yozmit.svg', ar: 3.98, name: '요즘IT' },
				],
			},
		],
		communitiesTitle: '참여 커뮤니티',
		communitiesLead:
			'2025년 행사에는 국내외 8개 오픈소스 커뮤니티가 부스로 참여했습니다. 후원사 부스와 나란히 배치되어, 참가자들이 자연스럽게 오가며 교류했습니다.',
		communities: [
			{
				file: 'coscup.svg',
				ar: 2.96,
				name: 'COSCUP',
				body: '대만 오픈소스 커뮤니티들이 공동으로 여는 연례 컨퍼런스입니다. 대만의 커뮤니티 문화와 생태계를 소개했습니다.',
			},
			{ file: 'debian.png', ar: 0.76, name: 'Debian', body: '전 세계 자원봉사자가 함께 만드는 자유 소프트웨어 운영체제입니다.' },
			{
				file: 'osm-korea.svg',
				ar: 1.0,
				name: 'OpenStreetMap 한국커뮤니티',
				body: '누구나 자유롭게 쓸 수 있는 오픈 지도를 만드는 OpenStreetMap의 한국 커뮤니티입니다.',
			},
			{
				file: 'ospn.jpg',
				ar: 1.0,
				name: 'OSPN OpenSource People Network Japan',
				body: '2004년부터 일본 각지에서 Open Source Conference를 열어 온 단체입니다.',
			},
			{ file: 'videolan.png', ar: 1.0, name: 'VideoLAN', body: 'VLC, FFmpeg, x264, dav1d 등을 개발하는 비영리 단체입니다.' },
			{
				file: 'ubuntu-korea.svg',
				ar: 4.7,
				name: '우분투 한국 커뮤니티',
				body: 'Ubuntu Community Council이 인증한 공식 우분투 지역 커뮤니티입니다.',
			},
			{ file: 'code-for-korea.png', ar: 4.0, name: '코드포코리아', body: '디지털 기술로 사회 문제를 함께 푸는 시민 시빅해킹 커뮤니티입니다.' },
			{
				file: 'ksug.png',
				ar: 3.06,
				name: '한국 스프링 사용자 모임',
				body: '2007년에 설립되어 Spring Camp와 정기 스터디를 여는 스프링 개발자 커뮤니티입니다.',
			},
		],
		callout:
			'2025년 후원사 여러분께 감사드립니다. 2026년에도 같은 자리에서 함께해 주시기를 기다리고 있습니다. 연속 후원사에는 등급 확보와 부스·세션 배정에서 우선 협의 기회를 드립니다.',
	},

	process: {
		num: '08',
		title: '후원 절차와 일정',
		timelineTitle: '모집 일정',
		timeline: [
			{ when: '8월 초', what: '후원사 모집 시작', done: true },
			{ when: '9월중', what: '후원사 설명회 / 2차 모집' },
			{ when: '10월 말', what: '후원사 모집 마감' },
			{ when: '10 - 11월', what: '홍보 콘텐츠 제작, 증서·굿즈 출력' },
			{ when: '11월 28일', what: 'FOSS for All Conference 2026' },
			{ when: '12월 31일', what: '후원비 입금 마감' },
		],
		stepsTitle: '등록 절차',
		steps: [
			{
				n: '01',
				title: '패키지 선택 및 신청',
				body: '희망하시는 등급과 애드온을 선택하신 뒤 후원사 등록 신청 양식을 제출해주세요. 확인 후 잔여 수량이 있으면 등록 절차를 진행해 드립니다. 패키지 세부 조정이나 현물 후원을 원하시는 경우, 신청 전에 후원사 팀과 협의해 주시기 바랍니다.',
			},
			{
				n: '02',
				title: '서류 발행',
				bullets: [
					{ term: '견적서', body: '내부 품의에 필요하시면 요청해주세요. 바로 발행해 드립니다.' },
					{ term: '계약서', body: '후원사 측 필요에 따라 후원 계약서를 작성합니다. 필요하지 않으시면 생략 가능합니다.' },
					{
						term: '세금계산서 또는 인보이스',
						body: '계약 완료 후, 계약을 생략한 경우에는 내부 품의 완료 후 "포스포올" 명의로 발행됩니다. 국내 사업장이 없는 해외 법인에는 USD 인보이스가 발행됩니다.',
					},
					{ term: '거래명세서', body: '필요하신 경우 요청해주시면 세금계산서와 별도로 발행해 드립니다.' },
				],
			},
			{
				n: '03',
				title: '후원비 입금',
				body: '안내드린 계좌로 부가세를 포함한 후원비를 입금해 주시면 확인 후 등록이 완료됩니다. 입금 기한은 계약서를 작성한 경우 계약서에 명시된 일자를 따르며, 계약서를 생략한 경우 세금계산서는 발행일로부터 2주, USD 인보이스는 발행일로부터 30일(Net 30)입니다. 협의를 통해 연장하실 수 있으나, 늦어도 2026년 12월 31일까지는 입금이 완료되어야 합니다.',
			},
			{
				n: '04',
				title: '등록 완료 및 혜택 안내',
				body: '등록이 완료되면 홈페이지에 로고가 게재되고, 부스·세션·홍보 영상 등 혜택 사용 방법을 개별 안내드립니다. 행사 종료 후에는 감사 메일과 후원 증서, 참가자 정보를 전달해 드립니다.',
			},
		],
		callout: '후원사 등록 신청과 문의는 sponsors@fossforall.org 로 받고 있습니다.',
	},

	about: {
		num: '09',
		title: '포스포올 소개',
		lead: '지속 가능한 자유·오픈소스 소프트웨어 생태계를 만들기 위해 활동하는 비영리 단체입니다.',
		body: '포스포올(FOSS for All)은 국내외 자유·오픈소스 프로젝트, 커뮤니티, 기업, 기여자와 사용자가 서로 연결되고 지속적으로 활동할 수 있는 환경을 만들기 위해 시작된 이니셔티브입니다. 프로젝트와 커뮤니티는 기술 개발뿐 아니라 회계, 행정, 행사 운영, 후원 관리, 법률 검토 같은 실무 과제를 함께 마주합니다. 각 프로젝트가 별도의 조직을 세우거나 복잡한 행정 절차를 처음부터 반복하지 않고도 본질적으로 중요한 일에 집중할 수 있도록 지원하고자 합니다.',
		items: [
			{
				term: 'FOSS for All Conference',
				body: '국내외 여러 자유·오픈소스 커뮤니티가 모여 교류하고, 잘 알려지지 않은 프로젝트를 알리며, 커뮤니티 참여자들의 공통된 고민을 함께 논의하는 컨퍼런스를 매년 개최합니다.',
			},
			{
				term: '재정 후원 (Fiscal sponsorship)',
				body: '커뮤니티와 프로젝트가 법인을 설립하지 않고도 후원을 받아 공금을 조성하고 투명하게 관리할 수 있도록 재정 후원을 제공하는 것이 중장기 목표입니다. 미국 OSC, 대만 OCF 등의 사례를 연구하고 있습니다.',
			},
			{
				term: 'FOSS for All Microgrant',
				body: '국내외 오픈소스 프로젝트와 커뮤니티에 소액 기부금을 분배하는 사업입니다. 초기 단계 프로젝트의 성장을 실질적으로 지원하는 것을 목표로 합니다.',
			},
			{
				term: '생태계 참여자 간 네트워크',
				body: '메인테이너, 기여자, 사용자, 기업, 관련 기관 사이의 네트워크를 만들고 그 사이에서 촉매 역할을 하고자 합니다.',
			},
		],
		homepage: 'https://fossforall.org',
	},

	closing: {
		title: '함께해주세요!',
		lines: [
			'행사 후원을 검토해 주셔서 감사합니다.',
			'모든 문의는 언제든지 후원사 팀으로 연락주세요.',
			'영업일 기준 2일 이내에 답변드리겠습니다.',
		],
		mail: 'sponsors@fossforall.org',
		site: 'https://2026.fossforall.org',
		siteLabel: '2026.fossforall.org',
	},
};
