import { Link } from 'react-router-dom';

function Navigation() {
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-purple-600">
            🎫 EventPass
          </Link>
          <div className="flex gap-6">
            <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium">Home</Link>
            <Link to="/register" className="text-gray-700 hover:text-purple-600 font-medium">Register</Link>
            <Link to="/ticket" className="text-gray-700 hover:text-purple-600 font-medium">My Ticket</Link>
            <Link to="/scan" className="text-gray-700 hover:text-purple-600 font-medium">Scanner</Link>
            <Link to="/admin" className="text-gray-700 hover:text-purple-600 font-medium">Admin</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
