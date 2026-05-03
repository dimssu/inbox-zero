"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  Star,
  MoreHorizontal,
  Reply,
  Forward,
  Archive,
  Clock,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Send,
  Pencil,
  CalendarClock,
  Quote,
  RefreshCcw,
  Info,
  Paperclip,
  Smile,
  Link as LinkIcon,
  AlignLeft,
} from "lucide-react";
import { Avatar } from "@/components/Avatar";
import type { Email } from "@/data/emails";
import type { Thread, ThreadMessage } from "@/data/threads";
import { drafts, type DraftTone } from "@/data/draft";
import { getPerson, type Person } from "@/data/people";

const SELF: Person = {
  id: "self",
  name: "Aryan Singh",
  email: "aryansi1126@gmail.com",
  avatar:
    "https://api.dicebear.com/9.x/notionists-neutral/svg?seed=Aryan%20Singh&backgroundType=gradientLinear&backgroundColor=10b981,059669",
  company: "Inbox Zero",
  initials: "AS",
};

function senderFor(id: string): Person {
  if (id === "aryansi1126" || id === "self") return SELF;
  return getPerson(id);
}

export function ThreadView({ email, thread }: { email: Email; thread: Thread }) {
  const [tone, setTone] = useState<DraftTone>("friendly");
  const [showCitations, setShowCitations] = useState(true);
  const [draftBody, setDraftBody] = useState(drafts.friendly.body);
  const [editing, setEditing] = useState(false);
  const draft = drafts[tone];

  const switchTone = (next: DraftTone) => {
    setTone(next);
    setDraftBody(drafts[next].body);
    setEditing(false);
  };

  return (
    <div className="grid h-full grid-cols-[1fr_360px] overflow-hidden">
      <section className="flex min-h-0 flex-col overflow-hidden border-r border-border">
        <ThreadToolbar email={email} />
        <div className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-[760px] px-8 py-6">
            <h1 className="font-display text-[22px] font-semibold tracking-tight leading-tight">
              {thread.subject}
            </h1>
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-accent-fade text-accent font-medium ring-1 ring-inset ring-accent/20">
                Lane · To-do
              </span>
              <span className="text-[11px] px-1.5 py-0.5 rounded-md bg-warn-soft/60 text-warn font-medium ring-1 ring-inset ring-warn/20">
                Priority · High
              </span>
              {email.labels?.map((l) => (
                <span
                  key={l}
                  className="text-[11px] px-1.5 py-0.5 rounded-md bg-border-soft text-text-mute"
                >
                  {l}
                </span>
              ))}
              <span className="text-[11px] text-text-soft">
                · {thread.messages.length} messages in thread
              </span>
            </div>
            <div className="mt-6 space-y-4">
              {thread.messages.map((m, i) => (
                <Message
                  key={m.id}
                  message={m}
                  isLatest={i === thread.messages.length - 1}
                />
              ))}
            </div>

            <DraftCard
              tone={tone}
              onSwitchTone={switchTone}
              draftBody={draftBody}
              setDraftBody={setDraftBody}
              editing={editing}
              setEditing={setEditing}
              showCitations={showCitations}
              setShowCitations={setShowCitations}
            />
          </div>
        </div>
      </section>
      <ThreadSidebar email={email} thread={thread} />
    </div>
  );
}

function ThreadToolbar({ email }: { email: Email }) {
  return (
    <div className="flex items-center gap-2 px-5 h-12 border-b border-border bg-bg-elev/60">
      <Link
        href="/"
        className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] text-text-mute hover:bg-border-soft"
      >
        <ArrowLeft size={13} />
        Inbox
      </Link>
      <span className="h-4 w-px bg-border" />
      <span className="text-[12px] text-text-mute">
        {email.time} · from {getPerson(email.senderId).name}
      </span>
      <div className="ml-auto flex items-center gap-1">
        <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft text-text-mute">
          <Star size={13} />
        </button>
        <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft text-text-mute">
          <Archive size={13} />
        </button>
        <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft text-text-mute">
          <Clock size={13} />
        </button>
        <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft text-text-mute">
          <MoreHorizontal size={13} />
        </button>
      </div>
    </div>
  );
}

