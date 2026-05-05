import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const { registrationId, eventPrice } = location.state || {};
  const registrationData = JSON.parse(localStorage.getItem("registrationData") || "{}");

  if (!registrationData.name) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">Please complete registration first</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Go to Registration
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Remove non-digits for card fields
    if (name === "cardNumber") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      setPaymentData(prev => ({
        ...prev,
        [name]: cleaned
      }));
    } else if (name === "expiryDate") {
      let cleaned = value.replace(/\D/g, "").slice(0, 4);
      if (cleaned.length >= 2) {
        cleaned = cleaned.slice(0, 2) + "/" + cleaned.slice(2);
      }
      setPaymentData(prev => ({
        ...prev,
        [name]: cleaned
      }));
    } else if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 3);
      setPaymentData(prev => ({
        ...prev,
        [name]: cleaned
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Mock payment processing
      if (paymentData.cardNumber.length !== 16 || paymentData.cvv.length !== 3) {
        throw new Error("Invalid payment details");
      }

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create payment record
      const paymentResponse = await axios.post(
        "http://localhost:8080/api/payment/process",
        {
          registrationId,
          amount: eventPrice,
          paymentMethod: "card"
        }
      );

      // Store ticket info
      localStorage.setItem("ticketData", JSON.stringify({
        ...registrationData,
        ticketId: paymentResponse.data,
        paymentStatus: "completed",
        checkInStatus: "pending"
      }));

      // Redirect to ticket page
      navigate("/ticket", { state: { ticketId: paymentResponse.data } });
    } catch (err) {
      setError(err.message || "Payment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            <div>
              <p className="text-gray-600 text-sm">Attendee Name</p>
              <p className="text-lg font-semibold">{registrationData.name}</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="text-lg font-semibold">{registrationData.email}</p>
            </div>
            
            <div>
              <p className="text-gray-600 text-sm">College</p>
              <p className="text-lg font-semibold">{registrationData.college}</p>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center">
              <span className="text-gray-600">Event Fee</span>
              <span className="font-semibold">₹{eventPrice}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Convenience Fee</span>
              <span className="font-semibold">₹0</span>
            </div>

            <hr className="my-4" />

            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total Amount</span>
              <span className="text-purple-600">₹{eventPrice}</span>
            </div>
          </div>

          {/* Payment Status Badge */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              <span className="font-semibold">💡</span> After payment, you'll receive your digital pass with QR code via email.
            </p>
          </div>
        </div>

        {/* Payment Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Payment Details</h2>

          {error && (
            <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              ❌ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Number
              </label>
              <input
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <p className="text-xs text-gray-500 mt-1">Use test card: 4111111111111111</p>
            </div>

            {/* Expiry & CVV */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Expiry Date
                </label>
                <input
                  type="text"
                  name="expiryDate"
                  value={paymentData.expiryDate}
                  onChange={handleChange}
                  placeholder="MM/YY"
                  maxLength="5"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  name="cvv"
                  value={paymentData.cvv}
                  onChange={handleChange}
                  placeholder="123"
                  maxLength="3"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400"
            >
              {loading ? "Processing Payment..." : `Pay ₹${eventPrice}`}
            </button>
          </form>

          {/* Payment Methods */}
          <div className="mt-6 pt-6 border-t">
            <p className="text-sm text-gray-600 text-center mb-3">Secure Payment</p>
            <div className="flex justify-center gap-4">
              <span className="text-xs bg-gray-100 px-3 py-1 rounded">🔒 SSL Secure</span>
              <span className="text-xs bg-gray-100 px-3 py-1 rounded">✓ Verified</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
