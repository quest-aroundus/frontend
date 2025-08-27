'use client';

import ListItem from '@/components/settings/ListItem';
import { settings } from '@/constants/setting';

const SettingPage = () => {
  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0';
  const parsedSettings = settings.map((section) => ({
    ...section,
    menu: section.menu.map((item) =>
      item.text === '__APP_VERSION__'
        ? { ...item, text: `Ver ${version}` }
        : item.text === '__LANGUAGE__'
          ? // TODO: i18n 적용
            { ...item, text: '한국어' }
          : item
    ),
  }));
  return (
    <aside className='flex flex-col gap-2.5'>
      {parsedSettings.map((item, idx) => (
        <ListItem key={idx} {...item} />
      ))}
    </aside>
  );
};

export default SettingPage;
