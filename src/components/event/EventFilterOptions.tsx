import {
  DATE_FILTERS,
  EVENT_SIZE_FILTERS,
  LOCATION_RADIUS_FILTERS,
} from "@/constants/filters";
import { useFilterStore } from "@/stores/useFilterStore";
import { FilterOption, FilterType } from "@/types/event";

interface EventFilterOptionProps {
  type: FilterType;
  option: FilterOption;
}

const EventFilterDialogOption = ({ type, option }: EventFilterOptionProps) => {
  const { setFilters, getSelectedValue } = useFilterStore();

  const handleSelect = (option: FilterOption) => {
    switch (type) {
      case "date":
        setFilters({ date: option });
        break;
      case "scale":
        setFilters({ scale: option });
        break;
      case "radius":
        setFilters({ radius: option });
        break;
      default:
        break;
    }
  };

  return (
    <button
      key={option.id}
      className={`flex items-center justify-between h-py-[1.875rem] transition-colors cursor-pointer ${
        getSelectedValue(type) === option.id
          ? "text-main_b"
          : "text-gray-700 hover:opacity-60 hover:text-main_b"
      }`}
      onClick={() => handleSelect(option)}
    >
      <span>{option.label}</span>
      {getSelectedValue(type) === option.id && (
        <div className="w-3 h-3 bg-main_b rounded-full currentColor"></div>
      )}
    </button>
  );
};

interface EventFilterOptionsProps {
  type: FilterType;
  isLast: boolean;
}

const EventFilterOptions = ({ type, isLast }: EventFilterOptionsProps) => {
  const options = {
    date: DATE_FILTERS,
    scale: EVENT_SIZE_FILTERS,
    radius: LOCATION_RADIUS_FILTERS,
    category: [],
  };

  const title = {
    date: "Date",
    scale: "Scale",
    radius: "Distance",
    category: "Category",
  };

  return (
    <>
      <div className="flex flex-col gap-[0.625rem]">
        <h3 className="font-semibold">{title[type]}</h3>
        {options[type].map((option) => (
          <EventFilterDialogOption
            key={option.id}
            type={type}
            option={option}
          />
        ))}
      </div>
      {!isLast && <div className="h-[1px] bg-gray-200"></div>}
    </>
  );
};

export default EventFilterOptions;
