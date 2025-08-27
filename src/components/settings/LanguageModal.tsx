'use client';

import { languageOptions } from '@/constants/setting';
import { useState } from 'react';

interface LanguageModalProps {
  currentLanguage: string;
  onClose?: () => void;
}

const LanguageModal = ({ currentLanguage, onClose }: LanguageModalProps) => {
  const [currentLang, setCurrentLang] = useState(currentLanguage);
  const handleChange = (value: LanguageModalProps['currentLanguage']) => {
    setCurrentLang(value);
  };

  const handleClick = () => {
    // TODO: i18n 변경 적용
    onClose?.();
  };
  return (
    <aside className='fixed inset-0 z-50 flex items-end justify-center bg-black/50'>
      <div className='bg-white p-6 rounded-t-[0.625rem] w-full px-5 pt-2'>
        <h2 className='flex justify-between items-center h-10 mb-5'>
          <b className='text-text_b font-semibold'>언어 설정</b>
          <button className='text-main_b cursor-pointer' onClick={onClose}>
            닫기
          </button>
        </h2>
        <ul className='p-5 flex flex-col gap-9'>
          {languageOptions.map((opt) => (
            <li
              className='flex items-center justify-between h-[1.875rem]'
              key={opt.value}
            >
              <label
                htmlFor={opt.value}
                className={
                  opt.value === currentLang ? 'text-main_b' : 'text-text_b'
                }
              >
                {opt.label}
              </label>
              <input
                value={opt.value}
                checked={opt.value === currentLang}
                type='radio'
                name='lang'
                onChange={(evt) => handleChange(evt.target.value)}
                id={opt.value}
              />
            </li>
          ))}
        </ul>

        <button
          className='mt-[1.563rem] flex w-full items-center justify-center bg-main_b text-white rounded-[2.25rem] h-14 cursor-pointer'
          onClick={handleClick}
        >
          적용하기
        </button>
      </div>
    </aside>
  );
};

export default LanguageModal;
