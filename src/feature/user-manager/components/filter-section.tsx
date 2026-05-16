import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterBtn } from "./filter-btn";
import type { roleType } from "../redux/user-manager.thunk";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

interface SearchFilterBarProps {
  setRoleHandler: (role: roleType) => void;
}

export function SearchFilterBar({ setRoleHandler }: SearchFilterBarProps) {
  const filters: roleType[] = ["ALL", "USER", "SELLER", "SERVICE_PROVIDER"];

  const [activeFilter, setActiveFilter] = useState<roleType>("ALL");
  // const [searchQuery, setSearchQuery] = useState("");
  
  // const { data } = useSelector(
  //   (state: RootState) => state.userManager,
  // );



  return (
    <section className="grid grid-cols-1 md:grid-cols-12 items-center w-full">
      {/* Search Input */}
      {/* <div className="relative md:col-span-6 lg:col-span-6 ml-2 mb-3 md:mb-0">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="size-5 text-[#A3A3A3]" />
        </div>
        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="
            w-full h-14 pl-12 pr-4
            bg-primary-bg-0 
            text-[#A3A3A3] 
            placeholder:text-[#525252]
            rounded-xl border-none
            focus:ring-1 focus:ring-[#D4A017]
            outline-none transition-all
          "
        />
      </div> */}

      {/* Filter Buttons */}
      <div className="md:col-span-4 lg:col-span-3 flex items-center gap-2 overflow-x-auto md:overflow-visible">
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