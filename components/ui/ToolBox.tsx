type ToolBoxProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ToolBox({
  children,
  className,
}: ToolBoxProps) {
  return (
    <div className={className || "rounded-2xl border border-zinc-200 bg-white p-4 text-zinc-950 shadow-sm md:p-8"}>
      {children}
    </div>
  );
}