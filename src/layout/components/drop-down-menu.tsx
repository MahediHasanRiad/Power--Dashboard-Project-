import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardMenuButton } from "./menu";

interface SubItemType {
  text: string;
  Icon: LucideIcon;
  pageLink: string;
  onClick?: () => void;
}

interface MenuType {
  Icon: LucideIcon;
  text: string;
  subItems?: SubItemType[];
}

export function DashboardDropdownMenu({ Icon, text, subItems = [] }: MenuType) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full pl-6">
      {/* Parent Toggle Button */}
      <div className="pr-12">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            h-12 w-full flex items-center gap-4 
            rounded-r-2xl rounded-l-none
            transition-all duration-200
            cursor-pointer
            ${isOpen ? "bg-card-bg-0 text-secondary-0" : "text-gray-300 hover:bg-card-bg-0/50"}
          `}
        >
          <div className="flex items-center gap-4">
            <Icon className="size-5" />
            <span className="text-lg">{text}</span>
          </div>
          <ChevronDown 
            className={`size-4 transition-transform ${isOpen ? "rotate-180" : ""}`} 
          />
        </div>
      </div>

      {/* Sub-Items using DashboardMenuButton */}
      <div 
        className={`
          overflow-hidden transition-all duration-300
          ${isOpen ? "opacity-100 mt-1" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col ">
          {subItems.map((item, index) => (
            <div key={index} >
              <DashboardMenuButton
                Icon={item.Icon}
                text={item.text}
                pageLink={item.pageLink}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}