"use client";

import { useState, useId } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import * as Tabs from "@radix-ui/react-tabs";
import * as Switch from "@radix-ui/react-switch";
import {
  User,
  Shield,
  Bell,
  CreditCard,
  Check,
  Eye,
  EyeOff,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Zod schemas ────────────────────────────────────────────────────────────────

const generalSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  bio: z.string().max(200, "Bio must be under 200 characters").optional(),
  timezone: z.string().min(1, "Timezone is required"),
});
type GeneralData = z.infer<typeof generalSchema>;

const securitySchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
type SecurityData = z.infer<typeof securitySchema>;

// ── Re-usable form field ───────────────────────────────────────────────────────

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${id}-error`;
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-xs font-semibold text-slate-400">
        {label}
      </label>
      {children}
      {error && (
        <p id={errorId} role="alert" className="flex items-center gap-1.5 text-xs text-red-400">
          <AlertCircle size={11} aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

function inputClass(hasError?: boolean) {
  return cn(
    "w-full rounded-xl border bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition",
    "focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500/50",
    hasError
      ? "border-red-500/50 focus:ring-red-500/20"
      : "border-white/8"
  );
}

function SaveBanner({ visible }: { visible: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      aria-live="polite"
      aria-atomic="true"
      className="flex items-center gap-2 rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-2.5 text-sm font-medium text-emerald-400"
    >
      <Check size={14} aria-hidden="true" />
      Changes saved successfully
    </motion.div>
  );
}

// ── Tab: General ──────────────────────────────────────────────────────────────

function GeneralTab() {
  const [saved, setSaved] = useState(false);
  const nameId = useId();
  const emailId = useId();
  const bioId = useId();
  const tzId = useId();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<GeneralData>({
    resolver: zodResolver(generalSchema),
    defaultValues: { name: "Jane Doe", email: "jane@taskflow.io", bio: "Senior PM at Taskflow.", timezone: "UTC+0" },
  });

  function onSubmit(_data: GeneralData) {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 max-w-lg">
      <Field id={nameId} label="Full Name" error={errors.name?.message}>
        <input
          id={nameId}
          type="text"
          autoComplete="name"
          aria-describedby={errors.name ? `${nameId}-error` : undefined}
          aria-invalid={!!errors.name}
          className={inputClass(!!errors.name)}
          {...register("name")}
        />
      </Field>

      <Field id={emailId} label="Email Address" error={errors.email?.message}>
        <input
          id={emailId}
          type="email"
          autoComplete="email"
          aria-describedby={errors.email ? `${emailId}-error` : undefined}
          aria-invalid={!!errors.email}
          className={inputClass(!!errors.email)}
          {...register("email")}
        />
      </Field>

      <Field id={bioId} label="Bio" error={errors.bio?.message}>
        <textarea
          id={bioId}
          rows={3}
          aria-describedby={errors.bio ? `${bioId}-error` : undefined}
          aria-invalid={!!errors.bio}
          className={cn(inputClass(!!errors.bio), "resize-none")}
          {...register("bio")}
        />
      </Field>

      <Field id={tzId} label="Timezone" error={errors.timezone?.message}>
        <select
          id={tzId}
          aria-invalid={!!errors.timezone}
          className={cn(inputClass(!!errors.timezone), "appearance-none")}
          {...register("timezone")}
        >
          {["UTC-8 (PST)", "UTC-5 (EST)", "UTC+0 (GMT)", "UTC+1 (CET)", "UTC+5:30 (IST)", "UTC+8 (CST)", "UTC+9 (JST)"].map((tz) => (
            <option key={tz} value={tz} className="bg-[#1a2235]">{tz}</option>
          ))}
        </select>
      </Field>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
        >
          Save Changes
        </button>
        <SaveBanner visible={saved} />
      </div>
    </form>
  );
}

// ── Tab: Security ─────────────────────────────────────────────────────────────

function SecurityTab() {
  const [saved, setSaved] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const curId = useId();
  const newId = useId();
  const conId = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SecurityData>({ resolver: zodResolver(securitySchema) });

  function onSubmit(_data: SecurityData) {
    setSaved(true);
    reset();
    setTimeout(() => setSaved(false), 3000);
  }

  function PasswordInput({
    id,
    show,
    toggle,
    label,
    errorKey,
    ...rest
  }: { id: string; show: boolean; toggle: () => void; label: string; errorKey: keyof SecurityData } & React.InputHTMLAttributes<HTMLInputElement>) {
    const err = errors[errorKey]?.message;
    return (
      <Field id={id} label={label} error={err}>
        <div className="relative">
          <input
            id={id}
            type={show ? "text" : "password"}
            autoComplete={errorKey === "currentPassword" ? "current-password" : "new-password"}
            aria-describedby={err ? `${id}-error` : undefined}
            aria-invalid={!!err}
            className={cn(inputClass(!!err), "pr-10")}
            {...register(errorKey)}
            {...rest}
          />
          <button
            type="button"
            onClick={toggle}
            aria-label={show ? `Hide ${label.toLowerCase()}` : `Show ${label.toLowerCase()}`}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            {show ? <EyeOff size={15} aria-hidden="true" /> : <Eye size={15} aria-hidden="true" />}
          </button>
        </div>
      </Field>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5 max-w-lg">
      <PasswordInput id={curId} show={showCurrent} toggle={() => setShowCurrent((v) => !v)} label="Current Password" errorKey="currentPassword" />
      <PasswordInput id={newId} show={showNew} toggle={() => setShowNew((v) => !v)} label="New Password" errorKey="newPassword" />
      <Field id={conId} label="Confirm New Password" error={errors.confirmPassword?.message}>
        <div className="relative">
          <input
            id={conId}
            type={showNew ? "text" : "password"}
            autoComplete="new-password"
            aria-describedby={errors.confirmPassword ? `${conId}-error` : undefined}
            aria-invalid={!!errors.confirmPassword}
            className={cn(inputClass(!!errors.confirmPassword), "pr-10")}
            {...register("confirmPassword")}
          />
        </div>
      </Field>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          className="rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md disabled:opacity-40 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
        >
          Update Password
        </button>
        <SaveBanner visible={saved} />
      </div>
    </form>
  );
}

// ── Tab: Notifications ────────────────────────────────────────────────────────

const NOTIFICATION_PREFS = [
  { id: "task-assign", label: "Task assignments", description: "When a task is assigned to you" },
  { id: "task-due", label: "Due date reminders", description: "24 hours before a task is due" },
  { id: "mentions", label: "Mentions", description: "When someone @mentions you" },
  { id: "project-update", label: "Project updates", description: "Status changes on your projects" },
  { id: "weekly-digest", label: "Weekly digest", description: "Summary of team activity" },
];

function NotificationsTab() {
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    "task-assign": true,
    "task-due": true,
    "mentions": true,
    "project-update": false,
    "weekly-digest": true,
  });

  return (
    <div className="max-w-lg space-y-2">
      {NOTIFICATION_PREFS.map((pref) => (
        <div
          key={pref.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-white/6 bg-white/4 px-4 py-3.5"
        >
          <div>
            <p className="text-sm font-medium text-slate-200">{pref.label}</p>
            <p className="text-xs text-slate-500 mt-0.5">{pref.description}</p>
          </div>
          <Switch.Root
            id={pref.id}
            checked={prefs[pref.id]}
            onCheckedChange={(val) => setPrefs((p) => ({ ...p, [pref.id]: val }))}
            aria-label={pref.label}
            className={cn(
              "relative h-5 w-9 cursor-pointer rounded-full outline-none transition-colors",
              "focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]",
              prefs[pref.id] ? "bg-indigo-500" : "bg-white/15"
            )}
          >
            <Switch.Thumb
              className={cn(
                "block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-150",
                prefs[pref.id] ? "translate-x-4" : "translate-x-0.5"
              )}
            />
          </Switch.Root>
        </div>
      ))}
    </div>
  );
}

// ── Tab: Team Billing ─────────────────────────────────────────────────────────

function BillingTab() {
  return (
    <div className="max-w-lg space-y-5">
      <div
        className="rounded-2xl border border-indigo-500/30 bg-indigo-500/8 p-5"
        aria-label="Current plan: Pro"
      >
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-0.5">Current Plan</p>
            <p className="text-xl font-bold text-slate-100">Pro</p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-slate-100">$49<span className="text-sm font-normal text-slate-500">/mo</span></p>
            <p className="text-xs text-slate-500">Billed annually</p>
          </div>
        </div>
        <ul className="space-y-1.5 text-xs text-slate-400" aria-label="Plan features">
          {["Up to 25 team members", "Unlimited projects", "Advanced analytics", "Priority support", "Custom integrations"].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <Check size={12} className="text-indigo-400 shrink-0" aria-hidden="true" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      <button className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]">
        Upgrade to Enterprise
      </button>

      <div className="rounded-xl border border-white/6 bg-white/4 p-4 space-y-2 text-sm">
        <div className="flex items-center justify-between text-slate-300">
          <span>Next billing date</span>
          <span className="font-medium">June 1, 2026</span>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <span>Payment method</span>
          <span className="font-medium text-slate-400">Visa •••• 4242</span>
        </div>
        <button className="w-full mt-1 text-center text-xs text-indigo-400 hover:text-indigo-300 transition focus-visible:outline-none focus-visible:underline">
          Manage payment method
        </button>
      </div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const TABS = [
  { value: "general", label: "General", icon: User },
  { value: "security", label: "Security", icon: Shield },
  { value: "notifications", label: "Notifications", icon: Bell },
  { value: "billing", label: "Team Billing", icon: CreditCard },
];

export default function SettingsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-4 py-6 sm:px-6"
    >
      <div className="mb-6">
        <h1 className="text-xl font-bold tracking-tight text-slate-100">Settings</h1>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and preferences</p>
      </div>

      <Tabs.Root defaultValue="general" orientation="vertical" className="flex flex-col sm:flex-row gap-6">
        {/* Tab list */}
        <Tabs.List
          aria-label="Settings sections"
          className="flex flex-row sm:flex-col gap-0.5 sm:w-44 shrink-0 overflow-x-auto sm:overflow-visible"
        >
          {TABS.map(({ value, label, icon: Icon }) => (
            <Tabs.Trigger
              key={value}
              value={value}
              className={cn(
                "flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-left whitespace-nowrap transition",
                "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500",
                "data-[state=active]:bg-indigo-500/15 data-[state=active]:text-indigo-300"
              )}
            >
              <Icon size={15} aria-hidden="true" />
              {label}
            </Tabs.Trigger>
          ))}
        </Tabs.List>

        {/* Tab panels */}
        <div className="flex-1 rounded-2xl border border-white/6 bg-[#111827]/80 p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
          <Tabs.Content value="general"><GeneralTab /></Tabs.Content>
          <Tabs.Content value="security"><SecurityTab /></Tabs.Content>
          <Tabs.Content value="notifications"><NotificationsTab /></Tabs.Content>
          <Tabs.Content value="billing"><BillingTab /></Tabs.Content>
        </div>
      </Tabs.Root>
    </motion.div>
  );
}
