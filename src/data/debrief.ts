export type DebriefStat = {
  label: string;
  value: number;
  delta: number;
  unit?: string;
};

export type DebriefItem = {
  id: string;
  senderId: string;
  subject: string;
  reason: string;
  meta: string;
  badge?: string;
};

export type TrendPoint = {
  day: string;
  sent: number;
  received: number;
  drafted: number;
};

export const yesterdayStats: DebriefStat[] = [
  { label: "Sent", value: 14, delta: 12 },
  { label: "Received", value: 38, delta: -4 },
  { label: "Drafted", value: 7, delta: 28 },
  { label: "Snoozed", value: 5, delta: 0 },
  { label: "Auto-archived", value: 21, delta: 31 },
];

export const needsEye: DebriefItem[] = [
  {
    id: "ne-001",
    senderId: "p-008",
    subject: "Confirming Tuesday partner meeting",
    reason: "High-stakes investor follow-up · 3 days unanswered",
    meta: "Investors · 3d",
    badge: "Investor",
  },
  {
    id: "ne-002",
    senderId: "p-027",
    subject: "[Action needed] Lease renewal at 599 Market",
    reason: "Hard deadline May 12 — no draft yet",
    meta: "Vendors · 2d",
    badge: "Deadline",
  },
  {
    id: "ne-003",
    senderId: "p-007",
    subject: "Intro: Marco @ Sequoia ↔ Aryan",
    reason: "Warm intro from a referrer; awaiting reply 4 days",
    meta: "Investors · 4d",
    badge: "Intro",
  },
  {
    id: "ne-004",
    senderId: "p-009",
    subject: "Payroll approval needed by 5pm",
    reason: "Payroll cut-off in 7 hours · $87,412 net",
    meta: "Finance · today",
    badge: "Urgent",
  },
  {
    id: "ne-005",
    senderId: "p-006",
    subject: "Doc review — Inbox Zero PRD v3",
    reason: "14 comments left on doc; PM is blocked",
    meta: "Team · 1d",
    badge: "Blocking",
  },
  {
    id: "ne-006",
    senderId: "p-001",
    subject: "Re: Q2 OKR review — pushing to Friday?",
    reason: "Proposed time conflicts with board prep call",
    meta: "Customers · 4h",
    badge: "Conflict",
  },
];

export const autoHandled: DebriefItem[] = [
  {
    id: "ah-001",
    senderId: "p-024",
    subject: "[GitHub] 14 PRs awaiting your review",
    reason: "Auto-archived — recurring digest, opened in app",
    meta: "FYI · 6h",
    badge: "Archived",
  },
  {
    id: "ah-002",
    senderId: "p-025",
    subject: "AWS billing — April invoice $4,218.44",
    reason: "Routed to #finance channel · receipt logged",
    meta: "Vendors · 8h",
    badge: "Routed",
  },
  {
    id: "ah-003",
    senderId: "p-015",
    subject: "Save 30% on Arc Pro this month only",
    reason: "Unsubscribed — promo from inactive vendor",
    meta: "Promo · 9h",
    badge: "Unsubscribed",
  },
  {
    id: "ah-004",
    senderId: "p-019",
    subject: "Datadog: 4 services nearing usage limit",
    reason: "Filed in 'Capacity' label · synced to Linear ticket",
    meta: "FYI · 12h",
    badge: "Filed",
  },
  {
    id: "ah-005",
    senderId: "p-022",
    subject: "Kettle — your weekly briefing",
    reason: "Auto-archived after 30 minutes (you've ignored 3 in a row)",
    meta: "Newsletter · 14h",
    badge: "Archived",
  },
  {
    id: "ah-006",
    senderId: "p-017",
    subject: "Loom Annual — limited-time anniversary pricing",
    reason: "Promo with no prior engagement · auto-archived",
    meta: "Promo · 16h",
    badge: "Archived",
  },
];

export const trend: TrendPoint[] = [
  { day: "Mon", sent: 12, received: 41, drafted: 4 },
  { day: "Tue", sent: 9, received: 36, drafted: 3 },
  { day: "Wed", sent: 17, received: 44, drafted: 6 },
  { day: "Thu", sent: 11, received: 39, drafted: 5 },
  { day: "Fri", sent: 14, received: 38, drafted: 7 },
  { day: "Sat", sent: 4, received: 18, drafted: 1 },
  { day: "Sun", sent: 6, received: 22, drafted: 2 },
];
