import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scan() {
  const [scanResult, setScanResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error, warning
  const [scannedTickets, setScannedTickets] = useState([]);
  const [useManualInput, setUseManualInput] = useState(false);
  const [manualInput, setManualInput] = useState("");
  const [cameraActive, setCameraActive] = useState(false);
  const scannerRef = useRef(null);
  const scannerInstanceRef = useRef(null);

  // Initialize camera scanner
  useEffect(() => {
    if (useManualInput) {
      stopCamera();
      return;
    }

    if (cameraActive && !scannerInstanceRef.current) {
      startCamera();
    }

    return () => {
      if (scannerInstanceRef.current) {
        scannerInstanceRef.current.clear().catch(err => console.log(err));
        scannerInstanceRef.current = null;
      }
    };
  }, [cameraActive, useManualInput]);

  const startCamera = () => {
    if (scannerRef.current && !scannerInstanceRef.current) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          handleQRScan(decodedText);
        },
        (error) => {
          // Ignore errors
        }
      );

      scannerInstanceRef.current = scanner;
    }
  };

  const stopCamera = () => {
    if (scannerInstanceRef.current) {
      scannerInstanceRef.current.clear().catch(err => console.log(err));
      scannerInstanceRef.current = null;
    }
  };

  const handleQRScan = async (ticketId) => {
    setScanResult(ticketId);
    await processTicket(ticketId);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (manualInput.trim()) {
      handleQRScan(manualInput.trim());
      setManualInput("");
    }
  };

  const processTicket = async (ticketId) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `http://localhost:8080/api/attendee/scan?token=${ticketId}`,
        {}
      );

      // Check if ticket was already scanned
      if (response.status === 200) {
        setMessageType("success");
        setMessage("✅ Check-in successful! Welcome to the event.");
        
        // Add to scanned tickets list
        setScannedTickets(prev => [{
          ticketId,
          timestamp: new Date().toLocaleTimeString(),
          status: "checked-in"
        }, ...prev]);
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setMessageType("warning");
        setMessage("⚠️ This ticket has already been scanned. Duplicate entry not allowed.");
        
        setScannedTickets(prev => [{
          ticketId,
          timestamp: new Date().toLocaleTimeString(),
          status: "duplicate"
        }, ...prev]);
      } else {
        setMessageType("error");
        setMessage("❌ " + (error.response?.data?.message || "Invalid ticket. Please try again."));
        
        setScannedTickets(prev => [{
          ticketId,
          timestamp: new Date().toLocaleTimeString(),
          status: "invalid"
        }, ...prev]);
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "checked-in": return "bg-green-100 border-green-300";
      case "duplicate": return "bg-yellow-100 border-yellow-300";
      case "invalid": return "bg-red-100 border-red-300";
      default: return "bg-gray-100 border-gray-300";
    }
  };

  const getStatusBg = (status) => {
    switch(status) {
      case "checked-in": return "bg-green-500";
      case "duplicate": return "bg-yellow-500";
      case "invalid": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Scanner Section */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold mb-2">Event Entry Scanner</h1>
            <p className="text-gray-600 mb-6">Scan attendee QR codes to check them in</p>

            {/* Mode Toggle */}
            <div className="mb-6 flex gap-4">
              <button
                onClick={() => {
                  setUseManualInput(false);
                  setCameraActive(!cameraActive);
                }}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                  !useManualInput && cameraActive
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                📱 Camera Scan
              </button>
              <button
                onClick={() => setUseManualInput(!useManualInput)}
                className={`flex-1 py-2 px-4 rounded-lg font-semibold transition ${
                  useManualInput
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                ⌨️ Manual Input
              </button>
            </div>

            {/* Message Display */}
            {message && (
              <div className={`mb-6 p-4 rounded-lg border-l-4 ${
                messageType === "success" ? "bg-green-50 border-green-400 text-green-700" :
                messageType === "warning" ? "bg-yellow-50 border-yellow-400 text-yellow-700" :
                "bg-red-50 border-red-400 text-red-700"
              }`}>
                {message}
              </div>
            )}

            {/* Camera Scanner */}
            {!useManualInput && (
              <div ref={scannerRef}>
                {cameraActive && (
                  <div id="reader" className="mb-6 bg-black rounded-lg overflow-hidden"></div>
                )}
                {!cameraActive && (
                  <div className="mb-6 bg-gray-100 rounded-lg p-12 text-center">
                    <p className="text-gray-600 mb-4">Click "Camera Scan" to activate camera</p>
                    <p className="text-4xl">📷</p>
                  </div>
                )}
              </div>
            )}

            {/* Manual Input */}
            {useManualInput && (
              <form onSubmit={handleManualSubmit} className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Enter Ticket ID or Scan Code:
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="Paste ticket ID here"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      autoFocus
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 font-semibold disabled:bg-gray-400 transition"
                    >
                      {loading ? "Processing..." : "Verify"}
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {scannedTickets.filter(t => t.status === "checked-in").length}
                </p>
                <p className="text-sm text-gray-600">Checked In</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">
                  {scannedTickets.filter(t => t.status === "duplicate").length}
                </p>
                <p className="text-sm text-gray-600">Duplicates</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-red-600">
                  {scannedTickets.filter(t => t.status === "invalid").length}
                </p>
                <p className="text-sm text-gray-600">Invalid</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scanned Tickets List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-bold mb-4">Recent Scans</h2>
          
          {scannedTickets.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p className="text-3xl mb-2">📭</p>
              <p>No scans yet</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {scannedTickets.map((ticket, index) => (
                <div key={index} className={`p-3 rounded-lg border ${getStatusColor(ticket.status)}`}>
                  <div className="flex items-start gap-2">
                    <span className={`${getStatusBg(ticket.status)} text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0 mt-1`}>
                      {ticket.status === "checked-in" ? "✓" : ticket.status === "duplicate" ? "!" : "✗"}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-xs break-all text-gray-800">{ticket.ticketId}</p>
                      <p className="text-xs text-gray-600 mt-1">{ticket.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Clear History Button */}
          {scannedTickets.length > 0 && (
            <button
              onClick={() => setScannedTickets([])}
              className="w-full mt-4 py-2 text-sm text-gray-600 hover:text-gray-900 border-t transition"
            >
              Clear History
            </button>
          )}
        </div>
      </div>

      {/* Important Notes */}
      <div className="mt-8 bg-blue-50 border border-blue-300 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-3">📋 Important Instructions</h3>
        <ul className="text-sm text-blue-800 space-y-2">
          <li>✓ Each ticket can only be scanned once</li>
          <li>⚠️ Duplicate scans will be automatically flagged</li>
          <li>📱 Use camera for faster scanning or manual entry as fallback</li>
          <li>🔒 Do not allow re-entry with the same QR code</li>
        </ul>
      </div>
    </div>
  );
}

export default Scan;
