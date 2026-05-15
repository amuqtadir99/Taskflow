export default function HelpLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 space-y-8">
      <div className="space-y-2">
        <div className="skeleton h-6 w-36 rounded-lg" />
        <div className="skeleton h-3.5 w-64 rounded-md" />
      </div>

      <div className="skeleton h-12 w-full max-w-lg rounded-xl" />

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-white/6 bg-white/4 p-4 flex flex-col items-center gap-2">
            <div className="skeleton h-5 w-5 rounded-md" />
            <div className="skeleton h-3 w-16 rounded-md" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/6 bg-[#111827]/80 divide-y divide-white/5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between px-5 py-4">
            <div className="skeleton h-4 w-3/4 rounded-md" />
            <div className="skeleton h-4 w-4 rounded-md" />
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/6 bg-[#111827]/80 p-6 space-y-4 max-w-lg">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <div className="skeleton h-3 w-12 rounded-md" />
            <div className="skeleton h-10 rounded-xl" />
          </div>
          <div className="space-y-1.5">
            <div className="skeleton h-3 w-12 rounded-md" />
            <div className="skeleton h-10 rounded-xl" />
          </div>
        </div>
        <div className="space-y-1.5">
          <div className="skeleton h-3 w-16 rounded-md" />
          <div className="skeleton h-10 rounded-xl" />
        </div>
        <div className="space-y-1.5">
          <div className="skeleton h-3 w-16 rounded-md" />
          <div className="skeleton h-24 rounded-xl" />
        </div>
        <div className="skeleton h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}
