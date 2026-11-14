import grafanaLogo from "../../assets/sponsor-logos/grafana.svg";
import stadiaMapsLogo from "../../assets/sponsor-logos/stadia-maps.svg";
import tangledLogo from "../../assets/sponsor-logos/tangled.svg";
import rockyLinuxLogo from "../../assets/sponsor-logos/rockylinux.png";
import openUpLogo from "../../assets/sponsor-logos/nipa.svg";
import awsLogo from '../../assets/sponsor-logos/aws.png';
import ab180Logo from '../../assets/sponsor-logos/ab180.svg';
import ml2Logo from '../../assets/sponsor-logos/kcml2.svg';

import type { SponsorContent } from "./types";

export const ko: SponsorContent = {
  title: "후원사",
  kicker: "후원사",
  description: "FOSS for All Conference 2026 후원사를 소개합니다.",
  intro: "FOSS for All Conference를 함께 만들어 가는 후원사입니다.",
  viewAll: "모든 후원사 보기",
  empty: "후원사는 곧 공개됩니다.",
  levels: {
    gold: "골드",
    silver: "실버",
    bronze: "브론즈",
    government: "정부기관",
    venue: "장소후원"
  },
  dialog: {
    website: "후원사 웹사이트 방문",
    close: "닫기",
  },
  sponsors: [
    {
      name: "Rocky Linux",
      level: "gold",
      logo: rockyLinuxLogo,
      description:
        "Rocky Linux is an open-source enterprise operating system designed to be 100% bug-for-bug compatible with Red Hat Enterprise Linux®.",
      website: "https://rockylinux.org",
    },
    {
			name: 'AB180',
			level: 'gold',
			logo: ab180Logo,
			description: "AB180(에이비일팔공)은 모바일 앱과 웹의 사용자 데이터·마케팅 성과를 분석해 최적화할 수 있도록 돕는 디지털 마케팅 솔루션 전문 기업입니다.",
			website: 'https://www.ab180.co',
		},
    {
      name: "Grafana Labs",
      level: "silver",
      logo: grafanaLogo,
      description:
        "Grafana Labs delivers the open observability cloud, helping builders everywhere turn signals into action. We were founded on the principles of open source, open standards, open ecosystems, and open culture. Grafana Cloud, our fully managed observability platform, is flexible and built for scale, helping organizations run their software better, accelerate innovation, and move at the speed of their ambitions. We're also the team behind some of the world's most popular open source projects, including Grafana for dashboards and data visualization, and our horizontally scalable databases: Loki for logs, Mimir for metrics, and Tempo for traces.",
      website: "https://grafana.com/",
    },
    {
      name: "Tangled",
      level: "silver",
      logo: tangledLogo,
      description:
        "Tangled is a federated git collaboration platform built on the AT Protocol. You can run your own infrastructure and still be discoverable: your identity and your projects aren't tied to any one server. Review happens in stacks rather than one large diff, and a vouch network handles the bots so maintainers don't have to. Open source in its entirety, on an open protocol.",
      website: "https://tangled.org/",
    },
    {
      name: "Stadia Maps",
      level: "bronze",
      logo: stadiaMapsLogo,
      description:
        "Stadia Maps offers location APIs for humans. Thousands of companies of all sizes use Stadia Maps to contextualize their data on a map, solve logistics problems, build fitness experiences, and more. We back our customers up with no-surprise billing, world-class reliability, strong privacy guarantees, and real human support.",
      website: "https://stadiamaps.com/",
    },
    {
			name: 'KC ML2',
			level: 'bronze',
			logo: ml2Logo,
			description: `
## Our Team
ML2는 반도체 제조 솔루션 기업 (주)케이씨 산하에 설립된 독립적인 머신러닝 연구팀입니다. 2018년부터 ML2는 오픈소스를 기반으로 하는 머신러닝 기술로부터 지속 가능한 가치를 창출한다는 mission을 중심으로 다양한 연구개발 활동을 진행해 왔습니다.
그동안 ICML과 같은 탑티어 학회 논문 발표와 ACS Photonics와 같은 학술지 표지 논문 게재를 비롯해, LLVM-FLOW와 같은 오픈소스 소프트웨어를 개발하여 EuroLLVM 등 주요 developer conference에서 발표하는 등, 폭넓은 연구개발 활동을 통해 팀과 구성원 모두가 함께 성장해 왔습니다.
생성형 AI의 발전에 따라 다양한 머신러닝 연구개발 방향이 제시되고 있는 지금, ML2는 지속 가능한 가치를 창출할 수 있는 독보적인 기술 개발을 위한 다음 단계로의 진화를 모색하고 있습니다.
## Our Goal
ML2는 현재까지 키워왔던 역량을 바탕으로 많은 개발자와 사용자가 있는 오픈소스 ML 플랫폼의 value chain의 중요한 연결고리를 개발하고 공유하고자 합니다.
그 첫번째 단계로 ML2는 commodity hardware와 open-source software를 바탕으로 개발자와 사용자 모두가 편리하게 사용할 수 있는 stand-alone ML system을 개발하는 것을 목표로 하고 있습니다.
			`,
			website: 'https://www.kc-ml2.com/',
		},
    {
      name: "OpenUP (NIPA)",
      level: "government",
      logo: openUpLogo,
      description:
        "정보통신산업진흥원(NIPA)의 산하 조직인 OpenUP(오픈소스 소프트웨어 통합지원센터)은, 오픈소스SW를 개발, 공유, 활용하기를 원하는 개발자, 기업, 정부를 지원하고, 수요(기업, 공공기관)와 공급(개발자, 기업)의 선순환 구조를 이루어 오픈소스SW의 활성화 허브 역할을 수행하고 있습니다.",
      website: "https://oss.kr/",
    },
    {
      name: "AWS Korea",
      level: "venue",
      logo: awsLogo,
      description: "Amazon Web Services(AWS)는 전 세계적으로 분포한 데이터 센터에서 200개가 넘는 완벽한 기능의 서비스를 제공하는, 세계적으로 가장 포괄적이며, 널리 채택되고 있는 클라우드입니다. 빠르게 성장하는 스타트업, 대기업, 주요 정부 기관을 비롯한 수많은 고객이 AWS를 사용하여 비용을 절감하고, 민첩성을 향상시키고, 혁신 속도를 높이고 있습니다.",
      website: "https://aws.amazon.com/ko/"
    }
  ],
};
