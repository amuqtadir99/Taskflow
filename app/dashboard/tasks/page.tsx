"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutGrid,
  List,
  Plus,
  X,
  ChevronUp,
  ChevronDown,
  Calendar,
  ArrowUpDown,
} from "lucide-react";
import { KanbanColumn } from "@/components/dashboard/KanbanColumn";
import { mockTasks, type Task, type Priority, type TaskStatus } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type ViewMode = "kanban" | "list";
type SortField = "title" | "priority" | "status" | "dueDate" | "category";
type SortDir = "asc" | "desc";

const priorityOrder: Record<Priority, number> = { high: 0, medium: 1, low: 2 };
const statusOrder: Record<TaskStatus, number> = { inprogress: 0, todo: 1, done: 2 };

const priorityBadge: Record<Priority, string> = {
  high: "bg-red-500/20 text-red-400 border border-red-500/30",
  medium: "bg-amber-500/20 text-amber-400 border border-amber-500/30",
  low: "bg-slate-500/20 text-slate-400 border border-slate-500/30",
};

const statusBadge: Record<TaskStatus, string> = {
  todo: "bg-slate-500/20 text-slate-400",
  inprogress: "bg-blue-500/20 text-blue-400",
  done: "bg-emerald-500/20 text-emerald-400",
};

const statusLabel: Record<TaskStatus, string> = {
  todo: "To Do",
  inprogress: "In Progress",
  done: "Done",
};

