"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Star,
  Paperclip,
  Reply,
  Clock,
  Archive,
  CalendarClock,
  Sparkles,
  Filter,
  ArrowUpDown,
  RefreshCcw,
  Check,
  TrendingUp,
  Inbox as InboxIcon,
  Zap,
  Timer,
  CircleDot,
} from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { lanes, emails, type Email, type Lane, type SuggestedAction } from "@/data/emails";
import { getPerson } from "@/data/people";

const ACTION_META: Record<
  SuggestedAction,
  {
    label: string;
    icon: React.ComponentType<{ size?: number; className?: string }>;
    bg: string;
    text: string;
    ring: string;
  }
> = {
  reply: {
    label: "Reply in 1 click",
    icon: Reply,
    bg: "bg-accent-fade",
    text: "text-accent",
    ring: "ring-accent/20",
  },
  snooze: {
    label: "Snooze",
    icon: Clock,
    bg: "bg-info-soft/60",
    text: "text-info",
    ring: "ring-info/20",
  },
  archive: {
    label: "Archive",
    icon: Archive,
    bg: "bg-border-soft",
    text: "text-text-mute",
    ring: "ring-border",
  },
  schedule: {
    label: "Schedule",
    icon: CalendarClock,
    bg: "bg-warn-soft/60",
    text: "text-warn",
    ring: "ring-warn/20",
  },
};

export function InboxView() {
  const grouped = useMemo(() => {
    return lanes.map((lane) => ({
      ...lane,
      items: emails.filter((e) => e.lane === lane.id),
    }));
  }, []);

  const [collapsed, setCollapsed] = useState<Record<Lane, boolean>>({
    todo: false,
    awaiting: false,
    fyi: false,
    newsletter: true,
    promo: true,
  });

  const toggle = (id: Lane) =>
    setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  return (
    <div className="grid h-full grid-cols-[1fr_320px] overflow-hidden">
      <section className="flex min-h-0 flex-col overflow-hidden border-r border-border">
        <Toolbar />
        <div className="flex-1 overflow-y-auto">
          {grouped.map((lane) => (
            <LaneBlock
              key={lane.id}
              lane={lane}
              collapsed={collapsed[lane.id]}
              onToggle={() => toggle(lane.id)}
            />
          ))}
          <div className="px-6 py-10 text-center text-[12px] text-text-soft">
            You've reached the bottom of {emails.length} emails. AI keeps it
            this short.
          </div>
        </div>
      </section>
      <SummaryRail />
    </div>
  );
}

function Toolbar() {
  return (
    <div className="flex items-center gap-2 px-5 h-12 border-b border-border bg-bg-elev/60">
      <h1 className="font-display text-[15px] font-semibold tracking-tight">
        Smart Inbox
      </h1>
      <span className="text-[11px] text-text-soft px-1.5 py-0.5 rounded-md bg-border-soft tabular">
        27 new today
      </span>
      <div className="ml-4 flex items-center gap-1">
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] text-text-mute hover:bg-border-soft">
          <Filter size={12} />
          Filter
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] text-text-mute hover:bg-border-soft">
          <ArrowUpDown size={12} />
          AI priority
        </button>
        <button className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[12px] text-text-mute hover:bg-border-soft">
          <RefreshCcw size={12} />
          Re-classify
        </button>
      </div>
      <div className="ml-auto flex items-center gap-2 text-[11px] text-text-soft">
        <span className="flex items-center gap-1">
          <Sparkles size={11} className="text-accent" />
          AI sorted just now
        </span>
      </div>
    </div>
  );
}

function LaneBlock({
  lane,
  collapsed,
  onToggle,
}: {
  lane: (typeof lanes)[number] & { items: Email[] };
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border-soft">
      <button
        onClick={onToggle}
        className="w-full sticky top-0 z-10 bg-bg/95 backdrop-blur-sm flex items-center gap-2 px-5 h-9 text-left hover:bg-border-soft/40 transition-colors"
      >
        {collapsed ? (
          <ChevronRight size={13} className="text-text-soft" />
        ) : (
          <ChevronDown size={13} className="text-text-soft" />
        )}
        <span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: lane.color }}
        />
        <span className="text-[12px] font-semibold uppercase tracking-[0.06em] text-text">
          {lane.label}
        </span>
        <span className="text-[11px] text-text-soft tabular">
          {lane.items.length}
        </span>
        <span className="text-[11px] text-text-soft hidden md:inline ml-2">
          · {lane.hint}
        </span>
        <span className="ml-auto text-[10px] font-mono text-text-soft">
          {collapsed ? "show" : "hide"}
        </span>
      </button>
      {!collapsed && (
        <ul className="divide-y divide-border-soft">
          {lane.items.map((email) => (
            <EmailRow key={email.id} email={email} />
          ))}
        </ul>
      )}
    </div>
  );
}

