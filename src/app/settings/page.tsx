'use client';

import LanguageModal from '@/components/settings/LanguageModal';
import ListItem from '@/components/settings/ListItem';
import { settings } from '@/constants/setting';
import { useState } from 'react';
import { createPortal } from 'react-dom';

const SettingPage = () => {
  const [openLanguageModal, setOpenLanguageModal] = useState(false);
  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? '1.0.0';

  const handleLanguageClick = () => {
    setOpenLanguageModal(true);
  };

  const handleClose = () => {
    setOpenLanguageModal(false);
  };

  const parsedSettings = settings.map((section) => ({
    ...section,
    menu: section.menu.map((item) =>
      item.text === '__APP_VERSION__'
        ? { ...item, text: `Ver ${version}` }
        : item.text === '__LANGUAGE__'
          ? // TODO: i18n 적용
          { ...item, text: '한국어', onClick: handleLanguageClick }
          : item
    ),
  }));
  return (
    <>
      <aside className='flex flex-col gap-2.5'>
        {parsedSettings.map((item, idx) => (
          <ListItem key={idx} {...item} />
        ))}
      </aside>
      {openLanguageModal &&
        createPortal(
          <LanguageModal currentLanguage='ko' onClose={handleClose} />,
          document.body,
          'language-modal'
        )}
    </>
  );
};

export default SettingPage;
