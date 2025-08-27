'use client';

import ArrowLeftIcon from '@/app/_assets/ArrowLeftIcon';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

const titleByPath: Record<string, string> = {
  '/settings/service': '서비스 이용약관 보기',
  '/settings/privacy': '개인정보 처리방침 보기',
  '/settings/location': '위치기반 서비스 이용약관 보기',
};

const SettingHeader = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <header className='sticky z-10 w-full top-0 px-5 pt-[3.125rem] pb-[0.625rem] bg-white'>
      <div className='inline-flex items-center'>
        <button
          onClick={() => router.back()}
          className='cursor-pointer'
          aria-label='뒤로 가기'
        >
          <ArrowLeftIcon className='text-main_b' />
        </button>
        <span className='text-2xl font-semibold text-main_b'>
          {titleByPath[pathname] || '설정'}
        </span>
      </div>
    </header>
  );
};
export default SettingHeader;
