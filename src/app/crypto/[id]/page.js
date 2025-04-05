'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCrypto, fetchCryptoHistoryThunk } from '../../redux/cryptoSlice';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function CryptoDetail({ params }) {
  const dispatch = useDispatch();
  const { crypto } = useSelector((state) => state);
  const cryptoData = crypto.data.find((c) => c.id === params.id);
  const history = crypto.history;

  useEffect(() => {
    if (!cryptoData) dispatch(fetchCrypto([params.id]));
    dispatch(fetchCryptoHistoryThunk(params.id));
  }, [dispatch, params.id, cryptoData]);

  if (crypto.loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (!cryptoData) return <p className="text-center text-red-500">Crypto not found</p>;

  // Chart data
  const chartData = {
    labels: history.map((point) => new Date(point[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price (USD)',
        data: history.map((point) => point[1]),
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
      title: { display: true, text: `${cryptoData.name} - 7 Day Price History` },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Price (USD)' } },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 flex items-center">
        <span className="mr-2">💰</span> {cryptoData.name}
      </h1>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Current Metrics</h2>
        <div className="space-y-2">
          <p className="text-lg">Price: <span className="font-medium">${cryptoData.current_price.toLocaleString()}</span></p>
          <p className="text-lg">
            24h Change: <span className={cryptoData.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
              {cryptoData.price_change_percentage_24h.toFixed(2)}%
            </span>
          </p>
          <p className="text-lg">Market Cap: <span className="font-medium">${cryptoData.market_cap.toLocaleString()}</span></p>
          <p className="text-lg">24h Volume: <span className="font-medium">${cryptoData.total_volume.toLocaleString()}</span></p>
          <p className="text-lg">Circulating Supply: <span className="font-medium">{cryptoData.circulating_supply.toLocaleString()}</span></p>
        </div>
      </div>
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Historical Pricing Chart</h2>
        {history.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p className="text-gray-500">Loading historical data...</p>
        )}
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Historical Pricing Table (Last 7 Days)</h2>
        {history.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700 dark:text-gray-300">
              <thead className="text-xs uppercase bg-gray-100 dark:bg-gray-600">
                <tr>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Price (USD)</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(-7).map((point, index) => (
                  <tr key={index} className="border-b dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-500">
                    <td className="px-4 py-2">{new Date(point[0]).toLocaleDateString()}</td>
                    <td className="px-4 py-2">${point[1].toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">Loading historical data...</p>
        )}
      </div>
    </div>
  );
}