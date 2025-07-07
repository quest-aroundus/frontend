"use client";

import { useState } from "react";
import EventFilter from "./EventFilter";
import { FilterOption } from "@/types/event";

const EventList = () => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const handleOpenFilter = () => {
    setIsFilterOpen(true);
  };

  return (
    <>
      <EventFilter
        selectedFilters={selectedFilters}
        onOpenFilter={handleOpenFilter}
      />
      <div>list</div>
    </>
  );
};

export default EventList;
