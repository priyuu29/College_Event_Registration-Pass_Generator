import { useState, useEffect } from "react";
import axios from "axios";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRegistrations: 0,
    checkedIn: 0,
    pendingCheckIn: 0,
    totalRevenue: 0,
    duplicateAttempts: 0,
    invalidScans: 0,
    eventData: [],
    recentScans: [],
    hourlyData: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchDashboardData();
    
    // Auto-refresh every 10 seconds
    let interval;
    if (autoRefresh) {
      interval = setInterval(fetchDashboardData, 10000);
    }
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchDashboardData = async () => {
    try {
      // In a real app, this would fetch from the backend
      // For now, we'll simulate with mock data
      const mockData = {
        totalRegistrations: Math.floor(Math.random() * 500) + 100,
        checkedIn: Math.floor(Math.random() * 300) + 50,
        pendingCheckIn: Math.floor(Math.random() * 200) + 30,
        totalRevenue: Math.floor(Math.random() * 50000) + 10000,
        duplicateAttempts: Math.floor(Math.random() * 20) + 2,
        invalidScans: Math.floor(Math.random() * 15) + 1,
        eventData: [
          { name: "Tech Fest", registrations: 150, checkedIn: 120, revenue: 0 },
          { name: "Hackathon", registrations: 80, checkedIn: 65, revenue: 40000 },
          { name: "Web Dev Workshop", registrations: 45, checkedIn: 38, revenue: 13500 },
          { name: "AI/ML Bootcamp", registrations: 35, checkedIn: 30, revenue: 35000 }
        ],
        recentScans: [
          { ticketId: "TKT001", name: "John Doe", timestamp: new Date().toLocaleTimeString(), status: "success" },
          { ticketId: "TKT002", name: "Jane Smith", timestamp: new Date(Date.now() - 60000).toLocaleTimeString(), status: "success" },
          { ticketId: "TKT003", name: "Alex Johnson", timestamp: new Date(Date.now() - 120000).toLocaleTimeString(), status: "duplicate" },
          { ticketId: "TKT004", name: "Sarah Williams", timestamp: new Date(Date.now() - 180000).toLocaleTimeString(), status: "success" },
          { ticketId: "TKT005", name: "Mike Brown", timestamp: new Date(Date.now() - 240000).toLocaleTimeString(), status: "invalid" }
        ],
        hourlyData: [
          { time: "9:00", scans: 45 },
          { time: "10:00", scans: 58 },
          { time: "11:00", scans: 52 },
          { time: "12:00", scans: 65 },
          { time: "1:00", scans: 48 },
          { time: "2:00", scans: 72 },
          { time: "3:00", scans: 81 },
          { time: "4:00", scans: 63 }
        ]
      };

      setStats(mockData);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setLoading(false);
    }
  };

  const handleExportData = () => {
    const csvContent = [
      ["Event", "Total Registrations", "Checked In", "Pending", "Revenue"],
      ...stats.eventData.map(e => [
        e.name,
        e.registrations,
        e.checkedIn,
        e.registrations - e.checkedIn,
        `₹${e.revenue}`
      ])
    ]
    .map(row => row.join(","))
    .join("\n");

    const element = document.createElement("a");
    element.setAttribute("href", "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent));
    element.setAttribute("download", "event-analytics.csv");
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  const checkinPercentage = stats.totalRegistrations > 0 
    ? Math.round((stats.checkedIn / stats.totalRegistrations) * 100) 
    : 0;

  const pieData = [
    { name: "Checked In", value: stats.checkedIn },
    { name: "Pending", value: stats.pendingCheckIn }
  ];

  const COLORS = ["#3b82f6", "#fbbf24"];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Real-time event analytics and metrics</p>
      </div>

      {/* Control Panel */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center gap-4 flex-wrap">
          <div className="flex gap-4">
            {["overview", "events", "scans", "analytics"].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  activeTab === tab
                    ? "bg-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                autoRefresh
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {autoRefresh ? "🔄 Auto-Refresh ON" : "⏸️ Auto-Refresh OFF"}
            </button>
            <button
              onClick={fetchDashboardData}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              ⟲ Refresh Now
            </button>
            <button
              onClick={handleExportData}
              className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              📥 Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div>
          {/* KPI Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 text-sm font-semibold uppercase">Total Registrations</p>
                  <p className="text-4xl font-bold mt-2">{stats.totalRegistrations}</p>
                </div>
                <span className="text-5xl opacity-20">👥</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 text-sm font-semibold uppercase">Checked In</p>
                  <p className="text-4xl font-bold mt-2">{stats.checkedIn}</p>
                  <p className="text-green-100 text-sm mt-2">{checkinPercentage}% conversion</p>
                </div>
                <span className="text-5xl opacity-20">✅</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-purple-100 text-sm font-semibold uppercase">Total Revenue</p>
                  <p className="text-3xl font-bold mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
                </div>
                <span className="text-5xl opacity-20">💰</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-yellow-100 text-sm font-semibold uppercase">Pending Check-In</p>
                  <p className="text-4xl font-bold mt-2">{stats.pendingCheckIn}</p>
                </div>
                <span className="text-5xl opacity-20">⏳</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-red-100 text-sm font-semibold uppercase">Duplicate Attempts</p>
                  <p className="text-4xl font-bold mt-2">{stats.duplicateAttempts}</p>
                </div>
                <span className="text-5xl opacity-20">⚠️</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-8">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-orange-100 text-sm font-semibold uppercase">Invalid Scans</p>
                  <p className="text-4xl font-bold mt-2">{stats.invalidScans}</p>
                </div>
                <span className="text-5xl opacity-20">❌</span>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Check-in Status Pie Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Check-in Status</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {COLORS.map((color, index) => (
                      <Cell key={`cell-${index}`} fill={color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Hourly Scans Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold mb-4">Scans by Hour</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scans" fill="#8b5cf6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Events Performance</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Event</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Registrations</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Checked In</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pending</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Revenue</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Conversion %</th>
                </tr>
              </thead>
              <tbody>
                {stats.eventData.map((event, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-semibold text-gray-900">{event.name}</td>
                    <td className="px-6 py-4 text-gray-700">{event.registrations}</td>
                    <td className="px-6 py-4">
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        {event.checkedIn}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{event.registrations - event.checkedIn}</td>
                    <td className="px-6 py-4 font-semibold text-purple-600">₹{event.revenue.toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(event.checkedIn / event.registrations) * 100}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round((event.checkedIn / event.registrations) * 100)}%
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Recent Scans Tab */}
      {activeTab === "scans" && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Recent Scans</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ticket ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Attendee Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Timestamp</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentScans.map((scan, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-mono text-sm text-gray-900">{scan.ticketId}</td>
                    <td className="px-6 py-4 text-gray-900">{scan.name}</td>
                    <td className="px-6 py-4 text-gray-700">{scan.timestamp}</td>
                    <td className="px-6 py-4">
                      {scan.status === "success" ? (
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                          ✅ Success
                        </span>
                      ) : scan.status === "duplicate" ? (
                        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                          ⚠️ Duplicate
                        </span>
                      ) : (
                        <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                          ❌ Invalid
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Hourly Trend */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2">
            <h3 className="text-lg font-bold mb-4">Hourly Check-in Trend</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={stats.hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="scans" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Stats Breakdown */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Security Metrics</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Success Rate</span>
                  <span className="text-sm font-bold text-green-600">{checkinPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-green-500 h-3 rounded-full"
                    style={{ width: `${checkinPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-700">Fraud Prevention</span>
                  <span className="text-sm font-bold text-red-600">
                    {((stats.duplicateAttempts / (stats.checkedIn + stats.duplicateAttempts)) * 100).toFixed(1)}% blocked
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-red-500 h-3 rounded-full"
                    style={{
                      width: `${(stats.duplicateAttempts / (stats.checkedIn + stats.duplicateAttempts)) * 100}%`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">System Health</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">API Response Time</span>
                <span className="text-sm font-bold text-green-600">45ms</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Scanner Uptime</span>
                <span className="text-sm font-bold text-green-600">99.9%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Database Status</span>
                <span className="text-sm font-bold text-green-600">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">Last Update</span>
                <span className="text-sm text-gray-600">Just now</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
