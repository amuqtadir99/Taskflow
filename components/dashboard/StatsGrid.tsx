import { Users, TrendingUp, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  gradient: string;
  iconBg: string;
  trend?: string;
  trendUp?: boolean;
}

function StatCard({
  label,
  value,
  sub,
  icon: Icon,
  gradient,
  iconBg,
  trend,
  trendUp,
}: StatCardProps) {
  return (
    <div
      className={cn(
        "card-hover relative overflow-hidden rounded-2xl border border-white/7 p-5",
        gradient
      )}
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.04) inset, 0 4px 16px rgba(0,0,0,0.3)" }}
    >
      {/* Subtle pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-slate-500">{label}</p>
          <p className="mt-1.5 text-3xl font-bold tracking-tight text-slate-100">{value}</p>
          {sub && <p className="mt-0.5 text-xs text-slate-400">{sub}</p>}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl shadow-lg",
            iconBg
          )}
        >
          <Icon size={20} className="text-white" />
        </div>
      </div>

      {trend && (
        <div className="relative mt-4 flex items-center gap-1.5">
          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[11px] font-semibold",
              trendUp
                ? "bg-emerald-500/15 text-emerald-400"
                : "bg-red-500/15 text-red-400"
            )}
          >
            {trendUp ? "+" : ""}{trend}
          </span>
          <span className="text-xs text-slate-500">vs last month</span>
        </div>
      )}
    </div>
  );
}

export function StatsGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <StatCard
        label="Total Members"
        value="512"
        sub="Across all teams"
        icon={Users}
        gradient="bg-gradient-to-br from-[#1a1f35] to-[#111827]"
        iconBg="bg-gradient-to-br from-indigo-500 to-violet-600 shadow-indigo-500/30"
        trend="12 new"
        trendUp
      />
      <StatCard
        label="Avg Efficiency"
        value="88%"
        sub="Team performance score"
        icon={TrendingUp}
        gradient="bg-gradient-to-br from-[#1a2435] to-[#111827]"
        iconBg="bg-gradient-to-br from-cyan-500 to-blue-600 shadow-cyan-500/30"
        trend="3.2%"
        trendUp
      />
      <StatCard
        label="Active Tasks"
        value="39"
        sub="In progress right now"
        icon={CheckCircle2}
        gradient="bg-gradient-to-br from-[#1a2420] to-[#111827]"
        iconBg="bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/30"
        trend="5 completed"
        trendUp
      />
    </div>
  );
}
