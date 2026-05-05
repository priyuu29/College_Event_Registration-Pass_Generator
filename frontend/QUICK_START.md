# Quick Start Guide - Frontend

Get the College Event Registration & Pass Generator frontend running in 5 minutes!

## ⚡ Quick Setup

### 1. Navigate to Frontend Directory
```bash
cd College_Event_Registration-Pass_Generator/frontend
```

### 2. Install Dependencies
```bash
npm install
```
(Or `npm install --legacy-peer-deps` if you encounter dependency conflicts)

### 3. Start Development Server
```bash
npm run dev
```

### 4. Open in Browser
Go to `http://localhost:5173` (or the URL shown in terminal)

---

## ✅ Verify Installation

You should see:
- ✅ Navigation bar with all menu items
- ✅ Home page with features and user flows
- ✅ All pages accessible from navigation

---

## 📋 Before Running Frontend

Make sure your **backend** is running:
```bash
# In a separate terminal, in backend directory
cd College_Event_Registration-Pass_Generator/backend
./mvnw spring-boot:run
```

The backend should be running on `http://localhost:8080`

---

## 🎯 Test Each Flow

### Test 1: Student Registration
1. Click "Register" in navigation
2. Fill in sample data:
   - Name: Test Student
   - Email: test@example.com
   - Phone: +919876543210
   - College: Test College
   - Event: Any option
3. Click "Continue to Payment"

### Test 2: Payment
1. Fill payment details:
   - Card: 4111111111111111 (test card)
   - Expiry: 12/25 (any future date)
   - CVV: 123
2. Click "Pay"

### Test 3: Get Ticket
1. You'll see your digital pass with QR code
2. Click "Download Ticket" or "Print Ticket"

### Test 4: Scanner
1. Click "Scanner" in navigation
2. Click "📱 Camera Scan" to activate camera
3. Generate a QR code from the ticket page
4. Scan it with the scanner

### Test 5: Admin Dashboard
1. Click "Admin" in navigation
2. View live statistics
3. Switch between tabs: Overview, Events, Scans, Analytics
4. Click "Refresh Now" to update data

---

## 🛠️ Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Run linter
npm run lint
```

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── App.jsx                 # Main app with routing
│   ├── App.css                 # Global styles
│   ├── main.jsx                # Entry point
│   ├── index.css               # Base styles
│   ├── pages/
│   │   ├── Home.jsx            # Home page
│   │   ├── Register.jsx        # Registration
│   │   ├── Payment.jsx         # Payment processing
│   │   ├── Ticket.jsx          # Digital pass
│   │   ├── Scan.jsx            # QR scanner
│   │   └── AdminDashboard.jsx  # Analytics dashboard
│   ├── components/
│   │   └── Navigation.jsx      # Top nav bar
│   └── assets/                 # Static assets
├── public/                      # Public files
├── package.json                 # Dependencies
├── vite.config.js              # Vite configuration
├── tailwind.config.js          # Tailwind CSS config
└── index.html                  # HTML entry point
```

---

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js` to customize the theme:
```javascript
module.exports = {
  theme: {
    colors: {
      purple: '#YOUR_COLOR',
      // ... other colors
    }
  }
}
```

### Change API Endpoint
Update `http://localhost:8080` in all files:
- src/pages/Register.jsx
- src/pages/Payment.jsx
- src/pages/Scan.jsx
- src/pages/AdminDashboard.jsx

---

## 🚀 Production Build

```bash
# Build optimized production bundle
npm run build

# Output will be in 'dist/' folder
# Deploy dist/ folder to your web server
```

---

## 🐛 Common Issues

### Issue: Dependencies won't install
**Solution**:
```bash
npm install --legacy-peer-deps
```

### Issue: Port 5173 already in use
**Solution**:
```bash
# Vite will automatically use next available port
# Or kill the process using that port
```

### Issue: Backend API not responding
**Solution**:
1. Check backend is running on port 8080
2. Check browser console (F12) for CORS errors
3. Verify API endpoints in code

### Issue: Camera not working on Scanner
**Solution**:
1. Check browser permissions
2. Use HTTPS in production (required for camera)
3. Use manual input as fallback

---

## 📚 Documentation

Full documentation available in:
- `FRONTEND_README.md` - Technical documentation
- `USER_GUIDE.md` - User guide for all roles

---

## 🎓 Learning Resources

This project demonstrates:
- React hooks and functional components
- React Router for navigation
- Tailwind CSS for styling
- Axios for API calls
- QR code generation and scanning
- Data visualization with Recharts
- Form handling and validation

---

## 💡 Tips

1. **Use React DevTools**: Install React DevTools browser extension
2. **Check Console**: Press F12 to see any errors
3. **Test on Mobile**: Use `npm run dev` and access via IP address
4. **Use Postman**: Test backend APIs separately

---

## 🎉 You're Ready!

Everything is set up. Start building and enjoy! 

For issues, check the full documentation or contact the development team.

**Happy Coding! 🚀**
