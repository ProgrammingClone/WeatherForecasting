export type TemperatureUnit = 'C' | 'F';

export interface WeatherCondition {
  description: string;
  icon: string;
  main: string;
}

// Comes from https://openweathermap.org/api/current
export interface CurrentWeather {
  name: string;
  sys: { country: string };
  coord: { lat: number; lon: number };
  dt: number;
  timezone: number;
  main: { temp: number; feels_like: number; humidity: number };
  wind: { speed: number };
  weather: WeatherCondition[];
}


export interface ForecastItem {
  dt: number;
  main: { temp_min: number; temp_max: number };
  weather: WeatherCondition[];
  pop?: number;
}

// Comes from https://openweathermap.org/api/forecast5
export interface ForecastResponse {
  list: ForecastItem[];
  city: { timezone: number };
}

export interface DailyForecast {
  date: string;
  weekday: string;
  icon: string;
  description: string;
  low: number;
  high: number;
  rain: number;
}

export interface WeatherResult {
  current: CurrentWeather;
  days: DailyForecast[];
}