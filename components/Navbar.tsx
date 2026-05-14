import Link from "next/link";
import { categories } from "../data/categories";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
      <Link href="/" className="text-2xl font-bold">
        Nextool
      </Link>

      <div className="flex gap-6 text-sm font-medium">
        {categories.map((category) => {
          const slug = category
            ?.toLowerCase()
            .replaceAll(" ", "-");

          return (
            <Link
              key={category}
              href={`/categories/${slug}`}
            >
              {category}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}