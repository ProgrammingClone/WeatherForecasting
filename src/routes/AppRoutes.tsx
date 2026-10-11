import { Route, Routes } from 'react-router';
import WeatherPage from '../pages/WeatherPage';
import NotFoundPage from '../pages/NotFoundPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WeatherPage />} />
      <Route path="*" element={<NotFoundPage />} /> // All other paths will show the not found page and link us back to the main page
    </Routes>
  );
}
