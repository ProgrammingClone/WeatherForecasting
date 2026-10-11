import { useState, type FormEvent } from 'react';

export default function SearchBar({ onSearch, loading }: { onSearch: (city: string) => void; loading: boolean }) {
  const [input, setInput] = useState('Seattle');
  const [validation, setValidation] = useState('');

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const city = input.trim();
    if (!city) { setValidation('Please enter a city name.'); return; }

    setValidation('');
    onSearch(city);
  }

  return (
    <div className="mb-8 max-w-2xl">
      <form className="flex gap-2 rounded-xl bg-slate-800 p-2" onSubmit={submit} role="search">
        <label className="sr-only" htmlFor="city">City</label>

        <input id="city" className="min-w-0 flex-1 bg-transparent px-3 py-2 outline-none" value={input}
          onChange={event => { setInput(event.target.value); setValidation(''); }} placeholder="Search for a city..." autoComplete="off" />

        <button className="rounded-lg bg-aqua px-4 py-2 font-semibold text-slate-900 hover:bg-cyan-200 disabled:opacity-50" type="submit" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {validation && <p className="mt-2 text-sm text-red-300" role="alert">{validation}</p>}
    </div>
  );
}