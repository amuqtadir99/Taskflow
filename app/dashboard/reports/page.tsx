"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import { TrendingUp, TrendingDown, Download, FileText } from "lucide-react";
import { burndownData, reportSummary, type BurndownPoint } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const tooltipStyle = {
  backgroundColor: "#1a2235",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#f1f5f9",
};

function SummaryCard({ label, value, unit, change }: { label: string; value: string; unit: string; change: number }) {
  const positive = change > 0;
  const isPositiveGood = label !== "Avg. Cycle Time";
  const isGood = isPositiveGood ? positive : !positive;
  return (
    <div
      className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5 card-hover"
      style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
    >
      <p className="text-xs font-medium text-slate-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-slate-100 leading-tight">
        {value}
        <span className="text-sm font-normal text-slate-500 ml-1">{unit}</span>
      </p>
      <div
        className={cn(
          "mt-2 inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[11px] font-semibold",
          isGood ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
        )}
        aria-label={`${positive ? "Increased" : "Decreased"} by ${Math.abs(change)}%`}
      >
        {positive ? <TrendingUp size={11} aria-hidden="true" /> : <TrendingDown size={11} aria-hidden="true" />}
        {positive ? "+" : ""}{change}%
      </div>
    </div>
  );
}

function KeyboardBurndownChart() {
  const [mounted, setMounted] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [announcement, setAnnouncement] = useState("");
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  const announce = useCallback((index: number) => {
    const point = burndownData[index];
    setAnnouncement(
      `${point.day}: Planned ${point.planned} points, Actual ${point.actual} points`
    );
    setFocusedIndex(index);
  }, []);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = focusedIndex === null ? 0 : Math.min(focusedIndex + 1, burndownData.length - 1);
      announce(next);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = focusedIndex === null ? burndownData.length - 1 : Math.max(focusedIndex - 1, 0);
      announce(prev);
    } else if (e.key === "Home") {
      e.preventDefault();
      announce(0);
    } else if (e.key === "End") {
      e.preventDefault();
      announce(burndownData.length - 1);
    }
  }

  const focused = focusedIndex !== null ? burndownData[focusedIndex] : null;

  return (
    <div className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="text-sm font-semibold text-slate-100">Sprint Burndown</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Planned vs actual remaining story points
          </p>
        </div>
        <p className="text-[11px] text-slate-600 max-w-48 text-right hidden sm:block">
          Press Tab to focus, then use ← → arrow keys to navigate data points
        </p>
      </div>

      {/* Keyboard-navigable chart wrapper */}
      <div
        ref={chartRef}
        role="img"
        aria-label="Sprint burndown chart. Use arrow keys to navigate between data points."
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onFocus={() => focusedIndex === null && announce(0)}
        className="relative outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827] rounded-xl"
      >
        {/* ARIA live region for announcements */}
        <span role="status" aria-live="polite" aria-atomic="true" className="sr-only">
          {announcement}
        </span>

        {mounted ? (
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={burndownData} margin={{ top: 5, right: 5, left: -28, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="day" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Legend
                formatter={(value) => (
                  <span style={{ color: "#94a3b8", fontSize: "12px" }}>{value}</span>
                )}
              />
              <Line
                type="monotone"
                dataKey="planned"
                name="Planned"
                stroke="#6366f1"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                strokeDasharray="6 3"
              />
              <Line
                type="monotone"
                dataKey="actual"
                name="Actual"
                stroke="#10b981"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
              />
              {focused && (
                <>
                  <ReferenceDot
                    x={focused.day}
                    y={focused.planned}
                    r={5}
                    fill="#6366f1"
                    stroke="white"
                    strokeWidth={2}
                    label={{ value: `${focused.planned}`, fill: "#a5b4fc", fontSize: 11, position: "top" }}
                  />
                  <ReferenceDot
                    x={focused.day}
                    y={focused.actual}
                    r={5}
                    fill="#10b981"
                    stroke="white"
                    strokeWidth={2}
                    label={{ value: `${focused.actual}`, fill: "#6ee7b7", fontSize: 11, position: "bottom" }}
                  />
                </>
              )}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-[260px] skeleton rounded-xl" />
        )}
      </div>

      {/* Focused point callout */}
      <AnimatedCallout point={focused} />

      {/* Screen-reader data table */}
      <table className="sr-only" aria-label="Burndown chart data">
        <caption>Sprint burndown: planned vs actual remaining story points</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Planned (points)</th>
            <th scope="col">Actual (points)</th>
          </tr>
        </thead>
        <tbody>
          {burndownData.map((row) => (
            <tr key={row.day}>
              <td>{row.day}</td>
              <td>{row.planned}</td>
              <td>{row.actual}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function AnimatedCallout({ point }: { point: BurndownPoint | null }) {
  if (!point) return null;
  return (
    <motion.div
      key={point.day}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-3 flex items-center gap-4 rounded-xl bg-white/5 border border-white/6 px-4 py-2.5 text-xs"
      aria-hidden="true"
    >
      <span className="text-slate-500 font-medium">{point.day}</span>
      <span className="flex items-center gap-1 text-indigo-400">
        <span className="h-1.5 w-4 rounded-full bg-indigo-500 inline-block" /> Planned: <strong>{point.planned}</strong>
      </span>
      <span className="flex items-center gap-1 text-emerald-400">
        <span className="h-1.5 w-4 rounded-full bg-emerald-500 inline-block" /> Actual: <strong>{point.actual}</strong>
      </span>
    </motion.div>
  );
}

export default function ReportsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-4 py-6 sm:px-6 space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">Reports</h1>
          <p className="text-sm text-slate-500 mt-0.5">Monthly output and sprint analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            aria-label="Export to CSV"
            className="flex items-center gap-1.5 rounded-xl border border-white/8 bg-white/5 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-white/8 hover:text-slate-100 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Download size={13} aria-hidden="true" /> CSV
          </button>
          <button
            aria-label="Export to PDF"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0b0f1a]"
          >
            <FileText size={13} aria-hidden="true" /> PDF
          </button>
        </div>
      </div>

      {/* Summary cards */}
      <section aria-labelledby="summary-heading">
        <h2 id="summary-heading" className="sr-only">Summary metrics</h2>
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {reportSummary.map((s) => (
            <SummaryCard key={s.label} {...s} />
          ))}
        </div>
      </section>

      {/* Burndown chart */}
      <section aria-labelledby="burndown-heading">
        <h2 id="burndown-heading" className="sr-only">Sprint burndown chart</h2>
        <KeyboardBurndownChart />
      </section>
    </motion.div>
  );
}
