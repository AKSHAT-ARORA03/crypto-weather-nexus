'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../../redux/weatherSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CityDetail({ params }) {
  const dispatch = useDispatch();
  const { weather } = useSelector((state) => state);
  const cityData = weather.data.find((w) => w.name.toLowerCase() === params.id.toLowerCase());

  useEffect(() => {
    if (!cityData) dispatch(fetchWeather([params.id]));
  }, [dispatch, params.id, cityData]);

  if (weather.loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!cityData) return <p className="text-center text-red-500">City not found</p>;

  // Mock historical weather data (since free API doesn't provide it)
  const mockHistory = [
    { date: '2025-04-02', temp: cityData.main.temp + 1 },
    { date: '2025-04-03', temp: cityData.main.temp - 1 },
    { date: '2025-04-04', temp: cityData.main.temp - 2 },
    { date: '2025-04-05', temp: cityData.main.temp }, // Current day
  ];

  // Chart data
  const chartData = {
    labels: mockHistory.map((entry) => entry.date),
    datasets: [
      {
        label: 'Temperature (°C)',
        data: mockHistory.map((entry) => entry.temp),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        fill: true,
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${cityData.name} - 4 Day Temperature History` },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Temperature (°C)' } },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">🌤️</span> {cityData.name} Weather
      </h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Conditions</h2>
        <div className="space-y-2">
          <p className="text-lg">Temperature: <span className="font-medium">{cityData.main.temp}°C</span></p>
          <p className="text-lg">Humidity: <span className="font-medium">{cityData.main.humidity}%</span></p>
          <p className="text-lg">Conditions: <span className="font-medium capitalize">{cityData.weather[0].description}</span></p>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Weather History</h2>
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
}