import type { ListSection } from '@/types/setting';

export const settings: ListSection[] = [
  {
    title: '언어설정',
    menu: [{ kind: 'route', text: '__LANGUAGE__', href: '/settings/language' }],
  },
  {
    title: '앱정보',
    menu: [
      { kind: "text", text: "__APP_VERSION__" },
    ],
  },
  {
    title: '고객지원',
    menu: [
      { kind: 'route', text: '오류 신고', href: '/settings/error' },
      { kind: 'route', text: '기능 제안', href: '/settings/suggestion' },
      {
        kind: 'external',
        text: '이메일 문의',
        href: 'mailto:aroundus399@gmail.com',
      },
    ],
  },
  {
    title: '약관 및 정책',
    menu: [
      { kind: 'route', text: '서비스 이용약관', href: '/settings/service' },
      { kind: 'route', text: '개인정보 처리방침', href: '/settings/privacy' },
      {
        kind: 'route',
        text: '위치기반 서비스 이용약관',
        href: '/settings/location',
      },
    ],
  },
];