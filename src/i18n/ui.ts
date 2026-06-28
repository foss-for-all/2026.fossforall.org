import type { Locale } from './config';

export const ui = {
  ko: {
    site: {
      name: 'FOSS for All Conference',
      headerTitle: 'FOSS for All Conference 2026',
      title: 'FOSS for All Conference',
      description:
        '11월 28일 AWS Korea 18F에서 열리는 FOSS for All Conference에서 오픈소스 발표, 커뮤니티 교류, 실무적인 아이디어를 만나보세요.',
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
      subtitle: 'Coexist with Open Source',
    },
    nav: [
      { label: '소개', href: '#about' },
      { label: '연사', href: '#speakers' },
      { label: '일정', href: '#schedule' },
      { label: '장소', href: '#venue' },
    ],
    actions: {
      register: '등록하기',
      viewSchedule: '일정 보기',
      requestRegistrationInfo: '등록 정보 요청하기',
      previewProgram: '프로그램 미리보기',
      openNavigation: '내비게이션 메뉴 열기',
      language: '언어 변경',
    },
    sections: [
      {
        id: 'about',
        title: '실용적인 오픈소스 협업을 위한 컨퍼런스',
        body:
          'FOSS for All Conference는 메인테이너, 기여자, 개발자 애드보킷, 엔지니어링 팀이 실제 프로젝트에 유용한 아이디어를 나누는 집중적인 하루를 만듭니다.',
      },
      {
        id: 'speakers',
        title: '현장에서 일하는 사람들이 전하는 이야기',
        body:
          '오픈소스로 제품을 만들고 건강한 생태계를 지속해 온 메인테이너, 커뮤니티 운영자, 플랫폼 엔지니어, 제품 관점의 빌더가 경험을 공유합니다.',
      },
      {
        id: 'schedule',
        title: '발표, 세션, 대화로 구성된 하루 일정',
        body:
          '일정은 메인테이너십, 도구, 거버넌스, 문서화, 실제 도입 사례를 포함해 기술적 깊이와 커뮤니티 주제를 균형 있게 다룹니다.',
      },
      {
        id: 'venue',
        title: 'AWS Korea 18F에서 만납니다',
        body:
          '서울 중심부에 위치한 행사장에서 발표, 복도 대화, 커뮤니티 연결을 위한 하루를 보냅니다.',
      },
      {
        id: 'register',
        title: '관심 등록을 미리 해주세요',
        body:
          '등록 정보는 곧 공개됩니다. 티켓, 연사, 전체 일정이 열릴 때 가장 먼저 소식을 받아보세요.',
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
      title: 'FOSS for All Conference',
      description:
        'Join FOSS for All Conference on November 28th at AWS Korea 18F for a day of open-source talks, community exchange, and practical ideas.',
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
      subtitle: 'Coexist with Open Source',
    },
    nav: [
      { label: 'About', href: '#about' },
      { label: 'Speakers', href: '#speakers' },
      { label: 'Schedule', href: '#schedule' },
      { label: 'Venue', href: '#venue' },
    ],
    actions: {
      register: 'Register',
      viewSchedule: 'View Schedule',
      requestRegistrationInfo: 'Request Registration Info',
      previewProgram: 'Preview the Program',
      openNavigation: 'Open navigation menu',
      language: 'Change language',
    },
    sections: [
      {
        id: 'about',
        title: 'Built for practical open-source collaboration',
        body:
          'FOSS for All Conference brings together maintainers, contributors, developer advocates, and engineering teams for a focused day of ideas that are useful in real projects.',
      },
      {
        id: 'speakers',
        title: 'Speakers from the people doing the work',
        body:
          'Expect maintainers, community organizers, platform engineers, and product-minded builders sharing lessons from shipping in the open and sustaining healthy ecosystems.',
      },
      {
        id: 'schedule',
        title: 'A one-day program with talks, sessions, and conversations',
        body:
          'The schedule will balance technical depth with community topics, including maintainership, tooling, governance, documentation, and real-world adoption stories.',
      },
      {
        id: 'venue',
        title: 'Hosted at AWS Korea 18F',
        body:
          'The venue offers a central setting for a day of talks, hallway conversations, and community connection in Seoul.',
      },
      {
        id: 'register',
        title: 'Register your interest early',
        body:
          'Registration details will be announced soon. Join the early list to hear when tickets, speakers, and the full schedule go live.',
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