function EmailRow({ email }: { email: Email }) {
  const sender = getPerson(email.senderId);
  const action = ACTION_META[email.suggestedAction];
  const isFocal = email.id === "em-001";

  return (
    <li className="group">
      <Link
        href={`/email/${email.id}`}
        className={`flex items-start gap-3 px-5 py-3 transition-colors ${
          isFocal
            ? "bg-accent-fade/40 hover:bg-accent-fade/60"
            : "hover:bg-border-soft/50"
        }`}
      >
        <div className="mt-0.5 flex items-center gap-2.5">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              email.isUnread ? "bg-accent" : "bg-transparent"
            }`}
          />
          <Avatar person={sender} size={32} />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span
              className={`text-[13px] truncate ${
                email.isUnread
                  ? "font-semibold text-text"
                  : "font-medium text-text-mute"
              }`}
            >
              {sender.name}
            </span>
            <span className="text-[11px] text-text-soft truncate">
              · {sender.company}
            </span>
            {email.isStarred && (
              <Star size={11} className="fill-warn text-warn" />
            )}
            {email.hasAttachment && (
              <Paperclip size={11} className="text-text-soft" />
            )}
            <span className="ml-auto shrink-0 text-[11px] text-text-soft tabular">
              {email.time}
            </span>
          </div>
          <div
            className={`mt-0.5 text-[13px] truncate ${
              email.isUnread ? "text-text" : "text-text-mute"
            }`}
          >
            {email.subject}
          </div>
          <div className="mt-0.5 text-[12px] text-text-soft line-clamp-1">
            {email.snippet}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <ActionChip action={email.suggestedAction} />
            {email.labels?.map((l) => (
              <span
                key={l}
                className="text-[10px] px-1.5 py-0.5 rounded-md bg-border-soft text-text-mute font-medium"
              >
                {l}
              </span>
            ))}
            <span className="ml-auto text-[10px] text-text-soft opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
              <CircleDot size={9} className={action.text} />
              {action.label}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

function ActionChip({ action }: { action: SuggestedAction }) {
  const meta = ACTION_META[action];
  const Icon = meta.icon;
  return (
    <span
      className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md text-[10.5px] font-medium ring-1 ring-inset ${meta.bg} ${meta.text} ${meta.ring}`}
    >
      <Icon size={10} />
      {meta.label}
    </span>
  );
}

function SummaryRail() {
  const todoCount = emails.filter((e) => e.lane === "todo").length;
  const awaitingCount = emails.filter((e) => e.lane === "awaiting").length;
  const newsletterCount = emails.filter((e) => e.lane === "newsletter").length;
  const promoCount = emails.filter((e) => e.lane === "promo").length;
  const totalMins = todoCount * 2 + awaitingCount + 2;

  return (
    <aside className="flex min-h-0 flex-col overflow-y-auto bg-bg-elev/60">
      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
          <Sparkles size={12} className="text-accent" />
          Today's load
        </div>
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-display text-[32px] font-semibold tracking-tight tabular">
            {todoCount + awaitingCount}
          </span>
          <span className="text-[13px] text-text-mute">emails</span>
        </div>
        <div className="mt-1 flex items-center gap-1.5 text-[12px] text-text-mute">
          <Timer size={12} className="text-text-soft" />
          ~{totalMins} min focused work
        </div>
        <div className="mt-4 h-2 rounded-full bg-border-soft overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all"
            style={{ width: "62%" }}
          />
        </div>
        <div className="mt-1.5 flex justify-between text-[10.5px] text-text-soft tabular">
          <span>62% triaged</span>
          <span>by 12:14 PM</span>
        </div>
      </div>

      <div className="px-5 py-5 border-b border-border space-y-3">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
          Lane breakdown
        </div>
        {lanes.map((lane) => {
          const count = emails.filter((e) => e.lane === lane.id).length;
          return (
            <div key={lane.id} className="flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full shrink-0"
                style={{ background: lane.color }}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between text-[12.5px]">
                  <span className="text-text-mute">{lane.label}</span>
                  <span className="tabular text-text font-medium">
                    {count}
                  </span>
                </div>
                <div className="mt-1 h-1 rounded-full bg-border-soft overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${(count / emails.length) * 100}%`,
                      background: lane.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="px-5 py-5 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
            Auto-handled today
          </div>
          <span className="text-[10px] font-mono text-accent bg-accent-fade px-1.5 py-0.5 rounded-md">
            {newsletterCount + promoCount} done
          </span>
        </div>
        <ul className="mt-3 space-y-2.5">
          <SummaryAction
            icon={Archive}
            label="Auto-archived promos"
            count={promoCount}
          />
          <SummaryAction
            icon={InboxIcon}
            label="Filed newsletters"
            count={newsletterCount}
          />
          <SummaryAction icon={Zap} label="Drafted replies" count={3} />
          <SummaryAction icon={Check} label="Unsubscribed" count={2} />
        </ul>
      </div>

      <div className="px-5 py-5">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium mb-3">
          Streak
        </div>
        <div className="rounded-[12px] border border-accent/20 bg-accent-fade/60 p-3">
          <div className="flex items-center gap-2">
            <TrendingUp size={14} className="text-accent" />
            <span className="text-[13px] font-medium text-text">
              4-day inbox-zero streak
            </span>
          </div>
          <p className="mt-1 text-[12px] text-text-mute leading-relaxed">
            You've cleared the inbox before lunch every day this week. Average
            time-to-zero: 38 min.
          </p>
          <div className="mt-3 grid grid-cols-7 gap-1">
            {[1, 1, 1, 1, 0.5, 0, 0].map((v, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full"
                style={{
                  background:
                    v === 1
                      ? "var(--accent)"
                      : v > 0
                      ? "var(--accent-soft)"
                      : "var(--border)",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

function SummaryAction({
  icon: Icon,
  label,
  count,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  count: number;
}) {
  return (
    <li className="flex items-center gap-2.5 text-[12.5px]">
      <span className="h-7 w-7 rounded-md bg-bg-elev border border-border grid place-items-center">
        <Icon size={12} className="text-text-mute" />
      </span>
      <span className="text-text-mute">{label}</span>
      <span className="ml-auto tabular text-text font-medium">{count}</span>
    </li>
  );
}
