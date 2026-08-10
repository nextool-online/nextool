type ToolInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onInput?: (event: React.FormEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
};

export default function ToolInput({
  value,
  onChange,
  onInput,
  placeholder,
  inputMode,
  type = "text",
}: ToolInputProps) {
  return (
    <input
      type={type}
      inputMode={inputMode}
      value={value}
      onChange={onChange}
      onInput={onInput}
      placeholder={placeholder}
      className="block w-full min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-lg font-semibold text-zinc-950 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
    />
  );
}