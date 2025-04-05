export default function NewsCard({ data }) {
    if (data.loading) return <div className="p-6 text-center text-gray-500">Loading news...</div>;
    if (data.error) return <div className="p-6 text-center text-red-500">Error: {data.error}</div>;
  
    return (
      <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
        <h2 className="text-lg font-semibold mb-4 flex items-center">
          <span className="mr-2">📰</span> Crypto News
        </h2>
        <div className="space-y-3">
          {data.data.slice(0, 5).map((article, index) => (
            <a
              key={index}
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-2 bg-gray-50 dark:bg-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-500 transition-colors text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              {article.title}
            </a>
          ))}
        </div>
      </div>
    );
  }