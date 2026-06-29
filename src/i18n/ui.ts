import type { Locale } from './config';

export const ui = {
  ko: {
    site: {
      name: 'FOSS for All Conference',
      headerTitle: 'FOSS for All Conference 2026',
      title: 'FOSS for All Conference 2026',
      description:
        '2026년 11월 28일 | 서울 센터필드 EAST 18층 AWS Korea',
      defaultDescription:
        'FOSS for All Conference는 오픈소스 빌더, 메인테이너, 팀이 함께 실무 세션과 커뮤니티 교류를 나누는 하루입니다.',
    },
    event: {
      date: '2026년 11월 28일',
      venue: 'AWS Korea 18F',
      summary: '11월 28일 AWS Korea 18F',
    },
    hero: {
      title: 'FOSS for All Conference',
      subtitle: 'First steps with Open Source',
      actions: [
        { label: '등록하기(준비중)', href: '#register', variant: 'default' },
        { label: '컨퍼런스 소개', href: '/about/', variant: 'outline' },
      ],
    },
    actions: {
      register: '등록하기(준비중)',
      viewSchedule: '일정 보기',
      requestRegistrationInfo: '등록 정보 요청하기',
      previewProgram: '프로그램 미리보기',
      openNavigation: '내비게이션 메뉴 열기',
      language: '언어 변경',
      theme: '테마 변경',
      lightTheme: '라이트 모드',
      darkTheme: '다크 모드',
      systemTheme: '시스템 설정',
    },
    sections: [
      {
        id: 'about',
        label: '컨퍼런스 소개',
        title: '모두를 위한 오픈소스 컨퍼런스',
        body:
          'FOSS for All Conference는 잘 알려진 글로벌 오픈소스 프로젝트 뿐만 아니라, 잘 알려지지 않았지만 중요한 역할을 오픈소스 프로젝트는 물론, 오픈소스에 관심있는 누구나에게 열린 컨퍼런스 입니다.',
      },
      {
        id: 'sessions',
        label: '세션',
        title: '기조연설, 강연, 워크샵 등 다양한 프로그램',
        body:
          '기술, 거버넌스, 문서화, 커뮤니티 운영, 실제 도입 사례를 등 오픈소스에 관련한 다양한 주제로 프로그램이 준비 될 예정입니다.',
      },
      {
        id: 'booth',
        label: '부스',
        title: '다양한 기업과 커뮤니티를 직접 만나는 곳',
        body:
          '오픈소스 생태계에 적극 참여하는 다양한 후원사와, 국내외 다양한 오픈소스 커뮤니티를 부스를 통해 현장에서 만나고 소통 해 보세요!',
      },
    ],
    notFound: {
      title: '페이지를 찾을 수 없습니다',
      description: '요청한 페이지가 없거나 아직 번역되지 않았습니다.',
      home: '홈으로 돌아가기',
      alternate: '다른 언어로 보기',
    },
  },
  en: {
    site: {
      name: 'FOSS for All Conference',
      headerTitle: 'FOSS for All Conference 2026',
      title: 'FOSS for All Conference 2026',
      description:
        'November 28th, 2026 | AWS Korea (CenterField EAST 18F), Seoul, South Korea',
      defaultDescription:
        'FOSS for All Conference brings open-source builders, maintainers, and teams together for a day of practical sessions and community exchange.',
    },
    event: {
      date: 'November 28th, 2026',
      venue: 'AWS Korea 18F',
      summary: 'November 28th at AWS Korea 18F',
    },
    hero: {
      title: 'FOSS for All Conference',
      subtitle: 'First steps with Open Source',
      actions: [
        { label: 'Register(TBA)', href: '#register', variant: 'default' },
        { label: 'About the Conference', href: '/en/about/', variant: 'outline' },
      ],
    },
    actions: {
      register: 'Register(TBA)',
      viewSchedule: 'View Schedule',
      requestRegistrationInfo: 'Request Registration Info',
      previewProgram: 'Preview the Program',
      openNavigation: 'Open navigation menu',
      language: 'Change language',
      theme: 'Change theme',
      lightTheme: 'Light mode',
      darkTheme: 'Dark mode',
      systemTheme: 'System',
    },
    sections: [
      {
        id: 'about',
        label: 'About the Conference',
        title: 'An FOSS Conference for Everyone',
        body:
          'FOSS for All Conference is open not only to well-known global open source projects, but also to lesser-known projects with important roles, and to anyone interested in open source.',
      },
      {
        id: 'sessions',
        label: 'Sessions',
        title: 'Keynotes, Talks, Workshops, and More',
        body:
          'Programs will cover a wide range of open source topics, including technology, governance, documentation, community operations, and real-world adoption cases.',
      },
      {
        id: 'booth',
        label: 'Booth',
        title: 'Meet Companies and Communities in Person',
        body:
          'Meet and connect on site with sponsors actively participating in the open source ecosystem and with open source communities from Korea and abroad through the booth area.',
      },
    ],
    notFound: {
      title: 'Page not found',
      description: 'The requested page does not exist or has not been translated yet.',
      home: 'Return Home',
      alternate: 'View in another language',
    },
  },
} as const satisfies Record<Locale, unknown>;
