type ToolInputProps = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
};

export default function ToolInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: ToolInputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="min-w-0 rounded-xl border border-zinc-300 bg-white p-3 text-center text-base font-semibold outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 md:p-4 md:text-lg"
    />
  );
}