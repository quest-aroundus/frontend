'use client';

import FilterIcon from '@/app/_assets/FilterIcon';
import MagnifyIcon from '@/app/_assets/MagnifyIcon';
import PlusIcon from '@/app/_assets/PlusIcon';
import {
  EventSearchParams,
  FilterOption,
  SelectedFilters,
} from '@/types/event';
import IconWrapper from '@/components/common/IconWrapper';
import EventFilterDialog from './EventFilterDialog';
import EventSearchDialog from './EventSearchDialog';
import { useEffect, useRef, useState } from 'react';
import { useFilterStore } from '@/stores/useFilterStore';
import useCategories from '@/hooks/queries/useCategories';

// 상수 정의
const STYLES = {
  container:
    'sticky top-[6.25rem] flex self-stretch px-5 justify-center items-center gap-2.5 bg-white transition-opacity duration-200 z-20',
  button: {
    base: 'flex-1 h-[3.125rem] pl-1.5 py-2.5 rounded-[0.625rem] flex justify-between items-center gap-2 overflow-hidden cursor-pointer',
    empty: 'bg-bg text-main_b pr-2.5',
    filled: 'bg-main_b text-white',
    loading: 'bg-bg cursor-not-allowed',
  },
  searchButton: {
    base: 'w-[3.125rem] h-[3.125rem] px-2.5 py-2.5 rounded-[0.625rem] flex justify-center items-center cursor-pointer',
    empty: 'bg-bg',
    filled: 'bg-main_b',
    loading: 'bg-bg cursor-not-allowed',
  },
  filterTag:
    'min-w-fit h-8 px-2.5 border border-white bg-main_b rounded-[1.25rem] flex justify-center items-center text-xs whitespace-nowrap',
  filterContainer: 'w-full gap-2 flex overflow-x-auto pr-2.5 no-scrollbar',
} as const;

// 필터 태그 컴포넌트
interface FilterTagProps {
  filter: FilterOption | string;
}

const FilterTag = ({ filter }: FilterTagProps) => (
  <div
    key={typeof filter === 'string' ? filter : filter.id}
    className={STYLES.filterTag}
  >
    {typeof filter === 'string' ? filter : filter.label}
  </div>
);

// 필터 버튼 컴포넌트
interface FilterButtonProps {
  selectedFilters: SelectedFilters;
  isFilterEmpty: boolean;
  onOpenFilter: () => void;
  isLoading: boolean;
}

const FilterButton = ({
  selectedFilters,
  isFilterEmpty,
  onOpenFilter,
  isLoading,
}: FilterButtonProps) => {
  const buttonClass = `${STYLES.button.base} ${
    isLoading
      ? STYLES.button.loading
      : isFilterEmpty
        ? STYLES.button.empty
        : STYLES.button.filled
  }`;

  return (
    <button
      className={buttonClass}
      onClick={isLoading ? undefined : onOpenFilter}
      disabled={isLoading}
    >
      <IconWrapper size='sm'>
        <FilterIcon />
      </IconWrapper>

      <div className={STYLES.filterContainer}>
        {Object.values(selectedFilters)
          .filter((filter) => !!filter && !filter?.isDefault)
          .map((filter) => (
            <FilterTag key={filter.id} filter={filter} />
          ))}
      </div>

      {isFilterEmpty && (
        <IconWrapper size='sm'>
          <PlusIcon />
        </IconWrapper>
      )}
    </button>
  );
};

// 검색 버튼 컴포넌트
interface SearchButtonProps {
  isFilterEmpty: boolean;
  onOpenFilter: () => void;
  isLoading: boolean;
}

const SearchButton = ({
  isFilterEmpty,
  onOpenFilter,
  isLoading,
}: SearchButtonProps) => {
  const buttonClass = `${STYLES.searchButton.base} ${
    isLoading
      ? STYLES.searchButton.loading
      : isFilterEmpty
        ? STYLES.searchButton.empty
        : STYLES.searchButton.filled
  }`;

  return (
    <button
      onClick={isLoading ? undefined : onOpenFilter}
      className={buttonClass}
      disabled={isLoading}
    >
      <IconWrapper size='md'>
        <MagnifyIcon />
      </IconWrapper>
    </button>
  );
};

interface EventFilterProps {
  searchParams?: EventSearchParams;
  isLoading?: boolean;
}

// 메인 컴포넌트
const EventFilter = ({ searchParams, isLoading = false }: EventFilterProps) => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean | undefined>();
  const { filters, hasActiveFilters, setFiltersWithSync, _hasHydrated } =
    useFilterStore();
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();

  // 하이드레이션이 완료되지 않았다면 기본 상태로 렌더링
  const isHydrated = _hasHydrated;
  const isFilterEmpty = isHydrated ? !hasActiveFilters() : true;

  const containerClass = `${STYLES.container} ${
    isFilterEmpty ? 'text-main_b' : 'text-white'
  }`;

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  useEffect(() => {
    if (isHydrated && !isCategoriesLoading && categories) {
      setFiltersWithSync(searchParams ?? {}, categories);
    }
  }, [
    searchParams,
    isCategoriesLoading,
    categories,
    isHydrated,
    setFiltersWithSync,
  ]);

  const prevScrollY = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY <= prevScrollY.current || currentScrollY < 160) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${containerClass} ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <FilterButton
          selectedFilters={isHydrated ? filters : {}}
          isFilterEmpty={isFilterEmpty}
          onOpenFilter={handleOpenFilter}
          isLoading={isLoading}
        />
        <SearchButton
          isFilterEmpty={isFilterEmpty}
          onOpenFilter={handleOpenSearch}
          isLoading={isLoading}
        />
      </div>
      <EventFilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
      <EventSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
};

export default EventFilter;
