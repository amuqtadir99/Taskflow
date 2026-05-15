"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Phone,
  Video,
  MoreHorizontal,
  Paperclip,
  Send,
  ArrowLeft,
  Circle,
} from "lucide-react";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { mockContacts, mockMessages, type Contact, type Message } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusColor: Record<Contact["status"], string> = {
  online: "bg-emerald-400",
  away: "bg-amber-400",
  offline: "bg-slate-600",
};

function ContactItem({
  contact,
  selected,
  onClick,
}: {
  contact: Contact;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 transition-colors text-left",
        selected ? "bg-indigo-500/10 border-r-2 border-indigo-500" : "hover:bg-white/4"
      )}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm"
          style={{ background: contact.avatar }}
        >
          {contact.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <span
          className={cn(
            "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111827]",
            statusColor[contact.status]
          )}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="text-sm font-semibold text-slate-200 truncate">{contact.name}</span>
          <span className="text-[10px] text-slate-500 shrink-0">{contact.lastTime}</span>
        </div>
        <div className="flex items-center justify-between gap-1 mt-0.5">
          <span className="text-xs text-slate-500 truncate">{contact.lastMessage}</span>
          {contact.unread > 0 && (
            <span className="shrink-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-500 px-1 text-[10px] font-bold text-white">
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ message, index }: { message: Message; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={cn("flex", message.sent ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[70%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          message.sent
            ? "bg-indigo-500 text-white rounded-br-sm"
            : "bg-[#1a2235] text-slate-200 border border-white/6 rounded-bl-sm"
        )}
      >
        {message.content}
        <div
          className={cn(
            "text-[10px] mt-1",
            message.sent ? "text-indigo-200/70 text-right" : "text-slate-600"
          )}
        >
          {message.time}
        </div>
      </div>
    </motion.div>
  );
}

export default function MessagesPage() {
  const [selected, setSelected] = useState<Contact | null>(null);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const filtered = mockContacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.role.toLowerCase().includes(search.toLowerCase())
  );

  const messages: Message[] = selected ? (mockMessages[selected.id] ?? []) : [];

  // Scroll chat to bottom when contact changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selected]);

  function handleSend() {
    if (!input.trim()) return;
    setInput("");
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex h-full overflow-hidden"
    >
      {/* Left pane: contact list */}
      <div
        className={cn(
          "flex flex-col border-r border-white/6 bg-[#111827]/60 shrink-0",
          "w-full md:w-72 lg:w-80",
          selected ? "hidden md:flex" : "flex"
        )}
      >
        {/* Search */}
        <div className="px-4 pt-5 pb-3 border-b border-white/5">
          <h2 className="text-sm font-semibold text-slate-100 mb-3">Messages</h2>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input
              type="text"
              placeholder="Search contacts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-white/8 bg-white/5 py-2 pl-8 pr-3 text-xs text-slate-200 placeholder:text-slate-500 outline-none focus:border-indigo-500/40"
            />
          </div>
        </div>

        {/* Online count */}
        <div className="px-4 pt-3 pb-1 flex items-center gap-1.5">
          <Circle size={7} className="fill-emerald-400 text-emerald-400" />
          <span className="text-[11px] text-slate-500">
            {mockContacts.filter((c) => c.status === "online").length} online
          </span>
        </div>

        {/* Contact list */}
        <ScrollArea.Root className="flex-1 overflow-hidden">
          <ScrollArea.Viewport className="h-full w-full">
            <div className="py-1">
              {filtered.map((contact) => (
                <ContactItem
                  key={contact.id}
                  contact={contact}
                  selected={selected?.id === contact.id}
                  onClick={() => setSelected(contact)}
                />
              ))}
              {filtered.length === 0 && (
                <div className="py-12 text-center text-xs text-slate-600">No contacts found</div>
              )}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical" className="flex w-1 touch-none select-none p-0.5">
            <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/10" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>

      {/* Right pane: chat window */}
      <div
        className={cn(
          "flex-1 flex flex-col",
          !selected ? "hidden md:flex" : "flex"
        )}
      >
        <AnimatePresence mode="wait">
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col h-full"
            >
              {/* Chat header */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/5 bg-[#111827]/40">
                {/* Back button (mobile) */}
                <button
                  onClick={() => setSelected(null)}
                  className="md:hidden flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-slate-400 hover:text-slate-200 transition"
                >
                  <ArrowLeft size={15} />
                </button>

                {/* Contact info */}
                <div className="relative">
                  <div
                    className="h-9 w-9 rounded-xl flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: selected.avatar }}
                  >
                    {selected.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <span
                    className={cn(
                      "absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-[#111827]",
                      statusColor[selected.status]
                    )}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-100">{selected.name}</p>
                  <p className="text-[11px] text-slate-500 capitalize">
                    {selected.status === "online" ? (
                      <span className="text-emerald-400">● Online</span>
                    ) : (
                      selected.status
                    )}{" "}
                    · {selected.role}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  {[Phone, Video, MoreHorizontal].map((Icon, i) => (
                    <button
                      key={i}
                      className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/8 text-slate-400 hover:text-slate-200 hover:bg-white/6 transition"
                    >
                      <Icon size={15} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Messages area */}
              <ScrollArea.Root className="flex-1 overflow-hidden">
                <ScrollArea.Viewport className="h-full w-full" ref={scrollRef}>
                  <div className="flex flex-col gap-3 px-5 py-5">
                    {messages.map((msg, i) => (
                      <MessageBubble key={msg.id} message={msg} index={i} />
                    ))}
                  </div>
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar orientation="vertical" className="flex w-1 touch-none select-none p-0.5">
                  <ScrollArea.Thumb className="relative flex-1 rounded-full bg-white/10" />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>

              {/* Input area */}
              <div className="px-5 py-4 border-t border-white/5 bg-[#111827]/40">
                <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/5 px-3 py-2">
                  <button className="text-slate-500 hover:text-slate-300 transition shrink-0">
                    <Paperclip size={16} />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Type a message…"
                    className="flex-1 bg-transparent text-sm text-slate-200 placeholder:text-slate-500 outline-none"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    className="shrink-0 flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition hover:bg-indigo-400"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-8"
            >
              <div className="h-16 w-16 rounded-2xl border border-white/8 bg-white/5 flex items-center justify-center">
                <Send size={24} className="text-slate-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400">Select a conversation</p>
                <p className="text-xs text-slate-600 mt-0.5">Choose a contact from the list to start chatting</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
