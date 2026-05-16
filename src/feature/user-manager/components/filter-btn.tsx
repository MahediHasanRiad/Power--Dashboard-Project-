import type { roleType } from "../redux/user-manager.thunk";

interface FilterBtnProps {
  filter: roleType; // Updated from string to roleType
  activeFilter: roleType; // Updated from string to roleType
  setActiveFilter: (filter: roleType) => void;
  setRoleHandler: (filter: roleType) => void;
}

export function FilterBtn({ filter, setActiveFilter, activeFilter, setRoleHandler }: FilterBtnProps) {
  return (
    <button
      onClick={() => {
        setActiveFilter(filter);
        setRoleHandler(filter);
      }}
      className={`
        h-10 md:h-12 
        px-4 md:px-6 
        text-xs md:text-sm 
        mx-1
        rounded-xl font-semibold transition-all flex-shrink-0
        ${filter === activeFilter 
          ? "bg-[#2C2616] text-[#D4A017] border border-[#D4A017]/30" 
          : "bg-[#1A1A1A] text-[#A3A3A3] hover:bg-[#262626] hover:text-white"
        }
      `}
    >
      {filter}
    </button>
  );
}