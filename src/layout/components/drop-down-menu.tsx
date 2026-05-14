import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { DashboardMenuButton } from "./menu";

interface SubItemType {
  text: string;
  Icon: LucideIcon;
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
    <div className="w-full">
      {/* Parent Toggle Button */}
      <div className="pr-12 pl-6">
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            h-12 w-full flex items-center justify-between px-4
            rounded-r-2xl cursor-pointer transition-all group
            ${isOpen ? "bg-[#1A1A1A] text-[#D4A017]" : "text-gray-300 hover:bg-[#1A1A1A]/50"}
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
          ${isOpen ? "max-h-96 opacity-100 mt-1" : "max-h-0 opacity-0"}
        `}
      >
        <div className="flex flex-col gap-1">
          {subItems.map((item, index) => (
            <div key={index} className="pl-6 scale-95 origin-left opacity-80 hover:opacity-100 transition-opacity">
              <DashboardMenuButton
                Icon={item.Icon}
                text={item.text}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}