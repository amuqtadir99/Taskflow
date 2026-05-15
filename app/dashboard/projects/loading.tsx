export default function ProjectsLoading() {
  return (
    <div className="px-4 py-6 sm:px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="skeleton h-6 w-24 rounded-lg" />
          <div className="skeleton h-3.5 w-56 rounded-md" />
        </div>
        <div className="skeleton h-9 w-28 rounded-xl" />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/6 bg-[#111827]/80 p-4 space-y-2">
            <div className="skeleton h-3.5 w-20 rounded-md" />
            <div className="skeleton h-8 w-10 rounded-lg" />
          </div>
        ))}
      </div>

      <div className="skeleton h-10 w-full rounded-xl" />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5 space-y-4">
            <div className="space-y-2">
              <div className="flex gap-1.5">
                <div className="skeleton h-5 w-16 rounded-md" />
                <div className="skeleton h-5 w-20 rounded-md" />
              </div>
              <div className="skeleton h-4 w-3/4 rounded-md" />
              <div className="skeleton h-3 w-full rounded-md" />
              <div className="skeleton h-3 w-2/3 rounded-md" />
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between">
                <div className="skeleton h-3 w-16 rounded-md" />
                <div className="skeleton h-3 w-8 rounded-md" />
              </div>
              <div className="skeleton h-1.5 w-full rounded-full" />
            </div>
            <div className="flex justify-between">
              <div className="flex -space-x-1.5">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="skeleton h-6 w-6 rounded-lg border-2 border-[#111827]" />
                ))}
              </div>
              <div className="skeleton h-3.5 w-16 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
