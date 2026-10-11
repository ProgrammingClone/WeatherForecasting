import type { CurrentWeather, ForecastResponse } from '../types/weather';
import { buildDailyForecast } from '../utils/weather';

const API_URL = 'https://api.openweathermap.org/data/2.5';
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

async function request<T>(path: string, params: Record<string, string>, signal: AbortSignal) {
  const query = new URLSearchParams({ ...params, units: 'metric', appid: API_KEY }); // Always query in metric we can manually convert to F later without an extra API call.
  const response = await fetch(`${API_URL}/${path}?${query}`, { signal });

  if (!response.ok) {
    if (response.status === 404) throw new Error('City not found.');
    if (response.status === 401) throw new Error('Your API key is invalid or has not been activated yet.');
    if (response.status === 429) throw new Error('API request limit reached. Please try again later.');
    throw new Error('Unable to load the weather right now. Please try again.');
  }

  return response.json() as Promise<T>; // T is a generic type so we can reqeust weather and forecast
}

export async function fetchCityWeather(city: string, signal: AbortSignal) {
  if (!API_KEY || API_KEY === 'YOUR_OPENWEATHERMAP_KEY') {
    throw new Error('OpenWeatherMap API key not found inside your .env');
  }

  const current = await request<CurrentWeather>('weather', { q: city }, signal);
  const forecast = await request<ForecastResponse>('forecast', {
    lat: String(current.coord.lat), lon: String(current.coord.lon)
  }, signal);

  if (!current.weather?.length || !forecast.list?.length || forecast.list.some(item => !item.weather?.length)) {
    throw new Error('Incomplete weather data received. Please try another city.');
  }

  return { current, days: buildDailyForecast(forecast.list, forecast.city.timezone) };
}
