export type Lane = "todo" | "awaiting" | "fyi" | "newsletter" | "promo";
export type SuggestedAction = "reply" | "snooze" | "archive" | "schedule";

export type Email = {
  id: string;
  senderId: string;
  subject: string;
  snippet: string;
  body: string;
  time: string;
  lane: Lane;
  suggestedAction: SuggestedAction;
  threadId: string;
  isUnread: boolean;
  isStarred?: boolean;
  hasAttachment?: boolean;
  labels?: string[];
};

export const lanes: {
  id: Lane;
  label: string;
  color: string;
  hint: string;
  count: number;
}[] = [
  {
    id: "todo",
    label: "To-do",
    color: "#10b981",
    hint: "Needs your action today",
    count: 7,
  },
  {
    id: "awaiting",
    label: "Awaiting reply",
    color: "#3b82f6",
    hint: "You're blocked on someone else",
    count: 5,
  },
  {
    id: "fyi",
    label: "FYI",
    color: "#a855f7",
    hint: "Read when you have a moment",
    count: 6,
  },
  {
    id: "newsletter",
    label: "Newsletter",
    color: "#f59e0b",
    hint: "Curated reading",
    count: 5,
  },
  {
    id: "promo",
    label: "Promotional",
    color: "#78716c",
    hint: "Auto-archived after 24h",
    count: 4,
  },
];