function Message({
  message,
  isLatest,
}: {
  message: ThreadMessage;
  isLatest: boolean;
}) {
  const sender = senderFor(message.senderId);
  const [expanded, setExpanded] = useState(isLatest);
  const [showQuote, setShowQuote] = useState(false);
  const isSelf = sender.id === "self";

  return (
    <article
      className={`rounded-[12px] border bg-bg-elev transition-shadow ${
        isLatest
          ? "border-border shadow-sm"
          : "border-border-soft hover:border-border"
      }`}
    >
      <button
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-start gap-3 px-4 py-3 text-left"
      >
        <Avatar person={sender} size={32} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold">
              {sender.name}
            </span>
            <span className="text-[11px] text-text-soft">
              &lt;{sender.email}&gt;
            </span>
            {isSelf && (
              <span className="text-[10px] px-1 py-px rounded bg-accent-fade text-accent font-medium">
                you
              </span>
            )}
          </div>
          {expanded ? (
            <div className="mt-0.5 text-[11.5px] text-text-soft">
              to {message.to.join(", ")} · {message.time}
            </div>
          ) : (
            <div className="mt-0.5 text-[12px] text-text-mute line-clamp-1">
              {message.body.split("\n")[0]}
            </div>
          )}
        </div>
        <span className="text-[11px] text-text-soft tabular shrink-0">
          {expanded ? null : message.time}
        </span>
        {expanded ? (
          <ChevronDown size={14} className="mt-1 text-text-soft" />
        ) : (
          <ChevronRight size={14} className="mt-1 text-text-soft" />
        )}
      </button>
      {expanded && (
        <div className="px-4 pb-4 pl-[60px]">
          <div className="text-[14px] leading-[1.65] text-text whitespace-pre-wrap">
            {message.body}
          </div>
          {message.collapsedQuote && (
            <div className="mt-3">
              <button
                onClick={() => setShowQuote((s) => !s)}
                className="flex items-center gap-1.5 text-[11px] text-text-soft hover:text-text-mute"
              >
                <Quote size={11} />
                {showQuote ? "Hide quoted text" : "Show 1 quoted message"}
              </button>
              {showQuote && (
                <pre className="mt-2 p-3 rounded-md bg-border-soft/60 text-[12px] text-text-mute whitespace-pre-wrap font-sans border-l-2 border-border">
                  {message.collapsedQuote}
                </pre>
              )}
            </div>
          )}
          {isLatest && (
            <div className="mt-4 flex items-center gap-1.5">
              <ActionButton icon={Reply} label="Reply" />
              <ActionButton icon={Forward} label="Forward" />
              <ActionButton icon={Archive} label="Archive" />
            </div>
          )}
        </div>
      )}
    </article>
  );
}

function ActionButton({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
}) {
  return (
    <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-text-mute bg-border-soft/60 hover:bg-border-soft hover:text-text">
      <Icon size={12} />
      {label}
    </button>
  );
}

