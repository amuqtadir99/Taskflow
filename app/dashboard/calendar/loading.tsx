export default function CalendarLoading() {
  return (
    <div className="flex flex-col h-full px-4 py-6 sm:px-6 gap-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton h-8 w-8 rounded-xl" />
          <div className="skeleton h-6 w-36 rounded-lg" />
          <div className="skeleton h-8 w-8 rounded-xl" />
        </div>
        <div className="flex gap-2">
          <div className="skeleton h-8 w-16 rounded-xl" />
          <div className="skeleton h-8 w-32 rounded-xl" />
          <div className="skeleton h-8 w-24 rounded-xl" />
        </div>
      </div>

      <div className="flex-1 rounded-2xl border border-white/6 bg-[#111827]/80 overflow-hidden">
        <div className="grid grid-cols-7 border-b border-white/5">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="py-3 flex justify-center">
              <div className="skeleton h-3 w-8 rounded-md" />
            </div>
          ))}
        </div>
        {Array.from({ length: 5 }).map((_, ri) => (
          <div key={ri} className="grid grid-cols-7 divide-x divide-white/4 border-b border-white/4 last:border-0">
            {Array.from({ length: 7 }).map((_, ci) => (
              <div key={ci} className="min-h-[80px] p-1.5">
                <div className="skeleton h-6 w-6 rounded-lg mb-1" />
                {Math.random() > 0.7 && <div className="skeleton h-4 w-full rounded mb-0.5" />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
