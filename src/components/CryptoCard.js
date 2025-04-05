import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

export default function CryptoCard({ data }) {
  if (data.loading) return <div className="p-6 text-center text-gray-500">Loading crypto...</div>;
  if (data.error) return <div className="p-6 text-center text-red-500">Error: {data.error}</div>;

  return (
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <h2 className="text-lg font-semibold mb-4 flex items-center">
        <span className="mr-2">💰</span> Cryptocurrency
      </h2>
      <div className="space-y-4">
        {data.data.map((crypto) => (
          <div
            key={crypto.id}
            className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors"
          >
            <div>
              <Link href={`/crypto/${crypto.id}`} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
                {crypto.name}
              </Link>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                ${crypto.current_price.toLocaleString()} (
                <span className={crypto.price_change_percentage_24h >= 0 ? 'text-green-500' : 'text-red-500'}>
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </span>)
              </p>
            </div>
            <FavoriteButton type="crypto" id={crypto.id} />
          </div>
        ))}
      </div>
    </div>
  );
}