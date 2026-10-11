import { useEffect, useState } from 'react';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import ForecastCard from '../components/ForecastCard';
import SearchBar from '../components/SearchBar';
import { fetchCityWeather } from '../services/weatherApi';
import type { TemperatureUnit, WeatherResult } from '../types/weather';

export default function WeatherPage() {
  const [search, setSearch] = useState({ city: 'Seattle', id: 0 });
  const [unit, setUnit] = useState<TemperatureUnit>('C');
  const [weather, setWeather] = useState<WeatherResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController(); // Allows cancelation of the request (semeed to be the best option)

    setLoading(true);
    setError('');
    setWeather(null);

    void (async () => {
      try {
        const result = await fetchCityWeather(search.city, controller.signal);
        if (!controller.signal.aborted) setWeather(result);
      }
      catch (cause) {
        if (!controller.signal.aborted) {
          setError(`Erorr: ${cause}`);
        }
      }
      finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();

    return () => controller.abort();
  }, [search]);

  function handleSearch(city: string) {
    setSearch(previous => ({ city, id: previous.id + 1 }));
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-8 text-white sm:px-8">
      <header className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-cyan-400 p-3 text-2xl text-slate-900">☀</span>
          <div>
            <strong className="block text-2xl">skyline</strong>
            <small className="text-slate-400">YOUR DAILY FORECAST</small>
          </div>
        </div>

        <div className="flex gap-1 rounded-xl bg-white/10 p-1" role="group" aria-label="Temperature units">
          {(['C', 'F'] as const).map(value => (
            <button key={value} type="button" onClick={() => setUnit(value)} aria-pressed={unit === value}
              className={`rounded-lg px-3 py-2 ${unit === value ? 'bg-white font-bold text-slate-900' : 'text-slate-300'}`}>°{value}
            </button>
          ))}
        </div>
      </header>

      <section className="mb-8">
        <p className="mb-2 text-sm font-bold text-cyan-300">WEATHER, MADE SIMPLE</p>
        <h1 className="mb-3 text-4xl font-bold sm:text-6xl"> A clearer look at <span className="text-cyan-300">your day.</span></h1>
        <p className="text-slate-300">Real-time conditions and a five-day outlook, anywhere in the world.</p>
      </section>

      <SearchBar onSearch={handleSearch} loading={loading} />

      {error && <p className="mb-6 rounded-lg bg-red-900/40 p-4 text-red-200" role="alert">{error}</p>}

      {loading && (
        <div className="mb-6 flex items-center gap-3" role="status">
          <span className="size-5 animate-spin rounded-full border-2 border-r-transparent" /> Fetching the latest forecast...
        </div>
      )}

      {!loading && weather && (<> <CurrentWeatherCard weather={weather.current} unit={unit} />
          <ForecastCard days={weather.days} unit={unit} /></>
      )}

      <footer className="pt-10 text-center text-xs text-slate-400">
        Weather data by <a className="text-cyan-300 hover:underline" href="https://openweathermap.org/" target="_blank" rel="noreferrer">OpenWeatherMap</a>
      </footer>
    </main>
  );
}
