import FilterIcon from "@/app/_assets/FilterIcon";
import MagnifyIcon from "@/app/_assets/MagnifyIcon";
import PlusIcon from "@/app/_assets/PlusIcon";
import { FilterOption, SelectedFilters } from "@/types/event";
import IconWrapper from "@/components/common/IconWrapper";
import EventFilterDialog from "./EventFilterDialog";
import { useState } from "react";
import { useFilterStore } from "@/stores/useFilterStore";

// 상수 정의
const STYLES = {
  container:
    "flex self-stretch px-5 justify-center items-center gap-2.5 bg-white pb-2.5",
  button: {
    base: "flex-1 h-[3.125rem] pl-1.5 py-2.5 rounded-[0.625rem] flex justify-between items-center gap-2 overflow-hidden cursor-pointer",
    empty: "bg-bg text-main_b pr-2.5",
    filled: "bg-main_b text-white",
  },
  searchButton: {
    base: "w-[3.125rem] h-[3.125rem] px-2.5 py-2.5 rounded-[0.625rem] flex justify-center items-center cursor-pointer",
    empty: "bg-bg",
    filled: "bg-main_b",
  },
  filterTag:
    "min-w-fit h-8 px-2.5 border border-white bg-main_b rounded-[1.25rem] flex justify-center items-center text-xs whitespace-nowrap",
  filterContainer: "w-full gap-2 flex overflow-x-auto pr-2.5 no-scrollbar",
} as const;

// 필터 태그 컴포넌트
interface FilterTagProps {
  filter: FilterOption;
}

const FilterTag = ({ filter }: FilterTagProps) => (
  <div key={filter.id} className={STYLES.filterTag}>
    {filter.label}
  </div>
);

// 필터 버튼 컴포넌트
interface FilterButtonProps {
  selectedFilters: SelectedFilters;
  isFilterEmpty: boolean;
  onOpenFilter: () => void;
}

const FilterButton = ({
  selectedFilters,
  isFilterEmpty,
  onOpenFilter,
}: FilterButtonProps) => {
  const buttonClass = `${STYLES.button.base} ${
    isFilterEmpty ? STYLES.button.empty : STYLES.button.filled
  }`;

  return (
    <button className={buttonClass} onClick={onOpenFilter}>
      <IconWrapper size="sm">
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
        <IconWrapper size="sm">
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
}

const SearchButton = ({ isFilterEmpty, onOpenFilter }: SearchButtonProps) => {
  const buttonClass = `${STYLES.searchButton.base} ${
    isFilterEmpty ? STYLES.searchButton.empty : STYLES.searchButton.filled
  }`;

  return (
    <button onClick={onOpenFilter} className={buttonClass}>
      <IconWrapper size="md">
        <MagnifyIcon />
      </IconWrapper>
    </button>
  );
};

// 메인 컴포넌트
const EventFilter = () => {
  const [isFilterOpen, setIsFilterOpen] = useState<boolean | undefined>();
  const [isSearchOpen, setIsSearchOpen] = useState<boolean | undefined>();
  const { filters, hasActiveFilters } = useFilterStore();

  const isFilterEmpty = !hasActiveFilters();
  const containerClass = `${STYLES.container} ${
    isFilterEmpty ? "text-main_b" : "text-white"
  }`;

  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  const handleOpenSearch = () => {
    setIsSearchOpen(true);
  };

  return (
    <>
      <div className={containerClass}>
        <FilterButton
          selectedFilters={filters}
          isFilterEmpty={isFilterEmpty}
          onOpenFilter={handleOpenFilter}
        />
        <SearchButton
          isFilterEmpty={isFilterEmpty}
          onOpenFilter={handleOpenSearch}
        />
      </div>
      <EventFilterDialog
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
      />
    </>
  );
};

export default EventFilter;
