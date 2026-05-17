// Define the structure for Reason Styles
export const REASON_STYLES: Record<string, string> = {
  "FRAUD ATTEMPT": "bg-red-900/20 text-red-400 border-red-900/30",
  HARASSMENT: "bg-zinc-800/50 text-zinc-400 border-zinc-700/50",
  "POLICY VIOLATION": "bg-zinc-800/50 text-zinc-400 border-zinc-700/50",
  default: "bg-zinc-900/50 text-zinc-500 border-zinc-800",
};

// Define the structure for Status Styles
export const STATUS_STYLES: Record<string, { dot: string; label: string }> = {
  "Pending Review": { dot: "bg-[#F87171]", label: "Pending Review" },
  "In Progress": { dot: "bg-[#FBBF24]", label: "In Progress" },
  Resolved: { dot: "bg-[#34D399]", label: "Resolved" },
  default: { dot: "bg-zinc-500", label: "Unknown" },
};