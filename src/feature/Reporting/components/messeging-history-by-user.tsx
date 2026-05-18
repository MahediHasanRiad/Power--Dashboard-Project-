import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface ReportDialogProps {
  open: boolean
  onClose: () => void
  report: {
    id: number
    reason: string
    description: string
    adminAction: string
    status: string
    reporter: { fullname: string; displayname: string; profile_image: string }
    reportedUser: { fullname: string; displayname: string; profile_image: string }
  }
  onBlock?: () => void
  onResolve?: () => void
  onEscalate?: () => void
}

export function ReportDialog({
  open,
  onClose,
  report,
  onBlock,
  onResolve,
  onEscalate,
}: ReportDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-card-bg-0 border border-[#2a2a2a] text-white p-0 overflow-hidden">

        <DialogHeader className="px-5 pt-5 pb-3 border-b border-[#2a2a2a]">
          <DialogTitle className="text-white text-base">
            Report #{report.id} —{" "}
            <span className="text-[#A3A3A3] font-normal">
              {report.reason.replace(/_/g, " ")}
            </span>
          </DialogTitle>
          <DialogDescription className="text-[#525252] text-xs">
            Review the report and take action below.
          </DialogDescription>
        </DialogHeader>

        {/* Body */}
        <div className="flex gap-3 p-4">

          {/* Conversation panel */}
          <div className="flex-1 bg-card-bg-0 border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-4 min-w-0">

            {/* Reporter — left aligned */}
            <div className="flex gap-3 items-start">
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarImage src={report.reporter.profile_image} />
                <AvatarFallback className="bg-blue-500/15 text-blue-400 text-xs font-semibold">
                  {report.reporter.fullname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 max-w-[75%]">
                <span className="text-[11px] text-[#525252]">
                  {report.reporter.fullname}{" "}
                  <span className="text-[#3a3a3a]">·</span>{" "}
                  {report.reporter.displayname}
                </span>
                <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2 text-sm text-[#d4d4d4] leading-relaxed">
                  {report.description}
                </div>
              </div>
            </div>

            {/* Reported user — right aligned */}
            <div className="flex gap-3 items-start flex-row-reverse">
              <Avatar className="w-9 h-9 shrink-0">
                <AvatarImage src={report.reportedUser.profile_image} />
                <AvatarFallback className="bg-red-500/15 text-red-400 text-xs font-semibold">
                  {report.reportedUser.fullname[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 items-end max-w-[75%]">
                <span className="text-[11px] text-[#525252]">
                  {report.reportedUser.fullname}{" "}
                  <span className="text-[#3a3a3a]">·</span>{" "}
                  {report.reportedUser.displayname}
                </span>
                <div className="bg-red-500/5 border border-red-500/15 rounded-xl px-3 py-2 text-sm text-[#d4d4d4] leading-relaxed">
                  {report.adminAction || "No response yet."}
                </div>
              </div>
            </div>

          </div>

          {/* Action buttons */}
          <div className="w-32 flex flex-col gap-2 shrink-0">
            <button
              type="button"
              onClick={onBlock}
              className="w-full px-3 py-2 rounded-lg border border-red-500/20 text-red-400 text-sm font-medium hover:bg-red-500/10 transition-all active:scale-95"
            >
              Block
            </button>
            <button
              type="button"
              onClick={onResolve}
              className="w-full px-3 py-2 rounded-lg border border-[#2a2a2a] text-[#A3A3A3] text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition-all active:scale-95"
            >
              Resolve
            </button>
            <button
              type="button"
              onClick={onEscalate}
              className="w-full px-3 py-2 rounded-lg border border-[#2a2a2a] text-[#A3A3A3] text-sm font-medium hover:bg-[#1a1a1a] hover:text-white transition-all active:scale-95"
            >
              Escalate
            </button>
          </div>

        </div>

        <DialogFooter className="px-4 pb-4 border-t border-[#2a2a2a] pt-3">
          <DialogClose asChild>
            <Button variant="outline" onClick={onClose} className="text-[#A3A3A3] border-[#2a2a2a]">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  )
}