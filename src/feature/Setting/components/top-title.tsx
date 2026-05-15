import { type LucideIcon } from "lucide-react";

export default function TopTitle({ Icon, text }: { Icon: LucideIcon, text: string }) {
  return (
    <div className="flex items-center gap-3 mb-12">
      <Icon className="size-6 text-secondary-0" />
      <h1 className="text-white text-2xl font-bold tracking-tight">
        {text}
      </h1>
    </div>
  );
}
