"use client";

import { Search, Bell, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TopBarProps {
  className?: string;
}

export function TopBar({ className }: TopBarProps) {
  return (
    <header
      className={cn(
        "flex h-16 shrink-0 items-center justify-between border-b border-white/5 bg-[#111827]/60 px-6 backdrop-blur-sm",
        className
      )}
    >
      {/* Search */}
      <div className="relative w-80 max-w-full">
        <Search
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search members, tasks…"
          className="w-full rounded-xl border border-white/8 bg-white/5 py-2 pl-9 pr-12 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-indigo-500/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-indigo-500/20"
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">
          ⌘K
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        {/* Notification bell */}
        <button className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-slate-200">
          <Bell size={16} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-indigo-400 ring-1 ring-[#111827]" />
        </button>

        {/* User profile */}
        <button className="flex items-center gap-2.5 rounded-xl border border-white/8 bg-white/5 py-1.5 pl-1.5 pr-3 text-sm transition hover:bg-white/10">
          <div className="relative">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center text-xs font-bold text-white shadow">
              JD
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-[#111827] bg-emerald-400" />
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-semibold text-slate-200 leading-tight">Jane Doe</div>
            <div className="text-[10px] text-slate-500 leading-tight">Admin</div>
          </div>
          <ChevronDown size={13} className="text-slate-500" />
        </button>
      </div>
    </header>
  );
}
