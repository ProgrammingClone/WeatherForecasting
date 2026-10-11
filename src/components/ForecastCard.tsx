import type { DailyForecast, TemperatureUnit } from '../types/weather';
import { temperature, weatherIcon } from '../utils/weather';

export default function ForecastCard({ days, unit }: { days: DailyForecast[]; unit: TemperatureUnit }) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">5 day forecast</h2>
        <span className="text-sm text-slate-400">High / Low</span>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {days.map(day => (
          <article className="rounded-xl bg-slate-800/80 p-4 text-center" key={day.date}>
            <h3 className="font-semibold">{day.weekday}</h3>
            <img className="mx-auto size-20" src={weatherIcon(day.icon)} alt={day.description} loading="lazy" />
            <p className="text-sm text-slate-300 capitalize">{day.description}</p>
            <p className="mt-3 text-xl font-semibold">
              {temperature(day.high, unit)} / <span className="text-slate-400">{temperature(day.low, unit)}</span>
            </p>
            <p className="mt-3 text-sm text-aqua">{day.rain}% rain*</p>
          </article>
        ))}
      </div>
    </section>
  );
}