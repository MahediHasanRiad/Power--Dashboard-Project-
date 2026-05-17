import { useState } from "react";
import { FilterBtn } from "../utils/filter-btn";
import type { roleType } from "../utils/user-management-type";

interface SearchFilterBarProps {
  setRoleHandler: (role: roleType) => void;
}

export function SearchFilterBar({ setRoleHandler }: SearchFilterBarProps) {
  const filters: roleType[] = [
    "ALL",
    "USER",
    "SELLER",
    "ADMIN",
    "Courier",
    "SERVICE_PROVIDER",
  ];

  const [activeFilter, setActiveFilter] = useState<roleType>("ALL");

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 items-center w-full">
      {/* Filter Buttons */}
      <div className="md:col-span-4 lg:col-span-3 flex items-center gap-2 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {filters.map((filter) => (
          <FilterBtn
            key={filter}
            filter={filter}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
            setRoleHandler={setRoleHandler}
          />
        ))}
      </div>
    </section>
  );
}
