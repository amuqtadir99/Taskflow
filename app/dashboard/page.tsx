"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, UserPlus, Search, ChevronDown } from "lucide-react";
import { StatsGrid } from "@/components/dashboard/StatsGrid";
import { MemberCard, MemberCardSkeleton, type Member } from "@/components/dashboard/MemberCard";
import { cn } from "@/lib/utils";

const members: Member[] = [
  { id: 1, name: "Alice Johnson", role: "Lead Engineer", avatar: "linear-gradient(135deg,#6366f1,#8b5cf6)", efficiency: 94, tasks: 8, status: "online", department: "Engineering" },
  { id: 2, name: "Bob Martinez", role: "Product Designer", avatar: "linear-gradient(135deg,#0ea5e9,#2dd4bf)", efficiency: 87, tasks: 5, status: "online", department: "Design" },
  { id: 3, name: "Carol Chen", role: "Data Analyst", avatar: "linear-gradient(135deg,#f59e0b,#ef4444)", efficiency: 72, tasks: 12, status: "away", department: "Analytics" },
  { id: 4, name: "David Kim", role: "Backend Dev", avatar: "linear-gradient(135deg,#10b981,#059669)", efficiency: 91, tasks: 7, status: "online", department: "Engineering" },
  { id: 5, name: "Emma Wilson", role: "UX Researcher", avatar: "linear-gradient(135deg,#ec4899,#a855f7)", efficiency: 83, tasks: 4, status: "offline", department: "Design" },
  { id: 6, name: "Frank Lee", role: "DevOps Engineer", avatar: "linear-gradient(135deg,#f97316,#eab308)", efficiency: 78, tasks: 9, status: "online", department: "Infrastructure" },
  { id: 7, name: "Grace Park", role: "Frontend Dev", avatar: "linear-gradient(135deg,#3b82f6,#6366f1)", efficiency: 96, tasks: 6, status: "online", department: "Engineering" },
  { id: 8, name: "Henry Brown", role: "Scrum Master", avatar: "linear-gradient(135deg,#14b8a6,#0ea5e9)", efficiency: 89, tasks: 11, status: "away", department: "Operations" },
  { id: 9, name: "Iris Thompson", role: "ML Engineer", avatar: "linear-gradient(135deg,#a855f7,#ec4899)", efficiency: 85, tasks: 3, status: "online", department: "AI/ML" },
];

const departments = ["All", "Engineering", "Design", "Analytics", "Infrastructure", "Operations", "AI/ML"];

export default function DashboardPage() {
  const [search, setSearch] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [showSkeleton, setShowSkeleton] = useState(false);

  const filtered = members.filter((m) => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.role.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === "All" || m.department === selectedDept;
    return matchSearch && matchDept;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-6 py-6 space-y-6"
    >
      {/* Page heading */}
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">
            Team Management
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor and manage your team&apos;s performance
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live · Updated just now
        </div>
      </div>

      {/* Stats */}
      <StatsGrid />

      {/* Member grid section */}
      <div
        className="rounded-2xl border border-white/6 bg-[#111827]/80"
        style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
      >
        {/* Section header */}
        <div className="flex flex-col gap-3 border-b border-white/5 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Team Members</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {filtered.length} of {members.length} members shown
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-40 rounded-xl border border-white/8 bg-white/5 py-1.5 pl-8 pr-3 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
              />
            </div>

            {/* Department filter */}
            <div className="relative">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="appearance-none cursor-pointer rounded-xl border border-white/8 bg-white/5 py-1.5 pl-3 pr-7 text-xs text-slate-300 outline-none focus:border-indigo-500/40"
              >
                {departments.map((d) => (
                  <option key={d} value={d} className="bg-[#1a2235] text-slate-200">
                    {d}
                  </option>
                ))}
              </select>
              <ChevronDown size={11} className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-500" />
            </div>

            {/* Filter toggle */}
            <button
              onClick={() => setShowSkeleton((v) => !v)}
              className={cn(
                "flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-medium transition",
                showSkeleton
                  ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
                  : "border-white/8 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200"
              )}
            >
              <SlidersHorizontal size={12} />
              {showSkeleton ? "Loading…" : "Filter"}
            </button>

            {/* Add member */}
            <button className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400">
              <UserPlus size={12} />
              Add Member
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="p-5">
          {showSkeleton ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <MemberCardSkeleton key={i} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/8 bg-white/5">
                <Search size={20} className="text-slate-500" />
              </div>
              <p className="text-sm font-medium text-slate-300">No members found</p>
              <p className="mt-1 text-xs text-slate-500">Try adjusting your search or filter</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
