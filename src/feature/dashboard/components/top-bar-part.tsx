
interface TopbarType {
    status: string;
    title: string;
    description: string;
}

function TopbarPart({status, title, description}: TopbarType) {
  return (
    <section className="bg-secondary-bg-0 p-8 rounded-lg">
      <p className="text-secondary-0 text-xs font-bold tracking-[0.5em] uppercase mb-2">
        {status}
      </p>
      <h1 className="text-white text-5xl font-bold tracking-tight mb-6">
        {title}
      </h1>
      <div className="flex items-center gap-3">
        <div className="size-3 rounded-full bg-success-0 shadow-[0_0_10px_#10B981]" />

        <p className="text-[#A3A3A3] text-lg font-medium">
          {description}
        </p>
      </div>
    </section>
  );
}

export default TopbarPart;
