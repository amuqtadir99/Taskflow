export default function ReportsLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="skeleton h-6 w-20 rounded-lg" />
          <div className="skeleton h-3.5 w-52 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-9 w-16 rounded-xl" />
          <div className="skeleton h-9 w-16 rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5 space-y-2">
            <div className="skeleton h-3 w-28 rounded-md" />
            <div className="skeleton h-8 w-24 rounded-lg" />
            <div className="skeleton h-5 w-16 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="skeleton h-4 w-32 rounded-md" />
            <div className="skeleton h-3 w-48 rounded-md" />
          </div>
        </div>
        <div className="skeleton h-[260px] rounded-xl" />
      </div>
    </div>
  );
}
