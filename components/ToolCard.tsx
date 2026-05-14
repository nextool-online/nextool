import Link from "next/link";

type ToolCardProps = {
  title: string;
  description: string;
  href?: string;
};

export default function ToolCard({
  title,
  description,
  href,
}: ToolCardProps) {
  if (!href) {
    return (
      <div className="rounded-2xl border border-red-300 bg-red-50 p-6">
        <h3 className="text-xl font-bold text-red-700">{title}</h3>
        <p className="mt-2 text-red-600">Missing href for this tool card.</p>
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-md"
    >
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-zinc-600">{description}</p>
    </Link>
  );
}