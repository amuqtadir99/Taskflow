import { cn } from "@/lib/utils";
import { MoreHorizontal, Mail, ExternalLink } from "lucide-react";

export interface Member {
  id: number;
  name: string;
  role: string;
  avatar: string;
  efficiency: number;
  tasks: number;
  status: "online" | "away" | "offline";
  department: string;
}

const statusColors = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
  offline: "bg-slate-600",
};

const efficiencyColor = (pct: number) => {
  if (pct >= 85) return "from-emerald-500 to-teal-400";
  if (pct >= 65) return "from-indigo-500 to-violet-400";
  return "from-amber-500 to-orange-400";
};

interface MemberCardProps {
  member: Member;
  loading?: boolean;
}

export function MemberCardSkeleton() {
  return (
    <div
      className="rounded-2xl border border-white/5 bg-[#111827] p-5"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.25)" }}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton h-10 w-10 rounded-xl" />
          <div className="space-y-2">
            <div className="skeleton h-3.5 w-28" />
            <div className="skeleton h-2.5 w-20" />
          </div>
        </div>
        <div className="skeleton h-6 w-6 rounded-lg" />
      </div>
      <div className="mt-5 space-y-2">
        <div className="flex justify-between">
          <div className="skeleton h-2.5 w-20" />
          <div className="skeleton h-2.5 w-10" />
        </div>
        <div className="skeleton h-1.5 w-full rounded-full" />
      </div>
      <div className="mt-4 flex gap-2">
        <div className="skeleton h-7 w-full rounded-lg" />
        <div className="skeleton h-7 w-full rounded-lg" />
      </div>
    </div>
  );
}

export function MemberCard({ member }: MemberCardProps) {
  const initials = member.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article
      className="card-hover group relative rounded-2xl border border-white/6 bg-gradient-to-b from-[#141c2e] to-[#111827] p-5"
      style={{
        boxShadow:
          "0 4px 16px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.05) inset",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md"
              style={{ background: member.avatar }}
            >
              {initials}
            </div>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#111827]",
                statusColors[member.status]
              )}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-100 leading-tight">
              {member.name}
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">{member.role}</p>
          </div>
        </div>

        <button className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/0 text-slate-600 opacity-0 transition-all group-hover:border-white/8 group-hover:bg-white/5 group-hover:opacity-100 group-hover:text-slate-400">
          <MoreHorizontal size={15} />
        </button>
      </div>

      {/* Department tag */}
      <div className="mt-3">
        <span className="inline-flex items-center rounded-full border border-white/8 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400">
          {member.department}
        </span>
      </div>

      {/* Efficiency */}
      <div className="mt-4">
        <div className="mb-1.5 flex items-center justify-between">
          <span className="text-[11px] font-medium text-slate-500">Efficiency</span>
          <span
            className={cn(
              "text-xs font-bold",
              member.efficiency >= 85
                ? "text-emerald-400"
                : member.efficiency >= 65
                ? "text-indigo-400"
                : "text-amber-400"
            )}
          >
            {member.efficiency}%
          </span>
        </div>
        <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-white/5">
          <div
            className={cn(
              "progress-bar h-full rounded-full bg-gradient-to-r",
              efficiencyColor(member.efficiency)
            )}
            style={
              {
                "--progress-width": `${member.efficiency}%`,
                width: `${member.efficiency}%`,
              } as React.CSSProperties
            }
          />
        </div>
      </div>

      {/* Tasks count */}
      <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2">
        <span className="text-[11px] text-slate-500">Active Tasks</span>
        <span className="text-xs font-semibold text-slate-300">{member.tasks}</span>
      </div>

      {/* Action buttons */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button className="flex items-center justify-center gap-1.5 rounded-xl border border-white/8 bg-white/5 py-1.5 text-[11px] font-medium text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
          <Mail size={12} />
          Message
        </button>
        <button className="flex items-center justify-center gap-1.5 rounded-xl border border-indigo-500/20 bg-indigo-500/10 py-1.5 text-[11px] font-medium text-indigo-300 transition hover:bg-indigo-500/20 hover:text-indigo-200">
          <ExternalLink size={12} />
          Profile
        </button>
      </div>
    </article>
  );
}