function DraftCard({
  tone,
  onSwitchTone,
  draftBody,
  setDraftBody,
  editing,
  setEditing,
  showCitations,
  setShowCitations,
}: {
  tone: DraftTone;
  onSwitchTone: (t: DraftTone) => void;
  draftBody: string;
  setDraftBody: (s: string) => void;
  editing: boolean;
  setEditing: (b: boolean) => void;
  showCitations: boolean;
  setShowCitations: (b: boolean) => void;
}) {
  const draft = drafts[tone];
  return (
    <section className="mt-6 rounded-[14px] border border-accent/30 bg-gradient-to-b from-accent-fade/60 to-bg-elev shadow-[0_1px_0_rgba(16,185,129,0.06),0_8px_24px_-12px_rgba(16,185,129,0.18)] overflow-hidden">
      <header className="flex items-center gap-2 px-4 py-3 border-b border-accent/20 bg-accent-fade/40">
        <div className="h-7 w-7 rounded-md bg-accent grid place-items-center shrink-0">
          <Sparkles size={13} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-text">
              AI-drafted reply
            </span>
            <span className="text-[10px] font-mono text-accent bg-bg-elev/80 px-1.5 py-0.5 rounded ring-1 ring-inset ring-accent/30">
              {tone.toUpperCase()}
            </span>
          </div>
          <div className="text-[11.5px] text-text-mute">
            {draft.hint}
          </div>
        </div>
        <button className="text-[11px] flex items-center gap-1 text-text-mute hover:text-text">
          <RefreshCcw size={11} />
          Regenerate
        </button>
      </header>

      <div className="px-4 py-3 border-b border-border-soft">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
            Tone
          </span>
          <div className="flex items-center gap-1 ml-1">
            {(Object.keys(drafts) as DraftTone[]).map((t) => (
              <button
                key={t}
                onClick={() => onSwitchTone(t)}
                className={`px-2.5 py-1 rounded-md text-[12px] font-medium transition-all ${
                  t === tone
                    ? "bg-text text-white shadow-sm"
                    : "bg-bg-elev text-text-mute border border-border hover:border-text/30"
                }`}
              >
                {drafts[t].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 py-3 border-b border-border-soft bg-bg-elev">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium mb-1">
          Subject
        </div>
        <div className="text-[13.5px] font-medium text-text">
          {draft.subject}
        </div>
      </div>

      <div className="px-4 py-4 bg-bg-elev">
        {editing ? (
          <textarea
            className="w-full min-h-[180px] text-[14px] leading-[1.65] text-text bg-transparent outline-none resize-none"
            value={draftBody}
            onChange={(e) => setDraftBody(e.target.value)}
            autoFocus
          />
        ) : (
          <div className="text-[14px] leading-[1.65] text-text whitespace-pre-wrap">
            {draftBody}
          </div>
        )}
      </div>

      <div className="border-t border-border-soft bg-bg-elev">
        <button
          onClick={() => setShowCitations(!showCitations)}
          className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-border-soft/40 transition-colors"
        >
          <Info size={12} className="text-info" />
          <span className="text-[12px] text-text-mute font-medium">
            Why this reply
          </span>
          <span className="text-[11px] text-text-soft tabular">
            · {draft.citations.length} thread references
          </span>
          <span className="ml-auto">
            {showCitations ? (
              <ChevronDown size={12} className="text-text-soft" />
            ) : (
              <ChevronRight size={12} className="text-text-soft" />
            )}
          </span>
        </button>
        {showCitations && (
          <ul className="px-4 pb-3 space-y-2">
            {draft.citations.map((c, i) => (
              <li
                key={i}
                className="rounded-md bg-info-soft/30 ring-1 ring-inset ring-info/15 px-3 py-2"
              >
                <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.06em] font-medium text-info">
                  <Quote size={10} />
                  Cited from {c.from}
                </div>
                <blockquote className="mt-1 text-[12.5px] text-text border-l-2 border-info/40 pl-2 italic">
                  &ldquo;{c.quote}&rdquo;
                </blockquote>
                <div className="mt-1 text-[11.5px] text-text-mute leading-relaxed">
                  {c.reason}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="flex items-center gap-2 px-4 py-3 bg-bg-elev border-t border-border">
        <div className="flex items-center gap-0.5 text-text-soft">
          <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft hover:text-text">
            <Paperclip size={13} />
          </button>
          <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft hover:text-text">
            <LinkIcon size={13} />
          </button>
          <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft hover:text-text">
            <AlignLeft size={13} />
          </button>
          <button className="h-7 w-7 grid place-items-center rounded-md hover:bg-border-soft hover:text-text">
            <Smile size={13} />
          </button>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="ml-2 inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-text-mute bg-border-soft/60 hover:bg-border-soft hover:text-text"
        >
          <Pencil size={12} />
          {editing ? "Done editing" : "Edit"}
        </button>
        <button className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-[12px] text-text-mute bg-border-soft/60 hover:bg-border-soft hover:text-text">
          <CalendarClock size={12} />
          Schedule send
        </button>
        <button className="ml-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12.5px] font-medium text-white bg-accent hover:bg-emerald-600 transition-colors shadow-sm shadow-accent/30">
          <Send size={12} />
          Send reply
        </button>
      </footer>
    </section>
  );
}

function ThreadSidebar({
  email,
  thread,
}: {
  email: Email;
  thread: Thread;
}) {
  const sender = getPerson(email.senderId);
  const facts = useMemo(
    () => [
      { label: "Sender", value: sender.email },
      { label: "Company", value: sender.company },
      { label: "First seen", value: "Jan 4, 2024" },
      { label: "Replies (90d)", value: "11" },
      { label: "Avg response", value: "2h 14m" },
      { label: "Trust score", value: "98 / 100" },
    ],
    [sender],
  );

  return (
    <aside className="flex min-h-0 flex-col overflow-y-auto bg-bg-elev/60">
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-3">
          <Avatar person={sender} size={48} ring />
          <div>
            <div className="font-semibold text-[14px]">{sender.name}</div>
            <div className="text-[12px] text-text-mute">{sender.company}</div>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5">
          <span className="text-[10.5px] px-1.5 py-0.5 rounded-md bg-accent-fade text-accent font-medium">
            Customer
          </span>
          <span className="text-[10.5px] px-1.5 py-0.5 rounded-md bg-info-soft text-info font-medium">
            Tier 1 account
          </span>
          <span className="text-[10.5px] px-1.5 py-0.5 rounded-md bg-border-soft text-text-mute font-medium">
            CC: PM
          </span>
        </div>
      </div>

      <div className="px-5 py-5 border-b border-border">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium mb-3">
          Sender facts
        </div>
        <dl className="space-y-2">
          {facts.map((f) => (
            <div key={f.label} className="flex items-baseline justify-between">
              <dt className="text-[12px] text-text-mute">{f.label}</dt>
              <dd className="text-[12.5px] text-text font-medium tabular text-right">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="px-5 py-5 border-b border-border">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium mb-3">
          AI summary
        </div>
        <p className="text-[12.5px] leading-relaxed text-text-mute">
          Mira is rescheduling the Q2 OKR review to Friday so she can fold in
          fresh activation data showing a <strong className="text-text">14% lift</strong>.
          You previously confirmed Friday afternoon; the only constraint is your
          4:30pm hard stop.
        </p>
        <ul className="mt-3 space-y-1.5 text-[12px]">
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 rounded-full bg-accent" />
            <span className="text-text-mute">
              Action: confirm Friday 3pm PT
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 rounded-full bg-accent" />
            <span className="text-text-mute">
              Constraint: hard stop at 4:30pm
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-1 w-1 rounded-full bg-accent" />
            <span className="text-text-mute">
              Mention the 14% pricing lift in the agenda
            </span>
          </li>
        </ul>
      </div>

      <div className="px-5 py-5">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium mb-3">
          Recent threads
        </div>
        <ul className="space-y-2.5 text-[12.5px]">
          <li className="flex items-start justify-between gap-2">
            <span className="text-text-mute line-clamp-1 flex-1">
              Re: pricing-page experiment results
            </span>
            <span className="text-[11px] text-text-soft tabular">3d</span>
          </li>
          <li className="flex items-start justify-between gap-2">
            <span className="text-text-mute line-clamp-1 flex-1">
              Stripe webhook signing rotation
            </span>
            <span className="text-[11px] text-text-soft tabular">1w</span>
          </li>
          <li className="flex items-start justify-between gap-2">
            <span className="text-text-mute line-clamp-1 flex-1">
              Q1 invoice — billing reconciliation
            </span>
            <span className="text-[11px] text-text-soft tabular">3w</span>
          </li>
          <li className="flex items-start justify-between gap-2">
            <span className="text-text-mute line-clamp-1 flex-1">
              Intro: Mira ↔ Felix re: Connect API
            </span>
            <span className="text-[11px] text-text-soft tabular">5w</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
