export default function SettingsLoading() {
  return (
    <div className="px-4 py-6 sm:px-6">
      <div className="mb-6 space-y-2">
        <div className="skeleton h-6 w-20 rounded-lg" />
        <div className="skeleton h-3.5 w-48 rounded-md" />
      </div>

      <div className="flex flex-col sm:flex-row gap-6">
        <div className="flex flex-row sm:flex-col gap-1 sm:w-44 shrink-0">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="skeleton h-10 rounded-xl flex-1 sm:flex-none" />
          ))}
        </div>
        <div className="flex-1 rounded-2xl border border-white/6 bg-[#111827]/80 p-6 space-y-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-1.5">
              <div className="skeleton h-3 w-20 rounded-md" />
              <div className="skeleton h-10 w-full rounded-xl" />
            </div>
          ))}
          <div className="skeleton h-10 w-28 rounded-xl" />
        </div>
      </div>
    </div>
  );
}
