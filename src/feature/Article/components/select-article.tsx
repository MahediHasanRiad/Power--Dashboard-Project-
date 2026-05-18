import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EllipsisVertical } from "lucide-react";

interface SelectCardType {
  selectHandler: (data: "Edit" | "Delete") => void;
}

export function SelectCard({ selectHandler }: SelectCardType) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-8 h-8 p-0 flex items-center justify-center border-none bg-black/40 hover:bg-black/60 rounded-md focus:outline-none">
        <EllipsisVertical size={16} className="text-white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-card-bg-0 border border-[#2a2a2a] min-w-28">
        <DropdownMenuItem
          className="text-[#A3A3A3] hover:text-white cursor-pointer text-sm"
          onClick={() => selectHandler("Edit")}
        >
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-red-500 hover:text-red-400 cursor-pointer text-sm"
          onClick={() => selectHandler("Delete")}
        >
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
