import type { CurrentWeather, TemperatureUnit } from '../types/weather';
import { localDate, temperature, weatherIcon, windSpeed } from '../utils/weather';

export default function CurrentWeatherCard({ weather, unit }: { weather: CurrentWeather; unit: TemperatureUnit }) {
  const condition = weather.weather[0];
  const date = localDate(weather.dt, weather.timezone, { weekday: 'long', month: 'long', day: 'numeric' });

  const metrics = [
    { label: 'Feels like', value: `${temperature(weather.main.feels_like, unit)}${unit}` },
    { label: 'Humidity', value: `${weather.main.humidity}%` },
    { label: 'Wind speed', value: windSpeed(weather.wind.speed, unit) }
  ];

  return (
    <section className="rounded-2xl bg-slate-800/80 p-6 sm:p-8">
      <p className="text-sm font-semibold text-aqua">CURRENT CONDITIONS</p>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-3xl font-bold">{weather.name}, {weather.sys.country}</h2>
        <p className="text-sm text-slate-300">{date}</p>
      </div>

      <div className="flex items-center justify-between gap-3 py-6">
        <div>
          <p className="text-6xl font-bold sm:text-7xl">
            {temperature(weather.main.temp, unit)}
            <span className="text-2xl">{unit}</span>
          </p>
          <p className="mt-2 capitalize text-slate-300">{condition.description}</p>
        </div>

        <img className="size-28 sm:size-36" src={weatherIcon(condition.icon)} alt={condition.description} />
      </div>

      <div className="grid gap-4 border-t border-white/20 pt-5 sm:grid-cols-3">
        {metrics.map(metric => (
          <div key={metric.label}>
            <p className="text-sm text-slate-400">{metric.label}</p>
            <p className="text-lg font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
}