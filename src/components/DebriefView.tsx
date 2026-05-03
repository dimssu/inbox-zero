"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  AlertTriangle,
  Inbox,
  Send,
  FileText,
  Clock,
  Archive,
  ExternalLink,
  Eye,
  Bot,
  ChevronRight,
  Calendar,
  Pause,
  Play,
} from "lucide-react";
import { Avatar } from "@/components/Avatar";
import {
  yesterdayStats,
  needsEye,
  autoHandled,
  trend,
  type DebriefItem,
} from "@/data/debrief";
import { getPerson } from "@/data/people";

const STAT_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sent: Send,
  Received: Inbox,
  Drafted: FileText,
  Snoozed: Clock,
  "Auto-archived": Archive,
};

export function DebriefView() {
  const [paused, setPaused] = useState(false);
  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-[1180px] px-8 py-8 space-y-8">
        <Header paused={paused} setPaused={setPaused} />
        <StatRibbon />
        <div className="grid grid-cols-2 gap-6">
          <Column
            title="Needs your eye"
            badge="6"
            tone="warn"
            icon={Eye}
            items={needsEye}
            description="High stakes, stale, or with a deadline. AI surfaces these so you don't miss them."
          />
          <Column
            title="Auto-handled"
            badge="6"
            tone="accent"
            icon={Bot}
            items={autoHandled}
            description="Triaged without your input — archived, routed, or unsubscribed in the last 24h."
          />
        </div>
        <TrendChart paused={paused} />
        <Footer />
      </div>
    </div>
  );
}

function Header({
  paused,
  setPaused,
}: {
  paused: boolean;
  setPaused: (b: boolean) => void;
}) {
  return (
    <div className="flex items-end justify-between gap-6">
      <div>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.1em] text-text-soft font-medium">
          <Calendar size={12} />
          Monday · May 4, 2026
        </div>
        <h1 className="font-display text-[28px] font-semibold tracking-tight mt-1">
          Daily debrief
        </h1>
        <p className="text-[13.5px] text-text-mute mt-1 max-w-xl">
          A 30-second look at what AI handled while you were heads-down, and the
          handful of threads that genuinely deserve your attention this morning.
        </p>
      </div>
      <PauseToggle paused={paused} setPaused={setPaused} />
    </div>
  );
}

