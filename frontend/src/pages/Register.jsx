import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    eventId: "1"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const events = [
    { id: "1", name: "Tech Fest 2026 - Free", price: 0 },
    { id: "2", name: "Hackathon 2026", price: 500 },
    { id: "3", name: "Web Dev Workshop", price: 300 },
    { id: "4", name: "AI/ML Bootcamp", price: 1000 }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/attendee/register",
        formData
      );

      // Store registration data for next step
      localStorage.setItem("registrationData", JSON.stringify({
        ...formData,
        registrationId: response.data
      }));

      setSuccess(true);
      
      // Redirect to payment page after 2 seconds
      setTimeout(() => {
        navigate("/payment", { 
          state: { 
            registrationId: response.data,
            eventPrice: events.find(e => e.id === formData.eventId)?.price || 0
          } 
        });
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-900">Event Registration</h1>
        <p className="text-gray-600 mb-8">Fill in your details to register for the event</p>

        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            ✅ Registration successful! Redirecting to payment...
          </div>
        )}

        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            ❌ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* College Field */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              College/Institution *
            </label>
            <input
              type="text"
              name="college"
              value={formData.college}
              onChange={handleChange}
              placeholder="Delhi Institute of Technology"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Event Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Event *
            </label>
            <select
              name="eventId"
              value={formData.eventId}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} {event.price > 0 ? `- ₹${event.price}` : '(Free)'}
                </option>
              ))}
            </select>
          </div>

          {/* Price Display */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              Amount to Pay: <span className="text-xl font-bold text-blue-600">
                ₹{events.find(e => e.id === formData.eventId)?.price || 0}
              </span>
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
          >
            {loading ? "Processing..." : "Continue to Payment"}
          </button>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-purple-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">📝 Note:</span> After registration and payment, you'll receive a unique QR code via email. This will be your digital pass for entry.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
