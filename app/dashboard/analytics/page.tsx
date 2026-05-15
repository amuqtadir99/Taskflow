"use client";

import { motion } from "framer-motion";
import { ProductivityChart, TaskDistributionChart, KPIGrid } from "@/components/dashboard/AnalyticsCharts";

export default function AnalyticsPage() {
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
          <h1 className="text-xl font-bold tracking-tight text-slate-100">Analytics</h1>
          <p className="text-sm text-slate-500 mt-0.5">Team performance and task insights</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Live data · May 2026
        </div>
      </div>

      {/* KPI trend cards */}
      <KPIGrid />

      {/* Charts row */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* Area chart takes 2/3 */}
        <div className="xl:col-span-2">
          <ProductivityChart />
        </div>
        {/* Donut takes 1/3 */}
        <div className="xl:col-span-1">
          <TaskDistributionChart />
        </div>
      </div>
    </motion.div>
  );
}
