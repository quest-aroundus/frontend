'use client';

import React, { useEffect, useState } from 'react';
import { useBodyScrollLockStore } from '@/stores/useBodyScrollLockStore';
import BackgroundShade from '../common/BackgroundShade';
import MagnifyIcon from '@/app/_assets/MagnifyIcon';
import IconWrapper from '../common/IconWrapper';
import { useRouter, useSearchParams } from 'next/navigation';
import { useFilterStore } from '@/stores/useFilterStore';

interface EventSearchDialogProps {
  isOpen: boolean | undefined;
  onClose: () => void;
}

const EventSearchDialog = ({ isOpen, onClose }: EventSearchDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { setSearch, getSearch } = useFilterStore();
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateQuery = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleSearch = () => {
    updateQuery('search', searchQuery);
    setSearch(searchQuery);
    onClose();
  };

  const handleKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  /** Body Scroll Lock */
  const { lock, unlock } = useBodyScrollLockStore();

  useEffect(() => {
    if (isOpen) {
      lock();
    } else {
      unlock();
    }
  }, [isOpen, lock, unlock]);

  useEffect(() => {
    setSearchQuery(getSearch());
  }, [getSearch]);

  return (
    <>
      <BackgroundShade isOpen={isOpen} onClose={onClose} />

      {isOpen && (
        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 shadow-lg transition-all duration-500 flex flex-col items-center gap-5 px-5'>
          <div className='flex px-2.5 py-1.5 w-[385px] h-[3.125rem] bg-[#F5F5F5] rounded-[32px] gap-2 items-center justify-start'>
            <IconWrapper size='sm'>
              <MagnifyIcon />
            </IconWrapper>
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleKeyUp}
              className='w-full h-full bg-transparent outline-none'
            />
          </div>

          <button
            onClick={handleSearch}
            className='flex items-center justify-center gap-2 w-[385px] h-14 bg-[#156FF3] text-white rounded-[34px] font-normal text-base hover:bg-[#156FF3]/90 transition-colors'
          >
            검색
          </button>
        </div>
      )}
    </>
  );
};

export default EventSearchDialog;
