"use client";

import { useState, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as Accordion from "@radix-ui/react-accordion";
import {
  Search,
  ChevronDown,
  BookOpen,
  MessageCircle,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Zap,
  Shield,
  BarChart2,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FAQS = [
  {
    id: "faq-1",
    question: "How do I invite team members to my workspace?",
    answer:
      "Navigate to Team Management → Add Member. Enter the email address of the person you want to invite. They'll receive an email with an invitation link. You can assign them a role (Admin, Member, or Viewer) before sending.",
  },
  {
    id: "faq-2",
    question: "Can I export my project data?",
    answer:
      "Yes! Head to the Reports page and use the CSV or PDF export buttons at the top right. CSV exports include all raw task data, while PDF exports generate a formatted report suitable for stakeholders.",
  },
  {
    id: "faq-3",
    question: "How does the AI recommendation engine work?",
    answer:
      "Taskflow's AI analyses your team's historical task completion patterns, current workload, and sprint velocity to suggest optimal task assignments and flag at-risk deadlines. It learns continuously from your team's behaviour.",
  },
  {
    id: "faq-4",
    question: "What are the storage limits on my plan?",
    answer:
      "The Pro plan includes 50 GB of file storage per workspace. Enterprise plans include unlimited storage. You can view your current usage in Settings → Team Billing.",
  },
  {
    id: "faq-5",
    question: "How do I set up two-factor authentication?",
    answer:
      "Go to Settings → Security. Enable the '2FA' toggle and follow the QR code setup with an authenticator app such as Google Authenticator or 1Password. This adds an extra layer of protection to your account.",
  },
  {
    id: "faq-6",
    question: "Can I integrate Taskflow with Slack or GitHub?",
    answer:
      "Yes. Go to Settings → Integrations (coming soon in v2.1). We currently support GitHub, Slack, Jira, and Zapier. Native integrations post task updates and sprint summaries directly to your Slack channels.",
  },
];

const QUICK_LINKS = [
  { label: "Getting Started Guide", icon: BookOpen, color: "text-indigo-400" },
  { label: "API Reference", icon: Zap, color: "text-violet-400" },
  { label: "Security & Privacy", icon: Shield, color: "text-emerald-400" },
  { label: "Analytics Docs", icon: BarChart2, color: "text-cyan-400" },
  { label: "Team Management", icon: Users, color: "text-amber-400" },
  { label: "Community Forum", icon: MessageCircle, color: "text-pink-400" },
];

type FormState = "idle" | "success" | "error";

export default function HelpPage() {
  const [docSearch, setDocSearch] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("General");
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const docSearchId = useId();
  const nameId = useId();
  const emailId = useId();
  const catId = useId();
  const msgId = useId();

  const filteredFaqs = FAQS.filter(
    (f) =>
      !docSearch ||
      f.question.toLowerCase().includes(docSearch.toLowerCase()) ||
      f.answer.toLowerCase().includes(docSearch.toLowerCase())
  );

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFormState("error");
      return;
    }
    setFormState("success");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="px-4 py-6 sm:px-6 space-y-8"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-slate-100">Help & Support</h1>
        <p className="text-sm text-slate-500 mt-0.5">Find answers, browse docs, or contact the team</p>
      </div>

      {/* Doc search */}
      <section aria-labelledby="docs-heading">
        <h2 id="docs-heading" className="text-sm font-semibold text-slate-300 mb-3">Search Documentation</h2>
        <div className="relative max-w-lg">
          <label htmlFor={docSearchId} className="sr-only">Search documentation</label>
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" aria-hidden="true" />
          <input
            id={docSearchId}
            type="search"
            placeholder="Search docs, FAQs…"
            value={docSearch}
            onChange={(e) => setDocSearch(e.target.value)}
            aria-controls="faq-list"
            className="w-full rounded-xl border border-white/8 bg-white/5 py-3 pl-10 pr-4 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
          />
        </div>
      </section>

      {/* Quick links */}
      <section aria-labelledby="quicklinks-heading">
        <h2 id="quicklinks-heading" className="text-sm font-semibold text-slate-300 mb-3">Quick Links</h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {QUICK_LINKS.map(({ label, icon: Icon, color }) => (
            <button
              key={label}
              aria-label={`${label} — opens documentation`}
              className="flex flex-col items-center gap-2 rounded-xl border border-white/6 bg-white/4 p-4 text-center hover:bg-white/8 transition card-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Icon size={20} className={color} aria-hidden="true" />
              <span className="text-[11px] font-medium text-slate-400 leading-tight">{label}</span>
              <ExternalLink size={10} className="text-slate-600" aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      {/* FAQ accordion */}
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="text-sm font-semibold text-slate-300 mb-3">
          Frequently Asked Questions
          {docSearch && (
            <span aria-live="polite" aria-atomic="true" className="ml-2 text-xs font-normal text-slate-500">
              — {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""}
            </span>
          )}
        </h2>

        {filteredFaqs.length === 0 ? (
          <div
            role="status"
            aria-live="polite"
            className="rounded-2xl border border-white/6 bg-[#111827]/80 px-6 py-10 text-center"
          >
            <Search size={24} className="text-slate-700 mx-auto mb-3" aria-hidden="true" />
            <p className="text-sm text-slate-400">No FAQs match your search</p>
          </div>
        ) : (
          <Accordion.Root
            id="faq-list"
            type="single"
            collapsible
            className="rounded-2xl border border-white/6 bg-[#111827]/80 divide-y divide-white/5 overflow-hidden"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}
          >
            {filteredFaqs.map((faq) => (
              <Accordion.Item key={faq.id} value={faq.id}>
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium text-slate-200",
                      "hover:bg-white/3 transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500",
                      "[&[data-state=open]]:text-indigo-300"
                    )}
                  >
                    {faq.question}
                    <ChevronDown
                      size={15}
                      aria-hidden="true"
                      className="shrink-0 text-slate-500 transition-transform duration-200 [[data-state=open]_&]:rotate-180"
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden text-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0">
                  <p className="px-5 pb-5 text-slate-400 leading-relaxed">{faq.answer}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        )}
      </section>

      {/* Contact form */}
      <section aria-labelledby="contact-heading" className="max-w-lg">
        <h2 id="contact-heading" className="text-sm font-semibold text-slate-300 mb-3">Contact Support</h2>

        <div className="rounded-2xl border border-white/6 bg-[#111827]/80 p-6" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3)" }}>
          <AnimatePresence mode="wait">
            {formState === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                role="status"
                aria-live="polite"
                className="flex flex-col items-center justify-center py-10 text-center gap-3"
              >
                <div className="h-14 w-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
                  <CheckCircle2 size={24} className="text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-100">Message sent!</p>
                  <p className="text-xs text-slate-500 mt-1">Our team will reply within 24 hours.</p>
                </div>
                <button
                  onClick={() => setFormState("idle")}
                  className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition focus-visible:outline-none focus-visible:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleContactSubmit}
                noValidate
                className="space-y-4"
              >
                {formState === "error" && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-center gap-2 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-400"
                  >
                    <AlertCircle size={14} aria-hidden="true" />
                    Please fill in all required fields.
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor={nameId} className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={nameId}
                      type="text"
                      required
                      autoComplete="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      aria-required="true"
                      className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor={emailId} className="block text-xs font-semibold text-slate-400 mb-1.5">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id={emailId}
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-required="true"
                      className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20"
                      placeholder="jane@company.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={catId} className="block text-xs font-semibold text-slate-400 mb-1.5">Category</label>
                  <select
                    id={catId}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 appearance-none"
                  >
                    {["General", "Billing", "Technical", "Feature Request", "Bug Report"].map((c) => (
                      <option key={c} value={c} className="bg-[#1a2235]">{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={msgId} className="block text-xs font-semibold text-slate-400 mb-1.5">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id={msgId}
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    aria-required="true"
                    placeholder="Describe your issue or question…"
                    className="w-full rounded-xl border border-white/8 bg-white/5 px-3 py-2.5 text-sm text-slate-200 placeholder:text-slate-500 outline-none transition focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 py-3 text-sm font-semibold text-white shadow-md shadow-indigo-500/20 transition hover:from-indigo-400 hover:to-violet-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111827]"
                >
                  Send Message
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>
    </motion.div>
  );
}
