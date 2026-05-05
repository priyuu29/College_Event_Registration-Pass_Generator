import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          College Event Registration
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A modern, secure, and paperless event management system with QR-based digital passes
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/register" className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition">
            Register Now
          </Link>
          <Link to="/scan" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
            Scanner
          </Link>
        </div>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🎫</div>
          <h3 className="text-xl font-bold mb-2">Quick Registration</h3>
          <p className="text-gray-600">Sign up in seconds with your name, college, and event choice.</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">💳</div>
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-gray-600">Mock payment gateway for testing. Instant ticket generation.</p>
        </div>
        
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="text-xl font-bold mb-2">Digital Passes</h3>
          <p className="text-gray-600">Unique QR codes for each attendee. No paper, no hassle.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">✅</div>
          <h3 className="text-xl font-bold mb-2">Quick Entry</h3>
          <p className="text-gray-600">Volunteers scan QR codes. Instant verification at gates.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">🔒</div>
          <h3 className="text-xl font-bold mb-2">Anti-Fraud</h3>
          <p className="text-gray-600">Prevents duplicate entries. One pass, one entry only.</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <div className="text-4xl mb-4">📊</div>
          <h3 className="text-xl font-bold mb-2">Live Analytics</h3>
          <p className="text-gray-600">Real-time dashboard for organizers. Track registrations and check-ins.</p>
        </div>
      </div>

      {/* User Flows */}
      <div className="bg-white rounded-xl shadow-lg p-12 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Attendee Flow */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-purple-600">👤 For Students</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span>Fill registration form</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span>Complete payment</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span>Get QR code via email</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Show pass at venue</span>
              </li>
            </ol>
          </div>

          {/* Volunteer Flow */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-blue-600">👨‍💼 For Volunteers</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span>Access scanner page</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span>Scan attendee's QR</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span>Verify instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Allow or deny entry</span>
              </li>
            </ol>
          </div>

          {/* Admin Flow */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-green-600">👨‍💻 For Organizers</h3>
            <ol className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">1</span>
                <span>Create events</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">2</span>
                <span>Set prices & limits</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">3</span>
                <span>View live analytics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 text-sm">4</span>
                <span>Export participant lists</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
