import { Search } from "lucide-react";
import { useState } from "react";
import { FilterBtn } from "./filter-btn";


export function SearchFilterBar() {
  const filters = ["All", "Buyer", "Seller", "Provider"];
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <section className="grid items-center gap-4 w-full p-4">
      {/* Search Input Container */}
      <div className="relative md:grid-cols-3 lg:grid-cols-6">
        <div className="absolute inset-y-0 left-4 grid items-center pointer-events-none">
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
            rounded-xl
            border-none
            focus:ring-1 focus:ring-[#D4A017]
            outline-none
            transition-all
          "
        />
      </div>

      {/* Filter Buttons */}
      <div className="md:grid-cols-3 lg:grid-cols-6 items-center gap-2">
        {filters.map((filter) => (
          <FilterBtn
            filter={filter}
            setActiveFilter={setActiveFilter}
            activeFilter={activeFilter}
          />
        ))}
      </div>
    </section>
  );
}
