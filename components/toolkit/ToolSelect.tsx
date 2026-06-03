import type { SelectHTMLAttributes } from "react";

type ToolSelectProps =
  SelectHTMLAttributes<HTMLSelectElement>;

export default function ToolSelect({
  children,
  className = "",
  ...props
}: ToolSelectProps) {
  return (
    <select
      className={`w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}