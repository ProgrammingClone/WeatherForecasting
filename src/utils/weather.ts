import type { DailyForecast, ForecastItem, TemperatureUnit } from '../types/weather';

export const weatherIcon = (icon: string) => `https://openweathermap.org/img/wn/${icon}@2x.png`;

export const temperature = (celsius: number, unit: TemperatureUnit) => `${Math.round(unit === 'C' ? celsius : celsius * 9 / 5 + 32)}°`;

export const windSpeed = (metersPerSecond: number, unit: TemperatureUnit) =>
  unit === 'C' ? `${metersPerSecond.toFixed(1)} m/s` : `${(metersPerSecond * 2.23694).toFixed(1)} mph`;

export function localDate(timestamp: number, timezone: number, options: Intl.DateTimeFormatOptions) {
  return new Date((timestamp + timezone) * 1000).toLocaleDateString('en-US', { ...options, timeZone: 'UTC' });
}

export function buildDailyForecast(items: ForecastItem[], timezone: number): DailyForecast[] {
  const today = new Date(Date.now() + timezone * 1000).toISOString().slice(0, 10);
  const groups = new Map<string, ForecastItem[]>();

  for (const item of items) {
    const date = new Date((item.dt + timezone) * 1000).toISOString().slice(0, 10);
    if (date <= today) continue;
    groups.set(date, [...(groups.get(date) ?? []), item]);
  }

  return [...groups.entries()].slice(0, 5).map(([date, entries]) => {
    const midday = entries.reduce((best, item) => {
      const hourDifference = (entry: ForecastItem) => Math.abs(new Date((entry.dt + timezone) * 1000).getUTCHours() - 12);
      return hourDifference(item) < hourDifference(best) ? item : best;
    });

    return {
      date,
      weekday: localDate(entries[0].dt, timezone, { weekday: 'short' }),
      icon: midday.weather[0].icon,
      description: midday.weather[0].description,
      low: Math.min(...entries.map(entry => entry.main.temp_min)),
      high: Math.max(...entries.map(entry => entry.main.temp_max)),
      rain: Math.round(Math.max(...entries.map(entry => entry.pop ?? 0)) * 100)
    };
  });
}
