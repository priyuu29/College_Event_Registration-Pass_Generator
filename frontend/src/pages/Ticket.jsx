import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode.react";

function Ticket() {
  const navigate = useNavigate();
  const [ticketData, setTicketData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get ticket data from localStorage or simulate fetching from backend
    const savedTicket = localStorage.getItem("ticketData");
    
    if (savedTicket) {
      setTicketData(JSON.parse(savedTicket));
      setLoading(false);
    } else {
      // Simulate API call to fetch ticket
      setTimeout(() => {
        // If no saved data, redirect to register
        navigate("/register");
      }, 1000);
    }
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (!ticketData) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <p className="text-red-600 font-semibold mb-4">No ticket found</p>
          <button
            onClick={() => navigate("/register")}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Register Now
          </button>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const qrCodeElement = document.getElementById("qr-code");
    const canvas = qrCodeElement.querySelector("canvas");
    const url = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = url;
    link.download = `ticket-${ticketData.ticketId}.png`;
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      {/* Status Banner */}
      <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg">
        ✅ <span className="font-semibold">Ticket Generated Successfully!</span> Your QR code has been sent to your email.
      </div>

      {/* Ticket Card */}
      <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-8">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-bold">🎫 EVENT PASS</h1>
              <p className="text-purple-100 mt-1">Digital Pass - Valid for Single Entry</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-purple-100">Ticket ID</p>
              <p className="font-mono text-lg font-bold">{ticketData.ticketId}</p>
            </div>
          </div>

          {/* Attendee Details */}
          <div className="grid grid-cols-2 gap-6 mb-8 pb-8 border-b border-purple-400">
            <div>
              <p className="text-purple-100 text-xs uppercase tracking-wide">Attendee Name</p>
              <p className="text-xl font-bold">{ticketData.name}</p>
            </div>
            <div>
              <p className="text-purple-100 text-xs uppercase tracking-wide">Email</p>
              <p className="text-lg font-semibold break-all">{ticketData.email}</p>
            </div>
            <div>
              <p className="text-purple-100 text-xs uppercase tracking-wide">Phone</p>
              <p className="text-lg font-semibold">{ticketData.phone}</p>
            </div>
            <div>
              <p className="text-purple-100 text-xs uppercase tracking-wide">College</p>
              <p className="text-lg font-semibold">{ticketData.college}</p>
            </div>
          </div>

          {/* QR Code Section */}
          <div className="text-center mb-8">
            <p className="text-purple-100 text-xs uppercase tracking-wide mb-4">Scan this code at venue</p>
            <div className="flex justify-center bg-white p-6 rounded-xl" id="qr-code">
              <QRCode 
                value={ticketData.ticketId} 
                size={250}
                level="H"
                includeMargin={true}
                fgColor="#1e1b4b"
                bgColor="#ffffff"
              />
            </div>
            <p className="text-purple-100 text-xs mt-4">Do not share this code with anyone</p>
          </div>

          {/* Status */}
          <div className="flex justify-between items-center mb-8 pb-8 border-b border-purple-400">
            <div>
              <p className="text-purple-100 text-xs uppercase tracking-wide">Status</p>
              <p className="text-lg font-bold text-green-300">
                ✓ {ticketData.checkInStatus === "completed" ? "CHECKED IN" : "READY FOR CHECK-IN"}
              </p>
            </div>
            {ticketData.checkInStatus === "completed" && (
              <div className="text-right">
                <p className="text-purple-100 text-xs uppercase tracking-wide">Checked In At</p>
                <p className="text-lg font-bold">{new Date().toLocaleTimeString()}</p>
              </div>
            )}
          </div>

          {/* Important Notice */}
          <div className="bg-purple-600 bg-opacity-50 p-4 rounded-lg border border-purple-400">
            <p className="text-sm">
              <span className="font-bold">⚠️ Important:</span> Show this pass at the venue gate. Each QR code is valid for single entry only. Duplicate entries will be denied.
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-8 print:hidden">
        <button
          onClick={handleDownload}
          className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        >
          📥 Download Ticket
        </button>
        <button
          onClick={handlePrint}
          className="flex-1 bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
        >
          🖨️ Print Ticket
        </button>
        <button
          onClick={() => {
            // Copy QR code to clipboard
            const canvas = document.querySelector("#qr-code canvas");
            canvas.toBlob(blob => {
              navigator.clipboard.write([
                new ClipboardItem({ "image/png": blob })
              ]);
              alert("QR Code copied to clipboard!");
            });
          }}
          className="flex-1 bg-purple-600 text-white font-bold py-3 rounded-lg hover:bg-purple-700 transition flex items-center justify-center gap-2"
        >
          📋 Copy QR
        </button>
      </div>

      {/* Info Section */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-6 rounded-xl">
          <h3 className="font-bold text-blue-900 mb-3">📱 Mobile Entry</h3>
          <p className="text-sm text-blue-700">
            You can show this pass directly on your phone by visiting this page. No need to print or download.
          </p>
        </div>
        
        <div className="bg-yellow-50 p-6 rounded-xl">
          <h3 className="font-bold text-yellow-900 mb-3">⏰ Venue Timing</h3>
          <p className="text-sm text-yellow-700">
            Gate opens at 9:00 AM. Please arrive 15 minutes early for smooth check-in.
          </p>
        </div>

        <div className="bg-green-50 p-6 rounded-xl">
          <h3 className="font-bold text-green-900 mb-3">✅ Check-In Status</h3>
          <p className="text-sm text-green-700">
            {ticketData.checkInStatus === "completed" 
              ? "You've already checked in. Enjoy the event!" 
              : "You haven't checked in yet. Present this code at the gate."}
          </p>
        </div>

        <div className="bg-red-50 p-6 rounded-xl">
          <h3 className="font-bold text-red-900 mb-3">⚠️ Security</h3>
          <p className="text-sm text-red-700">
            This ticket is unique to you. Sharing it is prohibited. Unauthorized use will result in disqualification.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Ticket;
