import { useState, useEffect } from 'react';
import { HiSun, HiCloud } from 'react-icons/hi';
import { BsCloudDrizzle, BsCloudRain, BsCloudLightning, BsCloudSnow, BsCloudFog } from 'react-icons/bs';
import userService from '../services/userService';

const weatherIcons = {
  Sunny: { icon: HiSun, color: '#f59e0b' },
  Clear: { icon: HiSun, color: '#f59e0b' },
  Cloudy: { icon: HiCloud, color: '#94a3b8' },
  'Partly cloudy': { icon: HiCloud, color: '#94a3b8' },
  Overcast: { icon: HiCloud, color: '#64748b' },
  Mist: { icon: BsCloudFog, color: '#94a3b8' },
  Fog: { icon: BsCloudFog, color: '#94a3b8' },
  Drizzle: { icon: BsCloudDrizzle, color: '#6b7280' },
  Rain: { icon: BsCloudRain, color: '#3b82f6' },
  Thunderstorm: { icon: BsCloudLightning, color: '#6366f1' },
  Snow: { icon: BsCloudSnow, color: '#e2e8f0' },
};

const getWeatherInfo = (description, temperature) => {
  if (!description) {
    if (temperature >= 30) return { icon: HiSun, color: '#f59e0b' };
    if (temperature >= 20) return { icon: HiCloud, color: '#94a3b8' };
    if (temperature >= 10) return { icon: BsCloudDrizzle, color: '#6b7280' };
    return { icon: BsCloudFog, color: '#94a3b8' };
  }
  for (const [key, val] of Object.entries(weatherIcons)) {
    if (description.toLowerCase().includes(key.toLowerCase())) return val;
  }
  return { icon: HiSun, color: '#6c63ff' };
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    userService.getWeather()
      .then((data) => {
        if (data?.current) {
          setWeather(data);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true));
  }, []);

  if (error) return null;
  if (!weather) {
    return (
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] animate-pulse">
        <div className="h-4 w-24 bg-white/10 rounded" />
      </div>
    );
  }

  const { current } = weather;
  const desc = current.weatherDescriptions?.[0];
  const { icon: Icon, color } = getWeatherInfo(desc, current.temperature);

  return (
    <div className="flex items-center gap-4 px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-white">{current.temperature}°</span>
          <span className="text-sm text-gray-500">Feels like {current.feelslike}°</span>
        </div>
        {desc && <p className="text-xs text-gray-400 mt-0.5">{desc}</p>}
      </div>
    </div>
  );
};

export default WeatherWidget;
