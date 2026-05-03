export type ThreadMessage = {
  id: string;
  senderId: string;
  to: string[];
  time: string;
  body: string;
  isQuoted?: boolean;
  collapsedQuote?: string;
};

export type Thread = {
  id: string;
  subject: string;
  participants: string[];
  messages: ThreadMessage[];
};

export const threads: Record<string, Thread> = {
  "th-001": {
    id: "th-001",
    subject: "Re: Q2 OKR review — pushing to Friday?",
    participants: ["p-001"],
    messages: [
      {
        id: "msg-001",
        senderId: "p-001",
        to: ["aryansi1126@gmail.com"],
        time: "Mon, Apr 28 · 10:14 AM",
        body: "Hey Aryan,\n\nQuick scheduling question — you'd originally proposed Wednesday for the Q2 OKR review. I wanted to flag that we're getting fresh activation data Wednesday morning and I'd really like to fold it in before walking the team through targets.\n\nWould pushing to Friday afternoon be workable? It would also give your eng team an extra day to put numbers behind the new pricing experiment.\n\nLet me know,\nMira",
      },
      {
        id: "msg-002",
        senderId: "aryansi1126",
        to: ["mira@stripe.com"],
        time: "Mon, Apr 28 · 11:02 AM",
        body: "Mira — totally fine in principle. The eng team has Friday afternoon mostly clear (we're shipping the lane reordering feature Friday morning). Can you do 3pm PT or earlier? I have a hard stop at 4:30 for a board prep call.\n\nA",
      },
      {
        id: "msg-003",
        senderId: "p-001",
        to: ["aryansi1126@gmail.com"],
        time: "Today · 9:42 AM",
        body: "Aryan, quick one. Given the merchant feedback we got Tuesday, I'd love to push our Q2 OKR review to Friday so I can fold in the latest activation numbers. We're seeing about a 14% lift on the new pricing page that I want to make sure the eng team factors in.\n\nDoes Friday 3pm PT work? Otherwise I can do Thursday after standup.\n\n— Mira",
        collapsedQuote:
          "On Mon, Apr 28 at 11:02 AM, you wrote: > Mira — totally fine in principle. The eng team has Friday afternoon mostly clear...",
      },
    ],
  },
};

export function getThread(id: string): Thread {
  const t = threads[id];
  if (!t) throw new Error(`Thread ${id} not found`);
  return t;
}
