import { Link } from 'react-router';

export default function NotFoundPage() {
  return (
    <main className="mx-auto max-w-[1060px] px-4 pt-[12vh] text-[#f1f6ff] sm:px-7">
      <p className="mb-3 text-xs font-bold tracking-widest text-[#7bd3e9]">404 · PAGE NOT FOUND</p>
      <Link className="text-aqua hover:underline" to="/">← Back to the weather</Link> // Link wont realod the whole page like a normal anchor tag would
    </main>
  );
}