export default function TasksPage() {
  const [view, setView] = useState<ViewMode>("kanban");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sortField, setSortField] = useState<SortField>("priority");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  // New task form state
  const [newTitle, setNewTitle] = useState("");
  const [newPriority, setNewPriority] = useState<Priority>("medium");
  const [newCategory, setNewCategory] = useState("Engineering");

  function handleSort(field: SortField) {
    if (field === sortField) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDir("asc");
    }
  }

  const sortedTasks = useMemo(() => {
    return [...mockTasks].sort((a, b) => {
      let cmp = 0;
      if (sortField === "priority") cmp = priorityOrder[a.priority] - priorityOrder[b.priority];
      else if (sortField === "status") cmp = statusOrder[a.status] - statusOrder[b.status];
      else cmp = String(a[sortField]).localeCompare(String(b[sortField]));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [sortField, sortDir]);

  function SortIcon({ field }: { field: SortField }) {
    if (sortField !== field) return <ArrowUpDown size={12} className="text-slate-600" />;
    return sortDir === "asc" ? (
      <ChevronUp size={12} className="text-indigo-400" />
    ) : (
      <ChevronDown size={12} className="text-indigo-400" />
    );
  }

  const columns: { title: string; status: TaskStatus; color: string }[] = [
    { title: "To Do", status: "todo", color: "#94a3b8" },
    { title: "In Progress", status: "inprogress", color: "#6366f1" },
    { title: "Done", status: "done", color: "#10b981" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full"
    >
      {/* Header bar */}
      <div className="flex flex-col gap-3 px-6 pt-6 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">Tasks</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            {mockTasks.length} tasks across {columns.length} columns
          </p>
        </div>
        <div className="flex items-center gap-2">
          {/* View toggle */}
          <div className="flex gap-0.5 rounded-xl border border-white/8 bg-white/5 p-0.5">
            <button
              onClick={() => setView("kanban")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                view === "kanban"
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <LayoutGrid size={13} /> Kanban
            </button>
            <button
              onClick={() => setView("list")}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition",
                view === "list"
                  ? "bg-indigo-500/20 text-indigo-300"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <List size={13} /> List
            </button>
          </div>

          {/* New Task */}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400"
          >
            <Plus size={13} /> New Task
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden px-6 pb-6">
        <AnimatePresence mode="wait">
          {view === "kanban" ? (
            <motion.div
              key="kanban"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex gap-4 h-full overflow-x-auto pb-2"
            >
              {columns.map((col) => (
                <KanbanColumn
                  key={col.status}
                  title={col.title}
                  accentColor={col.color}
                  tasks={mockTasks.filter((t) => t.status === col.status)}
                  onNewTask={col.status === "todo" ? () => setSheetOpen(true) : undefined}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="h-full overflow-auto"
            >
              <div className="rounded-2xl border border-white/6 bg-[#111827]/80 overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/5">
                      {(
                        [
                          { key: "title", label: "Task" },
                          { key: "priority", label: "Priority" },
                          { key: "status", label: "Status" },
                          { key: "category", label: "Category" },
                          { key: "dueDate", label: "Due Date" },
                        ] as { key: SortField; label: string }[]
                      ).map(({ key, label }) => (
                        <th
                          key={key}
                          className="px-4 py-3 text-left"
                        >
                          <button
                            onClick={() => handleSort(key)}
                            className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-300 transition"
                          >
                            {label}
                            <SortIcon field={key} />
                          </button>
                        </th>
                      ))}
                      <th className="px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Assignee
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTasks.map((task: Task, i) => (
                      <motion.tr
                        key={task.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className="border-b border-white/4 hover:bg-white/3 transition-colors group"
                      >
                        <td className="px-4 py-3 text-sm text-slate-200 font-medium max-w-xs">
                          <span className="truncate block">{task.title}</span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-[11px] font-semibold rounded-md px-1.5 py-0.5", priorityBadge[task.priority])}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={cn("text-[11px] font-medium rounded-md px-1.5 py-0.5", statusBadge[task.status])}>
                            {statusLabel[task.status]}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-xs text-slate-400">{task.category}</td>
                        <td className="px-4 py-3">
                          <span className="flex items-center gap-1 text-xs text-slate-400">
                            <Calendar size={11} />
                            {task.dueDate}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <div
                              className="h-6 w-6 rounded-lg flex items-center justify-center text-[10px] font-bold text-white"
                              style={{ background: task.assignee.avatar }}
                            >
                              {task.assignee.initials}
                            </div>
                            <span className="text-xs text-slate-400 hidden lg:block">{task.assignee.name}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* New Task Side Sheet */}
      <AnimatePresence>
        {sheetOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSheetOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-full max-w-sm bg-[#111827] border-l border-white/8 z-50 flex flex-col"
              style={{ boxShadow: "-8px 0 32px rgba(0,0,0,0.4)" }}
            >
              {/* Sheet header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/6">
                <div>
                  <h2 className="text-sm font-semibold text-slate-100">New Task</h2>
                  <p className="text-xs text-slate-500 mt-0.5">Add a task to the board</p>
                </div>
                <button
                  onClick={() => setSheetOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Form */}
              <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Task Title</label>
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="Enter task title…"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Priority</label>
                  <div className="flex gap-2">
                    {(["low", "medium", "high"] as Priority[]).map((p) => (
                      <button
                        key={p}
                        onClick={() => setNewPriority(p)}
                        className={cn(
                          "flex-1 rounded-xl border py-2 text-xs font-semibold capitalize transition",
                          newPriority === p
                            ? priorityBadge[p]
                            : "border-white/8 bg-white/5 text-slate-500 hover:text-slate-300"
                        )}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-indigo-500/40 appearance-none"
                  >
                    {["Engineering", "Design", "Analytics", "Infrastructure", "Operations", "AI/ML"].map((c) => (
                      <option key={c} value={c} className="bg-[#1a2235]">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Due Date</label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-indigo-500/40 [color-scheme:dark]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Optional description…"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 resize-none"
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-white/6 flex gap-2">
                <button
                  onClick={() => setSheetOpen(false)}
                  className="flex-1 rounded-xl border border-white/8 bg-white/5 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/8 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setSheetOpen(false)}
                  disabled={!newTitle.trim()}
                  className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Create Task
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
