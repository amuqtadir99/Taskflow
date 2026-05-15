"use client";

import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown } from "lucide-react";
import { dailyData, weeklyData, monthlyData, categoryData, kpiMetrics } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type TimeRange = "daily" | "weekly" | "monthly";
const dataMap = { daily: dailyData, weekly: weeklyData, monthly: monthlyData };

const tooltipStyle = {
  backgroundColor: "#1a2235",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "12px",
  fontSize: "12px",
  color: "#f1f5f9",
  boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
};

export function ProductivityChart() {
  const [range, setRange] = useState<TimeRange>("daily");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const data = dataMap[range];

  return (
    <div className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Team Productivity</h3>
          <p className="text-xs text-slate-500 mt-0.5">Efficiency score over time</p>
        </div>
        <div className="flex gap-0.5 rounded-xl border border-white/8 bg-white/5 p-0.5">
          {(["daily", "weekly", "monthly"] as TimeRange[]).map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all capitalize",
                range === r
                  ? "bg-indigo-500/20 text-indigo-300 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {mounted ? (
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={data} margin={{ top: 5, right: 5, left: -28, bottom: 0 }}>
            <defs>
              <linearGradient id="gradProductivity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="date" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} domain={[50, 100]} />
            <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(99,102,241,0.25)", strokeWidth: 1 }} />
            <Area
              type="monotone"
              dataKey="productivity"
              name="Productivity %"
              stroke="#6366f1"
              strokeWidth={2}
              fill="url(#gradProductivity)"
              dot={false}
              activeDot={{ r: 4, fill: "#6366f1", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[220px] skeleton rounded-xl" />
      )}
    </div>
  );
}

export function TaskDistributionChart() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="rounded-2xl border border-white/6 bg-[#111827]/80 p-5" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
      <div className="mb-5">
        <h3 className="text-sm font-semibold text-slate-100">Task Distribution</h3>
        <p className="text-xs text-slate-500 mt-0.5">By category</p>
      </div>

      {mounted ? (
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="45%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) => [`${value}%`, "Share"]}
            />
            <Legend
              iconType="circle"
              iconSize={7}
              formatter={(value) => (
                <span style={{ color: "#94a3b8", fontSize: "11px" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[220px] skeleton rounded-xl" />
      )}
    </div>
  );
}

export function KPIGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {kpiMetrics.map((metric) => {
        const positive = metric.change > 0;
        return (
          <div
            key={metric.label}
            className="rounded-2xl border border-white/6 bg-[#111827]/80 p-4 card-hover"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            <p className="text-[11px] font-medium text-slate-500 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold text-slate-100 leading-tight">
              {metric.value}
              <span className="text-sm font-medium text-slate-500 ml-0.5">{metric.unit}</span>
            </p>
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-1 rounded-lg px-1.5 py-0.5 text-[11px] font-semibold",
                positive
                  ? "bg-emerald-500/15 text-emerald-400"
                  : "bg-red-500/15 text-red-400"
              )}
            >
              {positive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
              {positive ? "+" : ""}{metric.change}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
