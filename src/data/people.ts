export type Person = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  company: string;
  initials: string;
};

const av = (seed: string) =>
  `https://api.dicebear.com/9.x/notionists-neutral/svg?seed=${encodeURIComponent(seed)}&backgroundType=gradientLinear&backgroundColor=d1fae5,ecfdf5,fef3c7,dbeafe,fee2e2`;

const init = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const make = (
  id: string,
  name: string,
  email: string,
  company: string,
): Person => ({
  id,
  name,
  email,
  avatar: av(name),
  company,
  initials: init(name),
});

export const people: Person[] = [
  make("p-001", "Mira Patel", "mira@stripe.com", "Stripe"),
  make("p-002", "Daniel Okafor", "d.okafor@vercel.com", "Vercel"),
  make("p-003", "Yuki Tanaka", "yuki@linear.app", "Linear"),
  make("p-004", "Sofia Reyes", "sofia.r@ramp.com", "Ramp"),
  make("p-005", "Henrik Sørensen", "henrik@figma.com", "Figma"),
  make("p-006", "Priya Iyer", "priya@notion.so", "Notion"),
  make("p-007", "Marco Velasquez", "marco@sequoia.com", "Sequoia"),
  make("p-008", "Elena Kowalski", "elena@a16z.com", "Andreessen Horowitz"),
  make("p-009", "Jordan Whitfield", "jordan@gusto.com", "Gusto"),
  make("p-010", "Aisha Bello", "aisha@deel.com", "Deel"),
  make("p-011", "Theo Lindqvist", "theo@brex.com", "Brex"),
  make("p-012", "Rashida Cole", "rashida@mercury.com", "Mercury"),
  make("p-013", "Felix Nguyen", "felix@retool.com", "Retool"),
  make("p-014", "Camille Dupont", "camille@hex.tech", "Hex"),
  make("p-015", "Owen Brennan", "owen@arc.dev", "Arc"),
  make("p-016", "Anika Rao", "anika@plaid.com", "Plaid"),
  make("p-017", "Lucas Berg", "lucas@loom.com", "Loom"),
  make("p-018", "Naomi Park", "naomi@superhuman.com", "Superhuman"),
  make("p-019", "Diego Marín", "diego@datadog.com", "Datadog"),
  make("p-020", "Hana Petrov", "hana@sentry.io", "Sentry"),
  make("p-021", "Brennan Walsh", "brennan@cushionfund.com", "Cushion Fund"),
  make("p-022", "Imani Johnson", "imani@kettle.io", "Kettle"),
  make("p-023", "Last Week in AI", "issue@lastweekinai.com", "LWiAI"),
  make("p-024", "GitHub", "noreply@github.com", "GitHub"),
  make("p-025", "AWS Billing", "billing@aws.amazon.com", "AWS"),
  make("p-026", "Google Workspace", "billing@google.com", "Google"),
  make("p-027", "Lease Office", "leasing@599market.com", "599 Market"),
];

export function getPerson(id: string): Person {
  const p = people.find((x) => x.id === id);
  if (!p) throw new Error(`Person ${id} not found`);
  return p;
}
