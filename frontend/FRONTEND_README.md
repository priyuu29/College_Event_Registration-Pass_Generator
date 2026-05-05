# College Event Registration & Pass Generator - Frontend

A modern, responsive React-based frontend for a paperless event management system with QR code-based digital passes.

## 🎯 Features

### 👤 Attendee (Student) Flow
- **User Registration**: Fill out form with Name, Email, Phone, College, and Event selection
- **Payment Gateway**: Mock payment integration with card validation
- **Digital Ticket**: Unique QR code generated and displayed after payment
- **Ticket Management**: Download, print, or copy QR code to clipboard
- **Mobile-Friendly**: Works seamlessly on all devices

### 👨‍💼 Volunteer (Gatekeeper) Flow
- **QR Scanner**: Real-time camera-based QR code scanning
- **Manual Entry**: Fallback option to manually enter ticket IDs
- **Instant Verification**: Immediate check-in with visual feedback
- **Duplicate Prevention**: Alerts when attempting to scan an already-scanned ticket
- **Scan History**: Recent scans list with status indicators

### 👨‍💻 Admin (Organizer) Dashboard
- **Real-Time Analytics**: Live statistics on registrations, check-ins, and revenue
- **Event Performance**: Detailed metrics for each event
- **Security Metrics**: Fraud detection and success rates
- **Data Export**: Download participant data as CSV
- **Auto-Refresh**: Real-time updates with manual refresh option

## 📦 Tech Stack

- **React 19.2.5**: Latest React version for modern UI
- **React Router v6**: Client-side routing for multi-page app
- **Tailwind CSS 3.4**: Utility-first CSS framework
- **Axios**: Promise-based HTTP client
- **QR Code Libraries**:
  - `qrcode.react`: For generating and displaying QR codes
  - `html5-qrcode`: For scanning QR codes with device camera
- **Recharts**: React charting library for analytics
- **Vite 8.0.10**: Lightning-fast build tool

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Install dependencies**:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ```

2. **Start development server**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

3. **Build for production**:
   ```bash
   npm run build
   ```

### Environment Setup

Make sure your backend API is running at `http://localhost:8080`. All API calls are configured to hit this endpoint.

## 📱 Pages & Routes

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | Home | Landing page with features and user flows |
| `/register` | Register | Attendee registration form |
| `/payment` | Payment | Payment processing page |
| `/ticket` | Ticket | Digital pass display with QR code |
| `/scan` | Scan | QR code scanner for volunteers |
| `/admin` | AdminDashboard | Analytics dashboard for organizers |

## 🎨 UI Components

### Navigation
- Top navigation bar with links to all main sections
- Responsive mobile-friendly design

### Forms
- **Registration Form**: Multi-field form with validation
- **Payment Form**: Secure payment details input
- **Manual Scanner Input**: Text input for manual ticket entry

### Cards & Displays
- KPI cards with statistics and icons
- Event performance table
- Scan history list
- Digital ticket card with security features

### Charts (using Recharts)
- Line chart: Hourly check-in trends
- Bar chart: Scans by hour
- Pie chart: Check-in status distribution

## 🔐 Security Features

1. **QR Code Encryption**: Unique encrypted tokens for each ticket
2. **Duplicate Prevention**: Backend validation prevents re-scanning
3. **One-Time Use**: Each QR code valid for single entry only
4. **Secure Display**: Password-protected admin dashboard (in production)
5. **Data Validation**: Client-side and server-side validation

## 📊 Data Flow

```
Registration Form → Payment → QR Code Generation 
                              ↓
                          Email with QR
                              ↓
                    Volunteer Scan at Venue
                              ↓
                    Check-in Verification
                              ↓
                    Admin Dashboard Analytics
```

## 🔄 State Management

- **React Hooks**: `useState`, `useEffect` for component state
- **Local Storage**: Stores registration and ticket data
- **Context**: Can be extended for global state management

## 📡 API Integration

The frontend communicates with the backend via REST APIs:

### Endpoints Used

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/api/attendee/register` | Register new attendee |
| POST | `/api/payment/process` | Process payment |
| POST | `/api/attendee/scan` | Scan and verify QR code |
| GET | `/api/admin/stats` | Get dashboard statistics |

## 🎯 Key Features Implemented

### ✅ User Experience
- Intuitive flow from registration to entry
- Responsive design for all screen sizes
- Clear visual feedback for all actions
- Error handling with user-friendly messages
- Loading states for async operations

### ✅ Performance
- Fast page loads with Vite
- Optimized images and assets
- Lazy loading of components
- Efficient state management

### ✅ Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance

## 📝 Test Credentials

For testing the payment flow:
- **Test Card Number**: `4111111111111111`
- **Expiry Date**: Any future date (MM/YY format)
- **CVV**: Any 3-digit number

## 🐛 Troubleshooting

### Build Issues
If you encounter dependency conflicts, use:
```bash
npm install --legacy-peer-deps
```

### Camera Access Issues
- Ensure HTTPS is used in production (required for camera access)
- Check browser permissions for camera access
- Try manual entry as fallback

### API Connection Issues
- Verify backend server is running on `http://localhost:8080`
- Check CORS configuration on backend
- Review browser console for detailed errors

## 📚 Component Structure

```
src/
├── App.jsx                 # Main app with routing
├── pages/
│   ├── Home.jsx           # Landing page
│   ├── Register.jsx       # Registration page
│   ├── Payment.jsx        # Payment page
│   ├── Ticket.jsx         # Ticket display page
│   ├── Scan.jsx           # QR scanner page
│   └── AdminDashboard.jsx # Admin analytics
├── components/
│   └── Navigation.jsx     # Top navigation bar
└── assets/                # Images and static files
```

## 🎓 Educational Value

This frontend demonstrates:
- Modern React patterns and hooks
- RESTful API integration
- Form handling and validation
- Real-time data updates
- QR code generation and scanning
- Data visualization with charts
- Responsive UI design
- Error handling best practices

## 📄 License

This project is part of a college hackathon and is provided as-is for educational purposes.

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

---

**Built with ❤️ for efficient event management**