function PauseToggle({
  paused,
  setPaused,
}: {
  paused: boolean;
  setPaused: (b: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-[12px] bg-bg-elev border border-border">
      <div className="flex items-center gap-2">
        {paused ? (
          <Pause size={13} className="text-warn" />
        ) : (
          <Play size={13} className="text-accent" />
        )}
        <div>
          <div className="text-[12.5px] font-medium leading-tight">
            {paused ? "AI triage paused" : "AI triage on"}
          </div>
          <div className="text-[11px] text-text-soft leading-tight">
            {paused
              ? "Inbox arrives un-classified"
              : "Lanes & drafts auto-update"}
          </div>
        </div>
      </div>
      <button
        onClick={() => setPaused(!paused)}
        className={`relative h-5 w-9 rounded-full transition-colors ${
          paused ? "bg-border" : "bg-accent"
        }`}
        aria-label={paused ? "Resume AI triage" : "Pause AI triage"}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
            paused ? "translate-x-0.5" : "translate-x-[18px]"
          }`}
        />
      </button>
    </div>
  );
}

function StatRibbon() {
  return (
    <section className="rounded-[16px] border border-border bg-bg-elev overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border-soft bg-gradient-to-b from-accent-fade/40 to-transparent">
        <Sparkles size={13} className="text-accent" />
        <span className="text-[12px] font-semibold text-text">
          Yesterday in 5 numbers
        </span>
        <span className="text-[11px] text-text-soft">
          · Sun, May 3 · 24h window
        </span>
      </div>
      <div className="grid grid-cols-5 divide-x divide-border-soft">
        {yesterdayStats.map((s) => {
          const Icon = STAT_ICONS[s.label] ?? Inbox;
          const positive = s.delta >= 0;
          return (
            <div key={s.label} className="px-5 py-4">
              <div className="flex items-center gap-1.5 text-[11px] text-text-soft uppercase tracking-[0.06em] font-medium">
                <Icon size={11} />
                {s.label}
              </div>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="font-display text-[26px] font-semibold tracking-tight tabular">
                  {s.value}
                </span>
                {s.delta !== 0 && (
                  <span
                    className={`flex items-center gap-0.5 text-[11px] font-medium tabular ${
                      positive ? "text-accent" : "text-text-mute"
                    }`}
                  >
                    {positive ? (
                      <TrendingUp size={11} />
                    ) : (
                      <TrendingDown size={11} />
                    )}
                    {Math.abs(s.delta)}%
                  </span>
                )}
              </div>
              <div className="mt-1 text-[11px] text-text-soft">vs. 7-day avg</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Column({
  title,
  badge,
  tone,
  icon: Icon,
  items,
  description,
}: {
  title: string;
  badge: string;
  tone: "warn" | "accent";
  icon: React.ComponentType<{ size?: number; className?: string }>;
  items: DebriefItem[];
  description: string;
}) {
  const toneCls =
    tone === "warn"
      ? "bg-warn-soft text-warn ring-warn/30"
      : "bg-accent-fade text-accent ring-accent/30";
  return (
    <section className="rounded-[16px] border border-border bg-bg-elev overflow-hidden">
      <header className="px-5 pt-4 pb-3 border-b border-border-soft">
        <div className="flex items-center gap-2">
          <div
            className={`h-7 w-7 rounded-md grid place-items-center ring-1 ring-inset ${toneCls}`}
          >
            <Icon size={13} />
          </div>
          <h2 className="font-display text-[15px] font-semibold tracking-tight">
            {title}
          </h2>
          <span
            className={`text-[10.5px] font-mono px-1.5 py-0.5 rounded ring-1 ring-inset ${toneCls}`}
          >
            {badge}
          </span>
        </div>
        <p className="mt-1.5 text-[12px] text-text-mute leading-relaxed">
          {description}
        </p>
      </header>
      <ul className="divide-y divide-border-soft">
        {items.map((item) => {
          const sender = getPerson(item.senderId);
          return (
            <li key={item.id}>
              <Link
                href="/email/em-001"
                className="flex items-start gap-3 px-5 py-3 hover:bg-border-soft/40 transition-colors"
              >
                <Avatar person={sender} size={28} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[13px] font-medium text-text truncate">
                      {sender.name}
                    </span>
                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                          tone === "warn"
                            ? "bg-warn-soft text-warn"
                            : "bg-accent-fade text-accent"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    <span className="ml-auto text-[10.5px] text-text-soft tabular">
                      {item.meta}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[12.5px] text-text-mute truncate">
                    {item.subject}
                  </div>
                  <div className="mt-1 text-[11.5px] text-text-soft leading-relaxed">
                    {item.reason}
                  </div>
                </div>
                <ChevronRight
                  size={13}
                  className="mt-1 text-text-soft shrink-0"
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="px-5 py-3 border-t border-border-soft bg-border-soft/30">
        <button className="flex items-center gap-1.5 text-[12px] text-text-mute hover:text-text font-medium">
          {tone === "warn" ? "Open in inbox" : "View all auto-handled"}
          <ArrowRight size={11} />
        </button>
      </div>
    </section>
  );
}

function TrendChart({ paused }: { paused: boolean }) {
  const series = useMemo(() => {
    const max = Math.max(
      ...trend.flatMap((t) => [t.sent, t.received, t.drafted]),
    );
    return trend.map((t, i) => ({
      ...t,
      i,
      maxVal: max,
    }));
  }, []);
  const W = 980;
  const H = 220;
  const PAD_L = 38;
  const PAD_R = 24;
  const PAD_T = 20;
  const PAD_B = 32;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const max = Math.max(...series.map((s) => Math.max(s.received, s.sent, s.drafted)));
  const x = (i: number) => PAD_L + (innerW * i) / (series.length - 1);
  const y = (v: number) => PAD_T + innerH - (innerH * v) / (max * 1.1);

  const path = (key: "sent" | "received" | "drafted") =>
    series
      .map((s, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(s[key]).toFixed(1)}`)
      .join(" ");

  const area = (key: "sent" | "received" | "drafted") =>
    `${path(key)} L ${x(series.length - 1).toFixed(1)} ${y(0).toFixed(1)} L ${x(0).toFixed(1)} ${y(0).toFixed(1)} Z`;

  const yTicks = [0, max / 2, max].map((v) => ({
    v: Math.round(v),
    y: y(v),
  }));

  const seriesMeta = [
    { key: "received" as const, label: "Received", color: "#a8a29e" },
    { key: "sent" as const, label: "Sent", color: "#10b981" },
    { key: "drafted" as const, label: "Drafted", color: "#3b82f6" },
  ];

  return (
    <section className="rounded-[16px] border border-border bg-bg-elev overflow-hidden">
      <header className="flex items-end justify-between px-5 pt-4 pb-3 border-b border-border-soft">
        <div>
          <h2 className="font-display text-[15px] font-semibold tracking-tight">
            Weekly trend
          </h2>
          <p className="mt-1 text-[12px] text-text-mute">
            Sent vs received vs drafted over the last 7 days. AI-drafted replies
            now make up <span className="font-semibold text-text">31%</span> of
            sends.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {seriesMeta.map((m) => (
            <div key={m.key} className="flex items-center gap-1.5 text-[12px]">
              <span
                className="h-1.5 w-3 rounded-full"
                style={{ background: m.color }}
              />
              <span className="text-text-mute">{m.label}</span>
            </div>
          ))}
        </div>
      </header>
      <div className="px-3 py-4 relative">
        {paused && (
          <div className="absolute inset-0 z-10 grid place-items-center bg-bg-elev/70 backdrop-blur-sm">
            <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-warn-soft text-warn text-[12px] font-medium ring-1 ring-inset ring-warn/30">
              <AlertTriangle size={13} />
              Trend paused — AI triage is off
            </div>
          </div>
        )}
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full h-auto"
          role="img"
          aria-label="Weekly email trend chart"
        >
          <defs>
            <linearGradient id="grad-sent" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-received" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a8a29e" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#a8a29e" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-drafted" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
          </defs>

          {yTicks.map((t, i) => (
            <g key={i}>
              <line
                x1={PAD_L}
                x2={W - PAD_R}
                y1={t.y}
                y2={t.y}
                stroke="#e7e5e4"
                strokeDasharray="2 4"
              />
              <text
                x={PAD_L - 8}
                y={t.y + 3}
                fontSize="10"
                textAnchor="end"
                fill="#a8a29e"
                fontFamily="var(--font-jetbrains-mono)"
              >
                {t.v}
              </text>
            </g>
          ))}

          <path d={area("received")} fill="url(#grad-received)" />
          <path d={area("sent")} fill="url(#grad-sent)" />
          <path d={area("drafted")} fill="url(#grad-drafted)" />

          <path
            d={path("received")}
            fill="none"
            stroke="#a8a29e"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={path("sent")}
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d={path("drafted")}
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />

          {series.map((s, i) =>
            seriesMeta.map((m) => (
              <circle
                key={`${m.key}-${i}`}
                cx={x(i)}
                cy={y(s[m.key])}
                r={3}
                fill="white"
                stroke={m.color}
                strokeWidth="2"
              />
            )),
          )}

          {series.map((s, i) => (
            <text
              key={s.day}
              x={x(i)}
              y={H - 10}
              fontSize="11"
              textAnchor="middle"
              fill="#78716c"
              fontWeight={i === series.length - 3 ? 600 : 400}
            >
              {s.day}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-[12px] border border-border bg-bg-elev px-4 py-3">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
          Time saved
        </div>
        <div className="mt-1 font-display text-[20px] font-semibold tabular">
          1h 14m
        </div>
        <div className="text-[11.5px] text-text-mute">
          across 21 auto-archives
        </div>
      </div>
      <div className="rounded-[12px] border border-border bg-bg-elev px-4 py-3">
        <div className="text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
          Inbox-zero by
        </div>
        <div className="mt-1 font-display text-[20px] font-semibold tabular">
          12:14 PM
        </div>
        <div className="text-[11.5px] text-text-mute">
          26 min ahead of yesterday
        </div>
      </div>
      <div className="rounded-[12px] border border-border bg-bg-elev px-4 py-3">
        <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-[0.08em] text-text-soft font-medium">
          AI accuracy
          <ExternalLink size={10} />
        </div>
        <div className="mt-1 font-display text-[20px] font-semibold tabular">
          97.4%
        </div>
        <div className="text-[11.5px] text-text-mute">
          1 misclassified out of 38
        </div>
      </div>
    </div>
  );
}
