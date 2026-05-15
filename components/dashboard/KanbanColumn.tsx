"use client";

import { motion } from "framer-motion";
import { Calendar, MoreHorizontal } from "lucide-react";
import { type Task, type Priority } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const priorityConfig: Record<Priority, { label: string; className: string }> = {
  low: { label: "Low", className: "bg-slate-500/20 text-slate-400 border-slate-500/30" },
  medium: { label: "Medium", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  high: { label: "High", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

interface TaskCardProps {
  task: Task;
  index: number;
}

function TaskCard({ task, index }: TaskCardProps) {
  const priority = priorityConfig[task.priority];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.04 }}
      className="group rounded-xl border border-white/6 bg-[#1a2235] p-3.5 card-hover cursor-pointer"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-[13px] font-medium text-slate-200 leading-snug">{task.title}</p>
        <button className="shrink-0 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg p-1 hover:bg-white/8 text-slate-500 hover:text-slate-300">
          <MoreHorizontal size={14} />
        </button>
      </div>

      <div className="mt-2.5 flex items-center gap-1.5">
        <span className="text-[10px] font-medium text-slate-500 bg-white/5 border border-white/8 rounded-md px-1.5 py-0.5">
          {task.category}
        </span>
        <span
          className={cn(
            "text-[10px] font-semibold rounded-md px-1.5 py-0.5 border",
            priority.className
          )}
        >
          {priority.label}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <Calendar size={11} />
          {task.dueDate}
        </div>
        <div
          className="h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white shadow-sm"
          style={{ background: task.assignee.avatar }}
          title={task.assignee.name}
        >
          {task.assignee.initials}
        </div>
      </div>
    </motion.div>
  );
}

interface KanbanColumnProps {
  title: string;
  accentColor: string;
  tasks: Task[];
  onNewTask?: () => void;
}

export function KanbanColumn({ title, accentColor, tasks, onNewTask }: KanbanColumnProps) {
  return (
    <div className="flex flex-col min-w-72 w-72 shrink-0">
      {/* Column header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: accentColor }}
          />
          <span className="text-sm font-semibold text-slate-200">{title}</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white/8 px-1.5 text-[11px] font-semibold text-slate-400">
            {tasks.length}
          </span>
        </div>
        {onNewTask && (
          <button
            onClick={onNewTask}
            className="text-[11px] text-slate-500 hover:text-indigo-400 transition-colors font-medium"
          >
            + Add
          </button>
        )}
      </div>

      {/* Cards */}
      <div className="flex flex-col gap-2.5">
        {tasks.map((task, i) => (
          <TaskCard key={task.id} task={task} index={i} />
        ))}
        {tasks.length === 0 && (
          <div className="rounded-xl border border-dashed border-white/8 py-8 flex items-center justify-center text-xs text-slate-600">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
