import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function WeatherCard({ data }) {
  if (data.loading) return <div className="p-6 text-center text-gray-500">Loading weather...</div>;
  if (data.error) return <div className="p-6 text-center text-red-500">Error: {data.error}</div>;

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span className="mr-2">🌤️</span> Weather
      </h2>
      <div className="space-y-4">
        {data.data.map((city) => (
          <div
            key={city.name}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
          >
            <div>
              <Link href={`/city/${city.name.toLowerCase()}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                {city.name}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {city.main.temp}°C, {city.weather[0].description}
              </p>
            </div>
            <FavoriteButton type="city" id={city.name} />
          </div>
        ))}
      </div>
    </div>
  );
}