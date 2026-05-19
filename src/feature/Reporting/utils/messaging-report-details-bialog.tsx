import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

interface ReportDetails {
  reason: string;
  description: string;
  image: string;
  reportedUserId?: number;
}

interface MessagingReportDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  details: ReportDetails;
  altText?: string;
  onSuspend?: () => void;
  onResolve?: (reason: any) => void; // ← single string now
}
export type resolvedType = 'ACTIVE' | 'PENDING' | 'DEACTIVE' | 'SUSPEND' | 'DELETE' | 'DISMISS_REPORT'
const RESOLVE_OPTIONS = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "PENDING", label: "PENDING" },
  { value: "DEACTIVE", label: "DEACTIVE" },
  { value: "SUSPEND", label: "SUSPEND" },
  { value: "DELETE", label: "DELETE" },
  { value: "DISMISS_REPORT", label: "DISMISS_REPORT" },
];

export function MessagingReportDetailsDialog({
  open,
  onClose,
  details,
  altText = "Report details",
  onSuspend,
  onResolve,
}: MessagingReportDetailsDialogProps) {
  const navigate = useNavigate();
  const [resolveOpen, setResolveOpen] = useState(false);
  const [selectedResolve, setSelectedResolve] = useState<string>("ACTIVE"); 
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResolveOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      setSelectedResolve("ACTIVE");
      setResolveOpen(false);
    }
  }, [open]);

  const handleMessage = () => {
    onClose();
    navigate(`/messages/${details.reportedUserId}`);
  };

  const handleConfirmResolve = async () => {
    console.log('s', selectedResolve)
    onResolve?.(selectedResolve);
    setResolveOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-[#1a1a1a] border border-[#2a2a2a] rounded-2xl">
        <VisuallyHidden.Root>
          <DialogTitle>{altText}</DialogTitle>
        </VisuallyHidden.Root>

        <div className="p-5 flex flex-col gap-4">
          <p className="text-[#A3A3A3] text-xs uppercase tracking-widest font-semibold">
            Details
          </p>

          <div className="bg-[#111] border border-[#2a2a2a] rounded-xl p-4 flex flex-col gap-4">
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3">
              <p className="text-[#A3A3A3] text-xs uppercase tracking-widest mb-1">Reason</p>
              <p className="text-white text-sm">{details.reason || "—"}</p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg px-4 py-3 min-h-[100px]">
              <p className="text-[#A3A3A3] text-xs uppercase tracking-widest mb-1">Description</p>
              <p className="text-white text-sm leading-relaxed">
                {details.description || "—"}
              </p>
            </div>

            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-lg overflow-hidden min-h-[120px] flex items-center justify-center">
              {details.image ? (
                <img
                  src={details.image}
                  alt={altText}
                  className="w-full h-auto object-contain max-h-[200px]"
                />
              ) : (
                <p className="text-[#555] text-xs">No image provided</p>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-1">
            {/* Suspend */}
            <button
              onClick={onSuspend}
              className="flex-1 py-2.5 rounded-lg border border-red-500/40 text-red-400 text-xs font-semibold uppercase tracking-widest hover:bg-red-500/10 transition-colors"
            >
              Suspend
            </button>

            {/* Resolve — single-select dropdown */}
            <div ref={dropdownRef} className="flex-1 relative">
              <button
                onClick={() => setResolveOpen((prev) => !prev)}
                className={`w-full py-2.5 rounded-lg border text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5
                  ${selectedResolve
                    ? "border-green-500/60 text-green-400 bg-green-500/10"
                    : "border-green-500/40 text-green-400 hover:bg-green-500/10"
                  }`}
              >
                {selectedResolve
                  ? RESOLVE_OPTIONS.find((o) => o.value === selectedResolve)?.label
                  : "Resolve"}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${resolveOpen ? "rotate-180" : ""}`}
                />
              </button>

              {resolveOpen && (
                <div className="absolute bottom-full mb-2 left-0 w-52 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-xl z-50 overflow-hidden">
                  {RESOLVE_OPTIONS.map((opt) => {
                    const isSelected = selectedResolve === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setSelectedResolve(opt.value)} // ← just set, no toggle
                        className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-left hover:bg-[#2a2a2a] transition-colors"
                      >
                        <span className={isSelected ? "text-green-400" : "text-[#A3A3A3]"}>
                          {opt.label}
                        </span>
                        {isSelected && <Check size={12} className="text-green-400 shrink-0" />}
                      </button>
                    );
                  })}

                  {/* Confirm — only shows when something is selected */}
                  {selectedResolve && (
                    <div className="border-t border-[#2a2a2a] p-2">
                      <button
                        onClick={handleConfirmResolve}
                        className="w-full py-2 rounded-lg bg-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-widest hover:bg-green-500/30 transition-colors"
                      >
                        Confirm
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Message */}
            <button
              onClick={handleMessage}
              className="flex-1 py-2.5 rounded-lg bg-secondary-0 text-black text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
            >
              Message
              <span className="text-base leading-none">→</span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}