type ToolSectionProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function ToolSection({
  title,
  description,
  children,
}: ToolSectionProps) {
  return (
    <section>
      <div className="mb-5">
        <h2 className="text-xl font-bold md:text-2xl">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-zinc-600">{description}</p>
        )}
      </div>

      {children}
    </section>
  );
}