export default function MessagesLoading() {
  return (
    <div className="flex h-full overflow-hidden">
      {/* Left pane skeleton */}
      <div className="w-full md:w-72 lg:w-80 border-r border-white/6 bg-[#111827]/60 flex flex-col shrink-0">
        <div className="px-4 pt-5 pb-3 border-b border-white/5 space-y-3">
          <div className="skeleton h-5 w-24 rounded-md" />
          <div className="skeleton h-8 w-full rounded-xl" />
        </div>
        <div className="flex-1 py-2 space-y-1">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3">
              <div className="skeleton h-9 w-9 rounded-xl shrink-0" />
              <div className="flex-1 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="skeleton h-3.5 w-28 rounded-md" />
                  <div className="skeleton h-3 w-6 rounded-md" />
                </div>
                <div className="skeleton h-3 w-40 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right pane skeleton (desktop only) */}
      <div className="flex-1 hidden md:flex flex-col">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5">
          <div className="skeleton h-9 w-9 rounded-xl shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="skeleton h-4 w-32 rounded-md" />
            <div className="skeleton h-3 w-24 rounded-md" />
          </div>
          <div className="flex gap-1">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="skeleton h-8 w-8 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="skeleton h-16 w-16 rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
