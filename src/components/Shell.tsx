"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Inbox,
  Send,
  FileText,
  Star,
  Archive,
  Trash2,
  ListTodo,
  Clock,
  Megaphone,
  Tag,
  Sparkles,
  Search,
  Command,
  Bell,
  Settings,
  ChevronRight,
  BarChart3,
  Mail,
  Plus,
} from "lucide-react";
import { lanes } from "@/data/emails";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  count?: number;
};

const SECTIONS: { title: string; items: NavItem[] }[] = [
  {
    title: "Mail",
    items: [
      { href: "/", label: "Smart Inbox", icon: Inbox, count: 27 },
      { href: "/debrief", label: "Daily Debrief", icon: BarChart3 },
      { href: "/email/em-001", label: "Focused thread", icon: Mail },
    ],
  },
];

const FOLDERS: NavItem[] = [
  { href: "#", label: "Starred", icon: Star, count: 4 },
  { href: "#", label: "Snoozed", icon: Clock, count: 5 },
  { href: "#", label: "Sent", icon: Send, count: 142 },
  { href: "#", label: "Drafts", icon: FileText, count: 7 },
  { href: "#", label: "Archived", icon: Archive, count: 1208 },
  { href: "#", label: "Trash", icon: Trash2 },
];

const LABEL_DOTS: { name: string; color: string; count: number }[] = [
  { name: "Customers", color: "#10b981", count: 12 },
  { name: "Investors", color: "#3b82f6", count: 4 },
  { name: "Team", color: "#f59e0b", count: 9 },
  { name: "Vendors", color: "#a855f7", count: 6 },
  { name: "Personal", color: "#ec4899", count: 3 },
];

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="grid h-screen grid-cols-[260px_1fr] bg-bg">
      <aside className="flex flex-col border-r border-border bg-bg-elev/60 backdrop-blur-sm">
        <div className="flex items-center gap-2.5 px-5 py-4 border-b border-border">
          <div className="relative h-8 w-8 rounded-[10px] bg-gradient-to-br from-accent to-emerald-600 flex items-center justify-center shadow-sm shadow-accent/30">
            <Sparkles size={16} className="text-white" />
            <div className="absolute -inset-px rounded-[10px] ring-1 ring-inset ring-white/30 pointer-events-none" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-semibold tracking-tight">
              Inbox Zero
            </span>
            <span className="text-[11px] text-text-soft">
              aryansi1126@gmail.com
            </span>
          </div>
        </div>

        <div className="px-3 pt-3">
          <button className="w-full flex items-center gap-2 px-3 py-2 rounded-[10px] bg-text text-white text-[13px] font-medium hover:bg-text/90 transition-colors">
            <Plus size={14} />
            <span>Compose</span>
            <span className="ml-auto text-[10px] font-mono opacity-60">C</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 pt-4 pb-6">
          {SECTIONS.map((section) => (
            <div key={section.title} className="mb-4">
              <div className="px-2 mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-text-soft">
                {section.title}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const active =
                    item.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.href);
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={`group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] transition-colors ${
                          active
                            ? "bg-accent-fade text-text font-medium"
                            : "text-text-mute hover:bg-border-soft hover:text-text"
                        }`}
                      >
                        <item.icon
                          size={15}
                          className={
                            active ? "text-accent" : "text-text-soft"
                          }
                        />
                        <span>{item.label}</span>
                        {item.count !== undefined && (
                          <span className="ml-auto tabular text-[11px] text-text-soft">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          <div className="mb-4">
            <div className="px-2 mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-text-soft">
              Folders
            </div>
            <ul className="space-y-0.5">
              {FOLDERS.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-text-mute hover:bg-border-soft hover:text-text transition-colors"
                  >
                    <item.icon size={15} className="text-text-soft" />
                    <span>{item.label}</span>
                    {item.count !== undefined && (
                      <span className="ml-auto tabular text-[11px] text-text-soft">
                        {item.count}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <div className="px-2 mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-text-soft">
              AI Lanes
            </div>
            <ul className="space-y-0.5">
              {lanes.map((lane) => (
                <li key={lane.id}>
                  <a
                    href="#"
                    className="group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-text-mute hover:bg-border-soft hover:text-text transition-colors"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{ background: lane.color }}
                    />
                    <span>{lane.label}</span>
                    <span className="ml-auto tabular text-[11px] text-text-soft">
                      {lane.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-text-soft">
                Labels
              </span>
              <button className="text-text-soft hover:text-text">
                <Plus size={11} />
              </button>
            </div>
            <ul className="space-y-0.5">
              {LABEL_DOTS.map((label) => (
                <li key={label.name}>
                  <a
                    href="#"
                    className="group flex items-center gap-2.5 px-2 py-1.5 rounded-md text-[13px] text-text-mute hover:bg-border-soft hover:text-text transition-colors"
                  >
                    <Tag
                      size={13}
                      className="text-text-soft"
                      style={{ color: label.color }}
                    />
                    <span>{label.name}</span>
                    <span className="ml-auto tabular text-[11px] text-text-soft">
                      {label.count}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="border-t border-border px-3 py-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5 rounded-md bg-accent-fade">
            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[12px] text-text-mute">
              AI triage <span className="text-text font-medium">on</span>
            </span>
            <span className="ml-auto text-[10px] font-mono text-text-soft">
              v1.4
            </span>
          </div>
        </div>
      </aside>

      <div className="flex flex-col overflow-hidden">
        <header className="h-14 flex items-center gap-3 px-6 border-b border-border bg-bg-elev/80 backdrop-blur-md">
          <Breadcrumbs pathname={pathname} />
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-md flex items-center gap-2 px-3 py-1.5 rounded-[10px] bg-border-soft border border-border-soft hover:border-border transition-colors">
              <Search size={14} className="text-text-soft" />
              <input
                placeholder="Search mail, threads, contacts…"
                className="flex-1 bg-transparent text-[13px] outline-none placeholder:text-text-soft"
              />
              <span className="flex items-center gap-1 text-[10px] font-mono text-text-soft">
                <Command size={10} />K
              </span>
            </div>
          </div>
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-border-soft text-text-mute transition-colors">
            <Bell size={15} />
          </button>
          <button className="h-8 w-8 grid place-items-center rounded-md hover:bg-border-soft text-text-mute transition-colors">
            <Settings size={15} />
          </button>
          <div className="ml-1 h-7 w-7 rounded-full bg-gradient-to-br from-emerald-300 to-emerald-600 ring-2 ring-bg-elev grid place-items-center text-[11px] font-semibold text-white">
            AS
          </div>
        </header>
        <main className="flex-1 overflow-hidden">{children}</main>
      </div>
    </div>
  );
}

function Breadcrumbs({ pathname }: { pathname: string }) {
  const parts: { label: string; href?: string }[] = [
    { label: "Workspace" },
  ];
  if (pathname === "/") parts.push({ label: "Smart Inbox" });
  else if (pathname.startsWith("/email/"))
    parts.push({ label: "Inbox", href: "/" }, { label: "Thread" });
  else if (pathname === "/debrief")
    parts.push({ label: "Daily Debrief" });
  return (
    <div className="flex items-center gap-1.5 text-[12.5px] text-text-mute">
      {parts.map((p, i) => (
        <span key={i} className="flex items-center gap-1.5">
          {i > 0 && <ChevronRight size={12} className="text-text-soft" />}
          {p.href ? (
            <Link href={p.href} className="hover:text-text transition-colors">
              {p.label}
            </Link>
          ) : (
            <span
              className={
                i === parts.length - 1
                  ? "text-text font-medium"
                  : "text-text-mute"
              }
            >
              {p.label}
            </span>
          )}
        </span>
      ))}
    </div>
  );
}
