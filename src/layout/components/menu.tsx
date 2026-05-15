import type { LucideIcon } from "lucide-react";
import { NavLink } from "react-router";

interface MenuType {
  Icon: LucideIcon;
  text: string;
  pageLink: string;
}

export function DashboardMenuButton({ Icon, text, pageLink }: MenuType) {
  return (
    <NavLink to={`/${pageLink}`} className="w-full pr-12 pl-6 block group">
      {({ isActive }) => (
        <div
          className={`
            h-12 w-full flex items-center gap-4 
            rounded-r-2xl rounded-l-none
            transition-all duration-200
            cursor-pointer my-2
            ${
              isActive
                ? "bg-card-bg-0 text-secondary-0 border-l-4 border-secondary-0"
                : "text-gray-400 hover:bg-card-bg-0/50 hover:text-white"
            }
          `}
        >
          <Icon
            className={`size-5 transition-colors ${isActive ? "text-secondary-0 ml-2" : "group-hover:text-secondary-0"}`}
          />
          <span className="text-lg font-medium">{text}</span>
        </div>
      )}
    </NavLink>
  );
}
