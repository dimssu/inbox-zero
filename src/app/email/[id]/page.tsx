import { notFound } from "next/navigation";
import { Shell } from "@/components/Shell";
import { ThreadView } from "@/components/ThreadView";
import { emails } from "@/data/emails";
import { threads } from "@/data/threads";

export default async function EmailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const email = emails.find((e) => e.id === id);
  if (!email) notFound();
  const thread = threads[email.threadId] ?? threads["th-001"];
  return (
    <Shell>
      <ThreadView email={email} thread={thread} />
    </Shell>
  );
}

export function generateStaticParams() {
  return emails.map((e) => ({ id: e.id }));
}
