type ToolResultProps = {
  value: string;
  placeholder?: string;
  onCopy?: () => void;
  copied?: boolean;
  copyLabel?: string;
};

export default function ToolResult({
  value,
  placeholder = "—",
  onCopy,
  copied = false,
  copyLabel = "Copy result",
}: ToolResultProps) {
  return (
    <div className="flex min-w-0 items-center overflow-hidden rounded-xl border border-zinc-300 bg-zinc-100">
      <div className="min-w-0 flex-1 truncate p-3 text-center text-base font-bold md:p-4 md:text-lg">
        {value || <span className="text-zinc-400">{placeholder}</span>}
      </div>

      {onCopy && (
        <button
          type="button"
          onClick={onCopy}
          disabled={!value}
          aria-label={copyLabel}
          className="border-l border-zinc-300 px-3 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-40 md:px-4 md:py-4"
        >
          {copied ? "✓" : "⧉"}
        </button>
      )}
    </div>
  );
}