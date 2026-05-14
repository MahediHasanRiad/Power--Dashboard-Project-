import { Search } from "lucide-react";
import { useState } from "react";
import { FilterBtn } from "./filter-btn";

export function SearchFilterBar() {
  const filters = ["All", "Buyer", "Seller", "Provider"];
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="grid grid-cols-1 md:grid-cols-12 items-center w-full">
      {/* Search Input - Takes full width on mobile, 8 columns on medium+ */}
      <div className="relative md:col-span-6 lg:col-span-6 ml-2 mb-3 md:mb-0">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="size-5 text-[#A3A3A3]" />
        </div>
        <input
          type="text"
          placeholder="Search by name, email, or role..."
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
      </div>

      {/* Filter Buttons - Takes full width on mobile, 4 columns on medium+ */}
      <div className="md:col-span-4 lg:col-span-3 flex items-center gap-2 overflow-x-auto md:overflow-visible">
        {filters.map((filter) => (
          <FilterBtn
            key={filter}
            filter={filter}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        ))}
      </div>
    </section>
  );
}
