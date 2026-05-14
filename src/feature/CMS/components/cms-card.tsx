interface CardType {
  title: string;
  description: string;
  border?: boolean;
}

export function CMSCard({title, description, border = false}: CardType) {
  return (
    <section className="mx-4">
        <div className="relative bg-card-bg-0 rounded-2xl p-6 w-full max-w-xs overflow-hidden">
        {/* Golden Left Accent Border from Screenshot 2026-05-14 144925.png */}
        {border && <div className={`absolute left-0 top-3 bottom-3 w-1 bg-secondary-0 rounded-r-full`} />}

        <div className="flex flex-col gap-1 pl-2">
          {/* Title */}
          <h3 className="text-white text-xl md:text-md sm:text-sm font-bold tracking-tight">
            {title}
          </h3>

          {/* Subtext */}
          <p className="text-[#A3A3A3] text-[10px] md:text-md ">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
