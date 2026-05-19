import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, ShieldX } from "lucide-react";

const BLOCK_OPTIONS = [
  { value: "ACTIVE", label: "ACTIVE" },
  { value: "PENDING", label: "PENDING" },
  { value: "DEACTIVE", label: "DEACTIVE" },
  { value: "SUSPEND", label: "SUSPEND" },
  { value: "DELETE", label: "DELETE" },
  { value: "DISMISS_REPORT", label: "DISMISS_REPORT" },
];

interface ReportDialogProps {
  open: boolean;
  onClose: () => void;
  description: string;
  reason: string;
  onBlock?: (reason: string) => void;
  updateStatus: (status: string) => void
}

export function UserReportDetails({
  open,
  onClose,
  description,
  reason,
  onBlock,
  updateStatus,
}: ReportDialogProps) {
  const [blockOpen, setBlockOpen] = useState(false);
  const [selectedBlock, setSelectedBlock] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setBlockOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    if (!open) {
      setSelectedBlock("");
      setBlockOpen(false);
    }
  }, [open]);

  const handleConfirm = () => {
    updateStatus(selectedBlock);
    onBlock?.(selectedBlock);
    setBlockOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-[#111] border border-[#2a2a2a] text-white p-0 overflow-hidden rounded-2xl">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#2a2a2a]">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-widest">
              <ShieldX size={10} />
              Report Details
            </span>
          </div>
        </DialogHeader>

        {/* Body */}
        <div className="p-6 flex flex-col gap-4">
          {/* Reason */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
              Reason
            </p>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-white leading-relaxed">
              {reason
                ? reason.charAt(0).toUpperCase() +
                  reason.slice(1).toLowerCase().replace(/_/g, " ")
                : "—"}
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#555]">
              Description
            </p>
            <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-4 py-3 text-sm text-[#A3A3A3] leading-relaxed min-h-[80px]">
              {description || "—"}
            </div>
          </div>

          {/* Block select button */}
          <div ref={dropdownRef} className="relative w-full mt-1">
            <button
              onClick={() => setBlockOpen((prev) => !prev)}
              className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold uppercase tracking-widest transition-all flex items-center justify-between
                ${
                  selectedBlock
                    ? "border-red-500/60 text-red-400 bg-red-500/10"
                    : "border-red-500/30 text-red-400 hover:bg-red-500/10"
                }`}
            >
              <span className="flex items-center gap-2">
                <ShieldX size={13} />
                {selectedBlock
                  ? BLOCK_OPTIONS.find((o) => o.value === selectedBlock)?.label
                  : "Block User"}
              </span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${blockOpen ? "rotate-180" : ""}`}
              />
            </button>

            {blockOpen && (
              <div className="absolute bottom-full mb-2 left-0 w-full bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl shadow-xl z-50 overflow-hidden">
                {BLOCK_OPTIONS.map((opt) => {
                  const isSelected = selectedBlock === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => setSelectedBlock(opt.value)}
                      className="w-full flex items-center justify-between px-4 py-2.5 text-xs text-left hover:bg-[#2a2a2a] transition-colors"
                    >
                      <span
                        className={
                          isSelected ? "text-red-400" : "text-[#A3A3A3]"
                        }
                      >
                        {opt.label}
                      </span>
                      {isSelected && (
                        <Check size={12} className="text-red-400 shrink-0" />
                      )}
                    </button>
                  );
                })}

                {selectedBlock && (
                  <div className="border-t border-[#2a2a2a] p-2">
                    <button
                      onClick={handleConfirm}
                      className="w-full py-2 rounded-lg bg-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-widest hover:bg-red-500/30 transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
