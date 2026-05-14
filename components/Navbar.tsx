export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
      <h2 className="text-2xl font-bold">Nextool</h2>

      <div className="flex gap-6 text-sm">
        <a href="#">Tools</a>
        <a href="#">Calculators</a>
        <a href="#">Generators</a>
      </div>
    </nav>
  );
}