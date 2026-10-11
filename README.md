# Weather Forecasting App
A weather forecasting website built with React, TypeScript, Vite, and Tailwind CSS. The application uses the OpenWeatherMap API to retrieve and display current weather conditions and a five-day forecast for cities around the world.

## Features
- Search by city name.
- Displays current temperature, humidity, wind speed, and weather conditions.
- View a five day weather forecast.
- Switch between Celsius and Fahrenheit.

## Technologies
- **React** — Frontend user interface.
- **TypeScript** — Type-safe JavaScript development.
- **Vite** — Development server and build tool.
- **Tailwind CSS** — Responsive styling.
- **React Router** — Page routing.
- **OpenWeatherMap API** — Weather data and forecast information.

## Setup

### 1. Install dependencies
Make sure [Node.js](https://nodejs.org/) is installed then open the project folder in VS Code and run:

```bash
npm install
```

### 2. Configure the API key
Create a `.env` file in the root directory, next to `package.json`.

```env
VITE_OPENWEATHER_API_KEY=YOUR_API_KEY_HERE
```

Replace `YOUR_API_KEY_HERE` with your OpenWeatherMap API key. You can obtain a free API key from [OpenWeatherMap](https://home.openweathermap.org/api_keys).

**Note:** Vite exposes `VITE_` environment variables to the browser. 

### 3. Run the application
Start the development server:

```bash
npm run dev
```


## Weather Data
Weather information is retrieved from the [OpenWeatherMap API](https://openweathermap.org/api) using two endpoints:

- **Current Weather API** — Current temperature, humidity, wind speed, and conditions.
- **5 Day / 3 Hour Forecast API** — Weather predictions used to generate the five-day forecast.

Weather icons are also provided by OpenWeatherMap.