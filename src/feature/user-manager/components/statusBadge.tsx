

  export function StatusBadgeField({ status }: { status: string }) {
    // Normalize key to uppercase to safely check mappings
    const currentStatus = status?.toUpperCase() || "PENDING";

    const statusStyles: Record<string, string> = {
      VERIFIED:
        "bg-[#2C2616] text-[#D4A017] border-[#D4A017]/30 shadow-[0_0_8px_rgba(212,160,23,0.1)]",
      PENDING: "bg-[#1A1A1A] text-[#A3A3A3] border-[#262626]",
      REJECTED:
        "bg-[#2A1A1A] text-[#F87171] border-[#F87171]/30 shadow-[0_0_8px_rgba(248,113,113,0.05)]",
      ACTIVE:
        "bg-[#14291F] text-[#34D399] border-[#34D399]/20 shadow-[0_0_8px_rgba(52,211,153,0.1)]",
    };

    const dotStyles: Record<string, string> = {
      VERIFIED: "bg-[#D4A017]",
      PENDING: "bg-[#A3A3A3]",
      REJECTED: "bg-[#F87171]",
      ACTIVE: "bg-[#34D399] animate-pulse",
    };

    return (
      <div
        className={`flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold tracking-wider w-fit select-none uppercase ${
          statusStyles[currentStatus] ?? statusStyles.PENDING
        }`}
      >
        <div
          className={`size-1.5 rounded-full ${
            dotStyles[currentStatus] ?? dotStyles.PENDING
          }`}
        />
        {status}
      </div>
    );
  };