export const emails: Email[] = [
  {
    id: "em-001",
    senderId: "p-001",
    subject: "Re: Q2 OKR review — pushing to Friday?",
    snippet:
      "Aryan, quick one. Given the merchant feedback we got Tuesday, I'd love to push our Q2 OKR review to Friday so I can fold in the…",
    body: "Aryan, quick one. Given the merchant feedback we got Tuesday, I'd love to push our Q2 OKR review to Friday so I can fold in the latest activation numbers. We're seeing about a 14% lift on the new pricing page that I want to make sure the eng team factors in.\n\nDoes Friday 3pm PT work? Otherwise I can do Thursday after standup.\n\n— Mira",
    time: "9:42 AM",
    lane: "todo",
    suggestedAction: "reply",
    threadId: "th-001",
    isUnread: true,
    isStarred: true,
    labels: ["Customers"],
  },
  {
    id: "em-002",
    senderId: "p-002",
    subject: "Deploy logs for inbox-zero — needs review",
    snippet:
      "The latest preview build is up. Bundle size grew by 11kb (Framer Motion lazy loaded). Tag me when you've taken a look so we can ship.",
    body: "The latest preview build is up. Bundle size grew by 11kb (Framer Motion lazy loaded). Tag me when you've taken a look so we can ship before the demo.\n\n— Daniel",
    time: "9:18 AM",
    lane: "todo",
    suggestedAction: "reply",
    threadId: "th-002",
    isUnread: true,
    labels: ["Team"],
  },
  {
    id: "em-003",
    senderId: "p-027",
    subject: "[Action needed] Lease renewal at 599 Market",
    snippet:
      "Hi Aryan, your current lease expires June 30. We need a signed renewal letter or 60-day notice by May 12 to avoid month-to-month rates.",
    body: "Hi Aryan, your current lease expires June 30. We need a signed renewal letter or 60-day notice by May 12 to avoid month-to-month rates.\n\nThe new rate is $48/sqft (vs. $44 last year). Happy to walk through it.\n\n— Building Ops",
    time: "8:51 AM",
    lane: "todo",
    suggestedAction: "schedule",
    threadId: "th-003",
    isUnread: true,
    labels: ["Vendors"],
  },
  {
    id: "em-004",
    senderId: "p-007",
    subject: "Intro: Marco @ Sequoia ↔ Aryan",
    snippet:
      "Pleasure meeting at the AI Founders dinner. Following up on the inbox-triage work — would love to set up a 30 min later this week.",
    body: "Pleasure meeting at the AI Founders dinner. Following up on the inbox-triage work — would love to set up a 30 min later this week. Sharing my Calendly below; pick anything that works.\n\nLooking forward,\nMarco",
    time: "8:30 AM",
    lane: "todo",
    suggestedAction: "schedule",
    threadId: "th-004",
    isUnread: true,
    isStarred: true,
    labels: ["Investors"],
  },
  {
    id: "em-005",
    senderId: "p-009",
    subject: "Payroll approval needed by 5pm",
    snippet:
      "Hey — payroll for the May 5 run needs your sign-off. Total net is $87,412 across 18 employees. Two new hires included.",
    body: "Hey — payroll for the May 5 run needs your sign-off. Total net is $87,412 across 18 employees. Two new hires included (Felix and Hana).\n\nDeadline is 5pm today.\n\n— Jordan",
    time: "8:14 AM",
    lane: "todo",
    suggestedAction: "reply",
    threadId: "th-005",
    isUnread: true,
    labels: ["Vendors"],
  },
  {
    id: "em-006",
    senderId: "p-013",
    subject: "Bug repro: lane drag-and-drop on Safari 17",
    snippet:
      "Reproduced. The pointerEvents handler on the lane header swallows the drop when the user hovers a sibling row first.",
    body: "Reproduced. The pointerEvents handler on the lane header swallows the drop when the user hovers a sibling row first. Filed as ENG-2241. Want me to take it or is Daniel on it?\n\n— Felix",
    time: "7:55 AM",
    lane: "todo",
    suggestedAction: "reply",
    threadId: "th-006",
    isUnread: true,
    labels: ["Team"],
  },
  {
    id: "em-007",
    senderId: "p-006",
    subject: "Doc review — Inbox Zero PRD v3",
    snippet:
      "Left 14 comments on the PRD. Big one: I think we should kill the 'auto-snooze' feature for the v1 launch.",
    body: "Left 14 comments on the PRD. Big one: I think we should kill the 'auto-snooze' feature for the v1 launch — we've seen it confuse users in three of the last four research sessions.\n\nLet me know what you think before tomorrow's review.\n\n— Priya",
    time: "Yesterday",
    lane: "todo",
    suggestedAction: "reply",
    threadId: "th-007",
    isUnread: false,
    labels: ["Team"],
  },
  {
    id: "em-008",
    senderId: "p-008",
    subject: "Confirming Tuesday partner meeting",
    snippet:
      "Just confirming you're presenting to the partnership Tuesday at 10am PT. Full partner room — about 9 people. Slides by Monday EOD.",
    body: "Just confirming you're presenting to the partnership Tuesday at 10am PT. Full partner room — about 9 people. Slides by Monday EOD please.\n\nLet me know if you need any prep — happy to do a dry run Sunday night.\n\n— Elena",
    time: "Yesterday",
    lane: "todo",
    suggestedAction: "schedule",
    threadId: "th-008",
    isUnread: false,
    isStarred: true,
    labels: ["Investors"],
  },
  {
    id: "em-009",
    senderId: "p-003",
    subject: "Re: Linear → Slack alert routing",
    snippet:
      "Sent over the API key Wednesday. Waiting on your team to wire up the webhook before I can finish the rollout doc.",
    body: "Sent over the API key Wednesday. Waiting on your team to wire up the webhook before I can finish the rollout doc.\n\n— Yuki",
    time: "Yesterday",
    lane: "awaiting",
    suggestedAction: "snooze",
    threadId: "th-009",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-010",
    senderId: "p-014",
    subject: "Hex workspace upgrade quote",
    snippet:
      "Quote attached for the Pro tier upgrade ($1,800/yr difference). Need a PO number from your side to push it through procurement.",
    body: "Quote attached for the Pro tier upgrade ($1,800/yr difference). Need a PO number from your side to push it through procurement.\n\n— Camille",
    time: "Yesterday",
    lane: "awaiting",
    suggestedAction: "snooze",
    threadId: "th-010",
    isUnread: false,
    hasAttachment: true,
    labels: ["Vendors"],
  },
  {
    id: "em-011",
    senderId: "p-016",
    subject: "Plaid integration — sandbox keys",
    snippet:
      "Pinged your eng team on Monday with the sandbox keys. Haven't heard back. Bumping in case it slipped through.",
    body: "Pinged your eng team on Monday with the sandbox keys. Haven't heard back. Bumping in case it slipped through.\n\n— Anika",
    time: "Mon",
    lane: "awaiting",
    suggestedAction: "snooze",
    threadId: "th-011",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-012",
    senderId: "p-010",
    subject: "Contractor agreement countersignature",
    snippet:
      "Sent the counter-signed version of Felix's contract Tuesday. Just need a confirmation email from your team for our records.",
    body: "Sent the counter-signed version of Felix's contract Tuesday. Just need a confirmation email from your team for our records.\n\n— Aisha",
    time: "Mon",
    lane: "awaiting",
    suggestedAction: "snooze",
    threadId: "th-012",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-013",
    senderId: "p-011",
    subject: "Brex card request — pending approval",
    snippet:
      "New card for Naomi is sitting in your approval queue since Wednesday. Should be quick — daily limit set to $500.",
    body: "New card for Naomi is sitting in your approval queue since Wednesday. Should be quick — daily limit set to $500.\n\n— Theo",
    time: "Mon",
    lane: "awaiting",
    suggestedAction: "snooze",
    threadId: "th-013",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-014",
    senderId: "p-024",
    subject: "[GitHub] 14 PRs awaiting your review",
    snippet:
      "You have 14 pull requests awaiting review across 3 repositories. Oldest: chore/ci-pin-node opened 6 days ago.",
    body: "You have 14 pull requests awaiting review across 3 repositories. Oldest: chore/ci-pin-node opened 6 days ago.\n\nView dashboard.",
    time: "Sun",
    lane: "fyi",
    suggestedAction: "archive",
    threadId: "th-014",
    isUnread: false,
    labels: ["Team"],
  },
  {
    id: "em-015",
    senderId: "p-001",
    subject: "Stripe receipt — Sub renewal $99.00",
    snippet:
      "Your subscription renewed today. Receipt #4-7188-2241. View invoice or update payment method anytime.",
    body: "Your subscription renewed today. Receipt #4-7188-2241. View invoice or update payment method anytime.\n\n— The Stripe Team",
    time: "Sun",
    lane: "fyi",
    suggestedAction: "archive",
    threadId: "th-015",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-016",
    senderId: "p-004",
    subject: "Ramp: weekly card report",
    snippet:
      "$8,412 spent this week across 47 transactions. Top category: Software ($3,228). 2 receipts still need to be uploaded.",
    body: "$8,412 spent this week across 47 transactions. Top category: Software ($3,228). 2 receipts still need to be uploaded.\n\n— Sofia",
    time: "Sun",
    lane: "fyi",
    suggestedAction: "archive",
    threadId: "th-016",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-017",
    senderId: "p-019",
    subject: "Datadog: 4 services nearing usage limit",
    snippet:
      "4 services are within 10% of their monthly log volume cap. inbox-zero-api leads at 91%. Auto-purge kicks in May 31.",
    body: "4 services are within 10% of their monthly log volume cap. inbox-zero-api leads at 91%. Auto-purge kicks in May 31.\n\n— Datadog",
    time: "Sat",
    lane: "fyi",
    suggestedAction: "archive",
    threadId: "th-017",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-018",
    senderId: "p-025",
    subject: "AWS billing — April invoice $4,218.44",
    snippet:
      "Your April AWS invoice is now available. The total is $4,218.44 — down 6% MoM after the rightsizing review.",
    body: "Your April AWS invoice is now available. The total is $4,218.44 — down 6% MoM after the rightsizing review.\n\n— AWS Billing",
    time: "Sat",
    lane: "fyi",
    suggestedAction: "archive",
    threadId: "th-018",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-019",
    senderId: "p-026",
    subject: "Google Workspace — 2 admin policy updates",
    snippet:
      "Two new admin policies took effect this week: external sharing restrictions and a refreshed device management baseline.",
    body: "Two new admin policies took effect this week: external sharing restrictions and a refreshed device management baseline.\n\n— Google Workspace",
    time: "Fri",
    lane: "fyi",
    suggestedAction: "archive",
    threadId: "th-019",
    isUnread: false,
    labels: ["Vendors"],
  },
  {
    id: "em-020",
    senderId: "p-023",
    subject: "Newsletter — Last Week in AI #142",
    snippet:
      "This week: GPT-5 router changes, Anthropic's new tools spec, and why agentic coding eval scores are converging.",
    body: "This week: GPT-5 router changes, Anthropic's new tools spec, and why agentic coding eval scores are converging.\n\nRead online →",
    time: "Fri",
    lane: "newsletter",
    suggestedAction: "archive",
    threadId: "th-020",
    isUnread: false,
  },
  {
    id: "em-021",
    senderId: "p-018",
    subject: "Superhuman → Inbox Zero: tips for keyboard-first email",
    snippet:
      "Top three keyboard tricks our power users use: auto-archive on send (B), batched read receipts (E E), and split inbox views (V).",
    body: "Top three keyboard tricks our power users use: auto-archive on send (B), batched read receipts (E E), and split inbox views (V).\n\n— The Superhuman team",
    time: "Fri",
    lane: "newsletter",
    suggestedAction: "archive",
    threadId: "th-021",
    isUnread: false,
  },
  {
    id: "em-022",
    senderId: "p-020",
    subject: "Sentry digest — 12 new issues",
    snippet:
      "12 new issues this week, most in inbox-zero-web. Top regression: useEffect cleanup leak on the thread route.",
    body: "12 new issues this week, most in inbox-zero-web. Top regression: useEffect cleanup leak on the thread route.\n\n— Sentry",
    time: "Thu",
    lane: "newsletter",
    suggestedAction: "archive",
    threadId: "th-022",
    isUnread: false,
  },
  {
    id: "em-023",
    senderId: "p-021",
    subject: "Cushion Fund — new investment memo",
    snippet:
      "Our latest LP letter: returns trended +6.2% YTD, with the bulk coming from the Q1 climate-tech allocation.",
    body: "Our latest LP letter: returns trended +6.2% YTD, with the bulk coming from the Q1 climate-tech allocation.\n\n— Brennan",
    time: "Thu",
    lane: "newsletter",
    suggestedAction: "archive",
    threadId: "th-023",
    isUnread: false,
  },
  {
    id: "em-024",
    senderId: "p-022",
    subject: "Kettle — your weekly briefing",
    snippet:
      "Three macro charts, one micro chart, one quote that disagrees with all of them. 4 minute read.",
    body: "Three macro charts, one micro chart, one quote that disagrees with all of them. 4 minute read.\n\n— Imani",
    time: "Thu",
    lane: "newsletter",
    suggestedAction: "archive",
    threadId: "th-024",
    isUnread: false,
  },
  {
    id: "em-025",
    senderId: "p-015",
    subject: "Save 30% on Arc Pro this month only",
    snippet:
      "Pro plans are 30% off through May 31. Includes the new spaces feature and unlimited boost CSS injection.",
    body: "Pro plans are 30% off through May 31. Includes the new spaces feature and unlimited boost CSS injection.\n\nUnsubscribe.",
    time: "Wed",
    lane: "promo",
    suggestedAction: "archive",
    threadId: "th-025",
    isUnread: false,
  },
  {
    id: "em-026",
    senderId: "p-017",
    subject: "Loom Annual — limited-time anniversary pricing",
    snippet:
      "Lock in $144/yr (normally $192) before May 10. Includes our new AI-summary feature for any recording over 30s.",
    body: "Lock in $144/yr (normally $192) before May 10. Includes our new AI-summary feature for any recording over 30s.\n\nUnsubscribe.",
    time: "Wed",
    lane: "promo",
    suggestedAction: "archive",
    threadId: "th-026",
    isUnread: false,
  },
  {
    id: "em-027",
    senderId: "p-005",
    subject: "Figma Config '26 — early-bird tickets open",
    snippet:
      "We're back in San Francisco June 24–26. Early-bird passes are $899 through May 31 (regular $1,299).",
    body: "We're back in San Francisco June 24–26. Early-bird passes are $899 through May 31 (regular $1,299).\n\nUnsubscribe.",
    time: "Wed",
    lane: "promo",
    suggestedAction: "archive",
    threadId: "th-027",
    isUnread: false,
  },
  {
    id: "em-028",
    senderId: "p-012",
    subject: "Mercury — refer a founder, get $500",
    snippet:
      "Refer a founder who opens a Mercury account this month and you'll both earn a $500 statement credit.",
    body: "Refer a founder who opens a Mercury account this month and you'll both earn a $500 statement credit.\n\nUnsubscribe.",
    time: "Tue",
    lane: "promo",
    suggestedAction: "archive",
    threadId: "th-028",
    isUnread: false,
  },
];

export function getEmail(id: string): Email {
  const e = emails.find((x) => x.id === id);
  if (!e) throw new Error(`Email ${id} not found`);
  return e;
}

export function emailsByLane(): Record<Lane, Email[]> {
  return emails.reduce(
    (acc, e) => {
      acc[e.lane].push(e);
      return acc;
    },
    {
      todo: [] as Email[],
      awaiting: [] as Email[],
      fyi: [] as Email[],
      newsletter: [] as Email[],
      promo: [] as Email[],
    },
  );
}
