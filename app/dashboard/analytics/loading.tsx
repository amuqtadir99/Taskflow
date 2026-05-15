export default function AnalyticsLoading() {
  return (
    <div className="px-6 py-6 space-y-6">
      {/* Heading */}
      <div className="space-y-2">
        <div className="skeleton h-6 w-28 rounded-lg" />
        <div className="skeleton h-3.5 w-52 rounded-md" />
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/6 bg-[#111827]/80 p-4 space-y-2">
            <div className="skeleton h-3 w-24 rounded-md" />
            <div className="skeleton h-8 w-20 rounded-lg" />
            <div className="skeleton h-5 w-14 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-2xl border border-white/6 bg-[#111827]/80 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1.5">
              <div className="skeleton h-4 w-36 rounded-md" />
              <div className="skeleton h-3 w-24 rounded-md" />
            </div>
            <div className="skeleton h-8 w-40 rounded-xl" />
          </div>
          <div className="skeleton h-[220px] rounded-xl" />
        </div>
        <div className="xl:col-span-1 rounded-2xl border border-white/6 bg-[#111827]/80 p-5 space-y-4">
          <div className="space-y-1.5">
            <div className="skeleton h-4 w-32 rounded-md" />
            <div className="skeleton h-3 w-20 rounded-md" />
          </div>
          <div className="skeleton h-[220px] rounded-xl" />
        </div>
      </div>
    </div>
  );
}
