export default function TasksLoading() {
  return (
    <div className="flex flex-col h-full px-6 py-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-2">
          <div className="skeleton h-6 w-24 rounded-lg" />
          <div className="skeleton h-3.5 w-40 rounded-md" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-8 w-32 rounded-xl" />
          <div className="skeleton h-8 w-28 rounded-xl" />
        </div>
      </div>

      {/* Kanban columns skeleton */}
      <div className="flex gap-4 overflow-hidden">
        {[
          { count: 4, width: "w-72" },
          { count: 3, width: "w-72" },
          { count: 3, width: "w-72" },
        ].map((col, ci) => (
          <div key={ci} className={`flex flex-col ${col.width} shrink-0 gap-3`}>
            <div className="flex items-center gap-2">
              <div className="skeleton h-2.5 w-2.5 rounded-full" />
              <div className="skeleton h-4 w-20 rounded-md" />
              <div className="skeleton h-5 w-6 rounded-full" />
            </div>
            {Array.from({ length: col.count }).map((_, i) => (
              <div key={i} className="rounded-xl border border-white/6 bg-[#1a2235] p-3.5 space-y-2.5">
                <div className="skeleton h-4 w-full rounded-md" />
                <div className="skeleton h-3 w-3/4 rounded-md" />
                <div className="flex gap-1.5">
                  <div className="skeleton h-5 w-16 rounded-md" />
                  <div className="skeleton h-5 w-12 rounded-md" />
                </div>
                <div className="flex items-center justify-between">
                  <div className="skeleton h-3.5 w-16 rounded-md" />
                  <div className="skeleton h-6 w-6 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
