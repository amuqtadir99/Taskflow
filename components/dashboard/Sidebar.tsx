"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  CheckSquare,
  FolderOpen,
  BarChart2,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
  { icon: FolderOpen, label: "Projects", href: "/dashboard/projects" },
  { icon: BarChart2, label: "Analytics", href: "/dashboard/analytics" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: FileText, label: "Reports", href: "/dashboard/reports" },
  { icon: MessageSquare, label: "Messages", href: "/dashboard/messages", badge: 3 },
];

const bottomItems = [
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  { icon: HelpCircle, label: "Help & Support", href: "/dashboard/help" },
];

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: number;
  collapsed: boolean;
}

function NavItem({ icon: Icon, label, href, active, badge, collapsed }: NavItemProps) {
  return (
    <li>
      <Link
        href={href}
        aria-current={active ? "page" : undefined}
        className={cn(
          "relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 group",
          active
            ? "bg-indigo-500/15 text-indigo-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
        )}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 rounded-full bg-indigo-400" />
        )}
        <Icon
          size={18}
          className={cn(
            "shrink-0 transition-colors",
            active ? "text-indigo-400" : "text-slate-500 group-hover:text-slate-300"
          )}
        />
        {!collapsed && <span className="truncate">{label}</span>}
        {!collapsed && badge && (
          <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/20 px-1 text-xs font-semibold text-indigo-300">
            {badge}
          </span>
        )}
        {collapsed && badge && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-indigo-400" />
        )}
      </Link>
    </li>
  );
}

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside
      className={cn(
        "glass-sidebar relative flex h-full flex-col transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          "flex h-16 shrink-0 items-center border-b border-white/5 px-4",
          collapsed ? "justify-center" : "gap-2.5"
        )}
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/20">
          <Zap size={16} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <span className="text-sm font-bold tracking-tight text-slate-100">Taskflow</span>
            <div className="text-[10px] font-medium text-slate-500 -mt-0.5">Pro Dashboard</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav aria-label="Main navigation" className="flex flex-1 flex-col overflow-y-auto px-2 py-4">
        {!collapsed && (
          <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Main Menu
          </div>
        )}
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <NavItem
              key={item.label}
              {...item}
              active={isActive(item.href)}
              collapsed={collapsed}
            />
          ))}
        </ul>

        <div className={cn("mt-auto pt-4", !collapsed && "border-t border-white/5")}>
          {!collapsed && (
            <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
              Account
            </div>
          )}
          <ul className="space-y-0.5">
            {bottomItems.map((item) => (
              <NavItem
                key={item.label}
                {...item}
                active={isActive(item.href)}
                collapsed={collapsed}
              />
            ))}
          </ul>
        </div>
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-[#111827] text-slate-400 shadow-md transition-all hover:bg-indigo-500/10 hover:text-indigo-300"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}
