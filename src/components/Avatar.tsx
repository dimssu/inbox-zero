import Image from "next/image";
import type { Person } from "@/data/people";

export function Avatar({
  person,
  size = 32,
  ring = false,
}: {
  person: Person;
  size?: number;
  ring?: boolean;
}) {
  return (
    <div
      className={`relative shrink-0 rounded-full overflow-hidden bg-border-soft ${
        ring ? "ring-2 ring-bg-elev" : ""
      }`}
      style={{ width: size, height: size }}
    >
      <Image
        src={person.avatar}
        alt={person.name}
        width={size}
        height={size}
        className="object-cover"
        unoptimized
      />
    </div>
  );
}
