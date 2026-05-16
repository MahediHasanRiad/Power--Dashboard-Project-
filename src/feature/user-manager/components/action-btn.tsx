import { MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/store";
import { updateStatusThunk } from "../redux/updateStatus.thunk";
import { toast } from "sonner";

interface ActionBtnProps {
  status: string[];  
  userId: string;
  initialUserStatus: StatusType; 
}

export type StatusType = "PENDING" | "ACTIVE" | "REJECTED";

export function ActionBtn({ status, userId, initialUserStatus }: ActionBtnProps) {

  const [currentStatus, setCurrentStatus] = useState<StatusType>(initialUserStatus);
  const dispatch = useDispatch<AppDispatch>();


  useEffect(() => {
    setCurrentStatus(initialUserStatus);
  }, [initialUserStatus]);

  const statusHandler = async (newStatus: StatusType) => {
   
    setCurrentStatus(newStatus);

    try {
      await dispatch(
        updateStatusThunk({
          userId,
          currentStatus: newStatus,
        })
      ).unwrap();

      toast.success('Status updated successfully !!!');
    } catch (error) {
      toast.error("Failed to update status");

      setCurrentStatus(initialUserStatus);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 outline-none"
        >
          <MoreVertical className="size-4" />
          <span className="sr-only">Open status menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-48 bg-card-bg-0 border border-neutral-800 text-neutral-300 rounded-xl p-1"
      >
        <DropdownMenuGroup>
          {status.map((item, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => statusHandler(item as StatusType)}
              className="flex items-center gap-2 px-2 py-2 text-sm rounded-lg cursor-pointer focus:bg-card-bg-0 focus:text-secondary-0 outline-none transition-colors"
            >
              <span className={item === currentStatus ? "text-[#D4A017] font-semibold" : ""}>
                {item}
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}