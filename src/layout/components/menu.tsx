import type { LucideIcon } from "lucide-react";


interface MenuType {
  Icon: LucideIcon,
  text: string
}

export function DashboardMenuButton({Icon, text}: MenuType) {
  return (
    <div className="w-full pr-12 pl-6">
      <div
        className="
          h-12 
          w-full
          flex items-center gap-4 px-4
          rounded-r-2xl 
          rounded-l-none
          transition-colors
          hover:bg-primary-hover-0
          text-gray-300 
          cursor-pointer
          hover:text-secondary-0
        "
      >
        <Icon className="size-5 hover:text-secondary-text-0" />
        <span className="text-lg hover:text-secondary-text-0">{text}</span>
      </div>
    </div>
  );
}