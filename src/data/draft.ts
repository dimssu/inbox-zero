export type DraftTone = "friendly" | "direct" | "formal";

export type Draft = {
  tone: DraftTone;
  label: string;
  hint: string;
  subject: string;
  body: string;
  citations: { quote: string; from: string; reason: string }[];
};

export const drafts: Record<DraftTone, Draft> = {
  friendly: {
    tone: "friendly",
    label: "Friendly",
    hint: "Warm, easygoing — for trusted partners",
    subject: "Re: Q2 OKR review — pushing to Friday?",
    body: "Hey Mira,\n\nFriday 3pm PT works great on my side — let's lock it in. The eng team should be wrapping the lane-reorder ship around lunchtime, so we'll have the freshest pricing numbers ready to fold into the discussion.\n\nIf 14% holds across cohorts that's a really nice surprise. I'll bring my hard-stop at 4:30 in case we need to keep it tight.\n\nThanks for the heads up on the merchant data — looking forward to it.\n\nA",
    citations: [
      {
        quote:
          "Friday 3pm PT? Otherwise I can do Thursday after standup.",
        from: "Mira's most recent message",
        reason:
          "Mira proposed two specific times. The reply explicitly accepts the first.",
      },
      {
        quote:
          "we're seeing about a 14% lift on the new pricing page",
        from: "Mira's most recent message",
        reason:
          "Acknowledged so Mira knows we registered the data point she's bringing.",
      },
      {
        quote: "I have a hard stop at 4:30 for a board prep call",
        from: "Your reply on Mon, Apr 28",
        reason:
          "Re-surfaced so Mira plans the agenda around the 90-minute window.",
      },
    ],
  },
  direct: {
    tone: "direct",
    label: "Direct",
    hint: "Tight and specific — no padding",
    subject: "Re: Q2 OKR review — pushing to Friday?",
    body: "Mira — Friday 3pm PT confirmed. Hard stop at 4:30, so let's keep the deck tight: targets, the 14% pricing lift, and one slide on dependency risks.\n\nI'll send a calendar invite this morning.\n\nA",
    citations: [
      {
        quote: "Does Friday 3pm PT work?",
        from: "Mira's most recent message",
        reason: "Confirmed without restating both options.",
      },
      {
        quote: "I have a hard stop at 4:30",
        from: "Your reply on Mon, Apr 28",
        reason:
          "Direct tone surfaces the constraint up-front so Mira can plan the deck.",
      },
    ],
  },
  formal: {
    tone: "formal",
    label: "Formal",
    hint: "Polished and structured — for partners or external execs",
    subject: "Re: Q2 OKR review — pushing to Friday?",
    body: "Hi Mira,\n\nThanks for the note. Friday at 3:00 PM PT is confirmed on my side. As mentioned previously, I have a hard stop at 4:30 PM, so I'd like to ensure we cover the Q2 targets and the latest activation numbers within that window.\n\nI'll circulate a calendar invite shortly with a working agenda. Please let me know if there's anything additional you'd like included.\n\nBest regards,\nAryan Singh",
    citations: [
      {
        quote: "Does Friday 3pm PT work?",
        from: "Mira's most recent message",
        reason: "Confirmation of the proposed slot.",
      },
      {
        quote: "we're seeing about a 14% lift on the new pricing page",
        from: "Mira's most recent message",
        reason: "Folded into the agenda as a discussion item.",
      },
      {
        quote: "I have a hard stop at 4:30 for a board prep call",
        from: "Your reply on Mon, Apr 28",
        reason: "Restated formally to confirm the meeting window.",
      },
    ],
  },
};
