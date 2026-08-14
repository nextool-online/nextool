type ToolBoxProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "fitness";
};

export default function ToolBox({
  children,
  className,
  variant = "default",
}: ToolBoxProps) {
  const defaultClassName =
    variant === "fitness"
      ? "rounded-[2rem] border border-sky-300 bg-white/95 p-4 text-slate-950 shadow-[0_24px_70px_rgba(14,116,144,0.20)] ring-1 ring-sky-100 md:p-8"
      : "rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-950 shadow-sm md:p-8";

  return (
    <div className={className || defaultClassName}>
      {children}
    </div>
  );
}
