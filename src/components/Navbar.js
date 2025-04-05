import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight hover:text-blue-200 transition-colors">
          CryptoWeather Nexus
        </Link>
        <div className="space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-blue-200 transition-colors">
            Dashboard
          </Link>
          <span className="text-sm font-medium">Favorites ⭐</span> {/* Placeholder for future feature */}
        </div>
      </div>
    </nav>
  );
}