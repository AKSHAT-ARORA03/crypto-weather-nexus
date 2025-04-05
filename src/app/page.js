'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../redux/weatherSlice';
import { fetchCrypto } from '../redux/cryptoSlice';
import { fetchNews } from '../redux/newsSlice';
import WeatherCard from '../components/WeatherCard';
import CryptoCard from '../components/CryptoCard';
import NewsCard from '../components/NewsCard';
import { initWebSocket } from '../utils/websocket';

export default function Home() {
  const dispatch = useDispatch();
  const { weather, crypto, news } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchWeather(['New York', 'London', 'Tokyo']));
    dispatch(fetchCrypto(['bitcoin', 'ethereum', 'binancecoin']));
    dispatch(fetchNews());
    const ws = initWebSocket(dispatch);
    const interval = setInterval(() => {
      dispatch(fetchWeather(['New York', 'London', 'Tokyo']));
      dispatch(fetchCrypto(['bitcoin', 'ethereum', 'binancecoin']));
    }, 60000);
    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <WeatherCard data={weather} />
      <CryptoCard data={crypto} />
      <NewsCard data={news} />
    </div>
  );
}