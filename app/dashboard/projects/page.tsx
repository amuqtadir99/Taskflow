"use client";

import { useState, useMemo, useId } from "react";
import { motion } from "framer-motion";
import { Search, X, FolderOpen, TrendingUp, TrendingDown, CheckCircle2, AlertTriangle, Clock, Users } from "lucide-react";
import * as Tooltip from "@radix-ui/react-tooltip";
import { mockProjects, type Project, type ProjectStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusConfig: Record<ProjectStatus, { label: string; className: string; icon: React.ElementType }> = {
  "on-track": { label: "On Track", className: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30", icon: TrendingUp },
  "at-risk": { label: "At Risk", className: "bg-amber-500/15 text-amber-400 border-amber-500/30", icon: AlertTriangle },
  "completed": { label: "Completed", className: "bg-indigo-500/15 text-indigo-400 border-indigo-500/30", icon: CheckCircle2 },
  "planning": { label: "Planning", className: "bg-slate-500/15 text-slate-400 border-slate-500/30", icon: Clock },
};

const categoryColors: Record<string, string> = {
  "Design": "bg-violet-500/20 text-violet-400",
  "Engineering": "bg-blue-500/20 text-blue-400",
  "AI/ML": "bg-pink-500/20 text-pink-400",
  "Analytics": "bg-cyan-500/20 text-cyan-400",
  "Infrastructure": "bg-amber-500/20 text-amber-400",
  "Operations": "bg-emerald-500/20 text-emerald-400",
};

function ProgressBar({ value, label }: { value: number; label: string }) {
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label}
      className="w-full"
    >
      <div className="h-1.5 w-full rounded-full bg-white/8 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function AvatarGroup({ members, projectName }: { members: Project["team"]; projectName: string }) {
  return (
    <Tooltip.Provider delayDuration={200}>
      <div className="flex -space-x-1.5" aria-label={`Team: ${members.map(m => m.name).join(", ")}`}>
        {members.map((m) => (
          <Tooltip.Root key={m.initials}>
            <Tooltip.Trigger asChild>
              <div
                className="h-6 w-6 rounded-lg border-2 border-[#111827] flex items-center justify-center text-[9px] font-bold text-white cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-1 focus-visible:ring-offset-[#111827]"
                style={{ background: m.avatar }}
                tabIndex={0}
                aria-label={`${m.name} on ${projectName}`}
              >
                {m.initials}
              </div>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content
                className="rounded-lg bg-[#1a2235] border border-white/10 px-2.5 py-1.5 text-xs text-slate-200 shadow-xl"
                sideOffset={6}
              >
                {m.name}
                <Tooltip.Arrow className="fill-[#1a2235]" />
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
        ))}
      </div>
    </Tooltip.Provider>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const StatusIcon = statusConfig[project.status].icon;
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      aria-label={`Project: ${project.name}`}
      className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5 card-hover flex flex-col gap-4"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={cn("text-[10px] font-medium rounded-md px-1.5 py-0.5", categoryColors[project.category] ?? "bg-slate-500/20 text-slate-400")}>
              {project.category}
            </span>
            <span className={cn("inline-flex items-center gap-1 text-[10px] font-semibold rounded-md px-1.5 py-0.5 border", statusConfig[project.status].className)}>
              <StatusIcon size={10} aria-hidden="true" />
              {statusConfig[project.status].label}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-slate-100 truncate">{project.name}</h3>
          <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{project.description}</p>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5 text-[11px]">
          <span className="text-slate-500">{project.tasksDone}/{project.tasksTotal} tasks</span>
          <span className="font-semibold text-slate-300">{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress} label={`${project.name} progress: ${project.progress}%`} />
      </div>

      <div className="flex items-center justify-between">
        <AvatarGroup members={project.team} projectName={project.name} />
        <div className="flex items-center gap-1 text-[11px] text-slate-500">
          <Clock size={11} aria-hidden="true" />
          <span>Due {project.dueDate}</span>
        </div>
      </div>
    </motion.article>
  );
}

const STATS = [
  { label: "Total Projects", getValue: (p: Project[]) => p.length, icon: FolderOpen, color: "text-indigo-400" },
  { label: "On Track", getValue: (p: Project[]) => p.filter(x => x.status === "on-track").length, icon: TrendingUp, color: "text-emerald-400" },
  { label: "At Risk", getValue: (p: Project[]) => p.filter(x => x.status === "at-risk").length, icon: AlertTriangle, color: "text-amber-400" },
  { label: "Completed", getValue: (p: Project[]) => p.filter(x => x.status === "completed").length, icon: CheckCircle2, color: "text-violet-400" },
];

export default function ProjectsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const searchId = useId();
  const resultsId = useId();

  const filtered = useMemo(() => {
    return mockProjects.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || p.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [search, statusFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-4 py-6 sm:px-6 space-y-6"
    >
      {/* Heading */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">Projects</h1>
          <p className="text-sm text-slate-500 mt-0.5">Track progress across all active initiatives</p>
        </div>
        <button
          className="self-start sm:self-auto flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-4 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f1a]"
          aria-label="Add new project"
        >
          <FolderOpen size={14} aria-hidden="true" /> New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {STATS.map(({ label, getValue, icon: Icon, color }) => (
          <div
            key={label}
            className="rounded-2xl border border-white/6 bg-[#111827]/80 p-4 card-hover"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Icon size={14} className={color} aria-hidden="true" />
              <span className="text-[11px] font-medium text-slate-500">{label}</span>
            </div>
            <p className="text-2xl font-bold text-slate-100">{getValue(mockProjects)}</p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <label htmlFor={searchId} className="sr-only">Search projects</label>
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" aria-hidden="true" />
          <input
            id={searchId}
            type="search"
            placeholder="Search projects…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-controls={resultsId}
            className="w-full rounded-xl border border-white/8 bg-white/5 py-2.5 pl-9 pr-9 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-0.5 text-slate-500 hover:text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Status filter pills */}
        <div role="group" aria-label="Filter by status" className="flex flex-wrap gap-1.5">
          {(["all", "on-track", "at-risk", "planning", "completed"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              aria-pressed={statusFilter === s}
              className={cn(
                "rounded-xl border px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                statusFilter === s
                  ? "border-indigo-500/50 bg-indigo-500/15 text-indigo-300"
                  : "border-white/8 bg-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/8"
              )}
            >
              {s === "all" ? "All" : statusConfig[s].label}
            </button>
          ))}
        </div>
      </div>

      {/* Results */}
      <div id={resultsId}>
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
        </p>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/8 bg-white/5">
              <Users size={24} className="text-slate-600" aria-hidden="true" />
            </div>
            <p className="text-sm font-medium text-slate-300">No projects found</p>
            <p className="mt-1 text-xs text-slate-500">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
