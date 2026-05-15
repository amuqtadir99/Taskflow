"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
  addMonths,
  subMonths,
  parseISO,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus, X, CalendarDays, List } from "lucide-react";
import { mockCalendarEvents, type CalendarEvent } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: "bg-indigo-500/80",
  Design: "bg-violet-500/80",
  Operations: "bg-cyan-500/80",
  "AI/ML": "bg-pink-500/80",
  Infrastructure: "bg-amber-500/80",
};

type ViewMode = "month" | "agenda";

function buildCalendarGrid(month: Date): Date[][] {
  const start = startOfWeek(startOfMonth(month), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(month), { weekStartsOn: 1 });
  const rows: Date[][] = [];
  let current = start;
  while (current <= end) {
    const week: Date[] = [];
    for (let i = 0; i < 7; i++) {
      week.push(current);
      current = addDays(current, 1);
    }
    rows.push(week);
  }
  return rows;
}

function getEventsForDay(day: Date, events: CalendarEvent[]) {
  return events.filter((e) => isSameDay(parseISO(e.date), day));
}

interface EventModalProps {
  day: Date | null;
  events: CalendarEvent[];
  onClose: () => void;
  titleId: string;
}

function EventModal({ day, events, onClose, titleId }: EventModalProps) {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("09:00");
  const [category, setCategory] = useState("Engineering");
  const inputId = useId();
  const timeId = useId();
  const catId = useId();

  if (!day) return null;
  const dayEvents = getEventsForDay(day, events);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, scale: 0.95, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm rounded-2xl border border-white/8 bg-[#111827] p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 id={titleId} className="text-sm font-semibold text-slate-100">
              {format(day, "EEEE, MMMM d")}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">{dayEvents.length} event{dayEvents.length !== 1 ? "s" : ""}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close event modal"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <X size={15} aria-hidden="true" />
          </button>
        </div>

        {dayEvents.length > 0 && (
          <ul className="mb-4 space-y-1.5" aria-label="Existing events">
            {dayEvents.map((e) => (
              <li key={e.id} className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-xs">
                <span
                  className="h-2 w-2 rounded-full shrink-0"
                  style={{ background: e.color }}
                  aria-hidden="true"
                />
                <span className="text-slate-300 font-medium">{e.title}</span>
                {e.time && <span className="ml-auto text-slate-500">{e.time}</span>}
              </li>
            ))}
          </ul>
        )}

        <fieldset className="space-y-3 border-0 p-0 m-0">
          <legend className="text-xs font-semibold text-slate-400 mb-2">Add new event</legend>

          <div>
            <label htmlFor={inputId} className="block text-xs font-medium text-slate-400 mb-1">Title</label>
            <input
              id={inputId}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Event title…"
              className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor={timeId} className="block text-xs font-medium text-slate-400 mb-1">Time</label>
              <input
                id={timeId}
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-sm text-slate-300 outline-none focus:border-indigo-500/50 [color-scheme:dark]"
              />
            </div>
            <div>
              <label htmlFor={catId} className="block text-xs font-medium text-slate-400 mb-1">Category</label>
              <select
                id={catId}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-sm text-slate-300 outline-none focus:border-indigo-500/50 appearance-none"
              >
                {Object.keys(CATEGORY_COLORS).map((c) => (
                  <option key={c} value={c} className="bg-[#1a2235]">{c}</option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <div className="flex gap-2 mt-5">
          <button
            onClick={onClose}
            className="flex-1 rounded-xl border border-white/8 bg-white/5 py-2 text-sm font-medium text-slate-400 hover:text-slate-200 hover:bg-white/8 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            disabled={!title.trim()}
            className="flex-1 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-2 text-sm font-semibold text-white shadow-md disabled:opacity-40 disabled:cursor-not-allowed transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
          >
            Add Event
          </button>
        </div>
      </motion.div>
    </>
  );
}

const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // May 2026
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [view, setView] = useState<ViewMode>("month");
  const modalTitleId = useId();

  const today = new Date(2026, 4, 15); // simulated today per system date
  const grid = buildCalendarGrid(currentMonth);

  // Agenda: all events in current month sorted by date
  const agendaEvents = mockCalendarEvents
    .filter((e) => isSameMonth(parseISO(e.date), currentMonth))
    .sort((a, b) => a.date.localeCompare(b.date));

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex flex-col h-full px-4 py-6 sm:px-6 gap-5"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth((m) => subMonths(m, 1))}
            aria-label="Previous month"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ChevronLeft size={15} aria-hidden="true" />
          </button>
          <h1 className="text-lg font-bold text-slate-100 min-w-40 text-center" aria-live="polite">
            {format(currentMonth, "MMMM yyyy")}
          </h1>
          <button
            onClick={() => setCurrentMonth((m) => addMonths(m, 1))}
            aria-label="Next month"
            className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/8 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <ChevronRight size={15} aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentMonth(new Date(2026, 4, 1))}
            className="rounded-xl border border-white/8 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/8 hover:text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            Today
          </button>

          <div role="group" aria-label="Calendar view" className="flex gap-0.5 rounded-xl border border-white/8 bg-white/5 p-0.5">
            <button
              onClick={() => setView("month")}
              aria-pressed={view === "month"}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                view === "month" ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <CalendarDays size={13} aria-hidden="true" /> Month
            </button>
            <button
              onClick={() => setView("agenda")}
              aria-pressed={view === "agenda"}
              className={cn(
                "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                view === "agenda" ? "bg-indigo-500/20 text-indigo-300" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <List size={13} aria-hidden="true" /> Agenda
            </button>
          </div>

          <button
            onClick={() => setSelectedDay(today)}
            aria-label="Add event"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1.5 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f1a]"
          >
            <Plus size={13} aria-hidden="true" /> Add Event
          </button>
        </div>
      </div>

      {/* Calendar body */}
      <AnimatePresence mode="wait">
        {view === "month" ? (
          <motion.div
            key="month"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-auto rounded-2xl border border-white/6 bg-[#111827]/80"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            {/* Weekday headers */}
            <div className="grid grid-cols-7 border-b border-white/5" role="row">
              {WEEKDAYS.map((d) => (
                <div
                  key={d}
                  role="columnheader"
                  aria-label={d}
                  className="py-3 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-600"
                >
                  {d}
                </div>
              ))}
            </div>

            {/* Grid rows */}
            <div role="grid" aria-label={`Calendar for ${format(currentMonth, "MMMM yyyy")}`}>
              {grid.map((week, wi) => (
                <div key={wi} role="row" className="grid grid-cols-7 divide-x divide-white/4 border-b border-white/4 last:border-0">
                  {week.map((day, di) => {
                    const dayEvents = getEventsForDay(day, mockCalendarEvents);
                    const inMonth = isSameMonth(day, currentMonth);
                    const isCurrentDay = isSameDay(day, today);
                    return (
                      <button
                        key={di}
                        role="gridcell"
                        aria-label={`${format(day, "EEEE MMMM d")}${dayEvents.length > 0 ? `, ${dayEvents.length} event${dayEvents.length !== 1 ? "s" : ""}` : ""}`}
                        aria-pressed={selectedDay ? isSameDay(day, selectedDay) : false}
                        onClick={() => setSelectedDay(day)}
                        className={cn(
                          "min-h-[80px] p-1.5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500",
                          inMonth ? "hover:bg-white/3" : "opacity-30",
                          isCurrentDay && "bg-indigo-500/8"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-6 w-6 items-center justify-center rounded-lg text-xs font-semibold mb-1",
                            isCurrentDay
                              ? "bg-indigo-500 text-white"
                              : inMonth
                              ? "text-slate-300"
                              : "text-slate-600"
                          )}
                        >
                          {format(day, "d")}
                        </span>
                        <div className="space-y-0.5">
                          {dayEvents.slice(0, 2).map((e) => (
                            <div
                              key={e.id}
                              className={cn(
                                "rounded px-1 py-0.5 text-[10px] font-medium text-white truncate",
                                CATEGORY_COLORS[e.category] ?? "bg-slate-500/80"
                              )}
                              aria-hidden="true"
                            >
                              {e.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-[10px] text-slate-500 pl-1" aria-hidden="true">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="agenda"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex-1 overflow-auto space-y-2"
            aria-label="Event agenda"
          >
            {agendaEvents.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <CalendarDays size={32} className="text-slate-700 mb-3" aria-hidden="true" />
                <p className="text-sm text-slate-500">No events this month</p>
              </div>
            ) : (
              agendaEvents.map((e, i) => (
                <motion.article
                  key={e.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 rounded-2xl border border-white/6 bg-[#111827]/80 px-5 py-4"
                >
                  <div
                    className="h-3 w-3 rounded-full shrink-0"
                    style={{ background: e.color }}
                    aria-hidden="true"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-200">{e.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{e.category}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs font-medium text-slate-300">{format(parseISO(e.date), "MMM d")}</p>
                    {e.time && <p className="text-[11px] text-slate-500">{e.time}</p>}
                  </div>
                </motion.article>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Event modal */}
      <AnimatePresence>
        {selectedDay && (
          <EventModal
            day={selectedDay}
            events={mockCalendarEvents}
            onClose={() => setSelectedDay(null)}
            titleId={modalTitleId}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
