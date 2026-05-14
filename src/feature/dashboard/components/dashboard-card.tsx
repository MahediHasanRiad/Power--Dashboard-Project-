import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";

interface StatusType {
  title: string;
  users: string;
  data: string;
  Icon: LucideIcon;
  down?: boolean;
}

export function DashboardStatsCard({
  title,
  Icon,
  users,
  data,
  down = false,
}: StatusType) {
  return (
    <div className="relative bg-card-bg-0 rounded-xl p-6 min-w-[320px] overflow-hidden m-3">
      {/* Golden Left Accent Border from Screenshot 2026-05-14 113838.png */}
      <div className="absolute left-0 top-2 bottom-2 w-1 bg-secondary-0 rounded-r-full" />

      <div className="flex flex-col gap-1">
        {/* Header Row */}
        <div className="flex justify-between items-start">
          <p className="text-gray-500 text-xs font-bold tracking-[0.15em] uppercase">
            {title}
          </p>
          <Icon className="text-secondary-0 size-5" />
        </div>

        {/* Main Statistic */}
        <h2 className="text-white text-4xl font-bold mt-2">{users}</h2>

        {/* Growth Indicator */}
        {down == false ? (
          <div className="flex items-center gap-1.5 mt-4">
            <TrendingUp className="text-success-0 size-4" />
            <span className="text-success-0 text-sm font-semibold">
              +{data}%
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 mt-4">
            <TrendingDown className="text-fail-0 size-4" />
            <span className="text-fail-0 text-sm font-semibold">
              +{data}%
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
