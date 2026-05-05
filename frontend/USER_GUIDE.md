# User Guide - College Event Registration & Pass Generator

## 🏠 Home Page

The home page provides an overview of the entire system with:
- Feature highlights
- User flow diagrams
- Quick access buttons to Register and Scanner

**Navigation**: Click on any section in the top navigation bar to access different parts of the app.

---

## 👤 For Students (Attendees)

### Step 1: Registration (Route: `/register`)

1. **Fill Your Details**:
   - **Full Name**: Your complete name
   - **Email Address**: Valid email (will receive your digital pass here)
   - **Phone Number**: Contact number with country code (e.g., +91)
   - **College/Institution**: Your college name
   - **Select Event**: Choose the event you want to attend

2. **Review Amount**: The amount to pay will be displayed in the summary box

3. **Submit**: Click "Continue to Payment"

**⚠️ Important**: All fields are required. Double-check your email address!

---

### Step 2: Payment (Route: `/payment`)

1. **Review Order Summary**:
   - Your details will be shown for verification
   - Event fee is displayed
   - Total amount to pay is calculated

2. **Enter Card Details**:
   - **Card Number**: 16-digit card number (test: 4111111111111111)
   - **Expiry Date**: MM/YY format
   - **CVV**: 3-digit security code

3. **Complete Payment**:
   - Click "Pay ₹[Amount]"
   - Wait for payment processing
   - You'll be redirected to your ticket page

**🔒 Security**: All payments are processed securely with SSL encryption.

---

### Step 3: Digital Ticket (Route: `/ticket`)

After successful payment, you'll receive your digital pass with:

1. **QR Code**: Your unique digital pass
   - Don't share this with anyone
   - Shows your ticket ID

2. **Your Information**:
   - Name, Email, Phone, College
   - Event details
   - Unique Ticket ID

3. **Actions Available**:
   - **📥 Download**: Save the ticket as an image
   - **🖨️ Print**: Print the ticket
   - **📋 Copy QR**: Copy QR code to clipboard

4. **Email Notification**:
   - Your QR code is also sent to your registered email
   - Check your inbox and spam folder

**📱 At the Venue**:
- Show this page or the printed ticket at the gate
- Volunteer will scan your QR code
- You'll get entry confirmation

**⚠️ Important Rules**:
- Each ticket is for single entry only
- Don't allow anyone else to use your ticket
- Duplicate scanning will be denied
- Keep your ticket safe and secure

---

## 👨‍💼 For Volunteers (Gatekeepers)

### Scanner Interface (Route: `/scan`)

#### Getting Started

1. **Choose Scanning Method**:
   - **📱 Camera Scan**: Faster, uses device camera
   - **⌨️ Manual Input**: Fallback when camera unavailable

---

#### Camera Scanning (Recommended)

1. **Activate Camera**:
   - Click "📱 Camera Scan" button
   - Allow browser camera access when prompted
   - Camera feed will appear in the scanner area

2. **Position QR Code**:
   - Ask attendee to show their QR code
   - Keep it within the scanning box
   - Ensure good lighting for better recognition

3. **Scanning**:
   - QR code will auto-scan automatically
   - No button click needed

4. **Response**:
   - ✅ **Success**: Green message "Check-in successful! Welcome to the event."
   - ⚠️ **Duplicate**: Yellow warning "This ticket has already been scanned"
   - ❌ **Invalid**: Red error "Invalid ticket"

---

#### Manual Entry (Fallback)

1. **Click "⌨️ Manual Input"** button
2. **Paste or Type** the ticket ID
3. **Click "Verify"** button
4. **Response**: Same as camera scanning

---

#### Scan History

On the right side, you'll see:
- List of recent scans
- Status of each scan (✓, !, ✗)
- Timestamp of each scan

**Counters at Top**:
- Green: Number of successful check-ins
- Yellow: Number of duplicate attempts
- Red: Number of invalid scans

---

#### Important Rules for Volunteers

1. **Duplicate Prevention**:
   - If same QR code appears twice, mark as duplicate
   - Don't allow re-entry with same ticket
   - Report repeated attempts to organizers

2. **Invalid Tickets**:
   - Reject invalid tickets
   - Ask for alternative ID if needed
   - Note down the incident

3. **Verification**:
   - Check attendee's name if uncertain
   - Ensure person matches the ticket
   - Be professional and courteous

4. **Technical Issues**:
   - Switch to manual input if camera fails
   - Take note of failed tickets
   - Contact support if persistent issues

---

## 👨‍💻 For Organizers (Admins)

### Admin Dashboard (Route: `/admin`)

#### Dashboard Overview

The dashboard provides real-time insights into event performance.

---

#### KPI Cards (Top Section)

1. **Total Registrations** 👥
   - Total number of attendees registered
   - Used to plan capacity

2. **Checked In** ✅
   - Number of attendees who have entered
   - Helps track actual footfall

3. **Total Revenue** 💰
   - Money earned from ticket sales
   - Useful for finance tracking

4. **Pending Check-In** ⏳
   - Registrations not yet checked in
   - Shows potential traffic

5. **Duplicate Attempts** ⚠️
   - Number of times same ticket scanned
   - Indicates fraud prevention success

6. **Invalid Scans** ❌
   - Number of failed scan attempts
   - Helps identify issues

---

#### Tabs

#### 1. Overview Tab
- KPI cards showing key metrics
- Check-in status pie chart
- Hourly scans bar chart
- Quick snapshot of event status

#### 2. Events Tab
Shows a detailed table for each event:
- **Event Name**: Name of the event
- **Total Registrations**: Number of signups
- **Checked In**: Attendees who entered
- **Pending**: Still to arrive
- **Revenue**: Money from this event
- **Conversion %**: Visual progress bar

**Use Case**: Compare performance across multiple events

#### 3. Scans Tab
Lists all recent scans with:
- **Ticket ID**: Unique pass identifier
- **Attendee Name**: Person who scanned
- **Timestamp**: When they entered
- **Status**: Success, Duplicate, or Invalid

**Use Case**: Track entry patterns and troubleshoot issues

#### 4. Analytics Tab
Advanced insights:
- **Hourly Check-in Trend**: Line graph showing traffic over time
- **Success Rate**: Percentage of valid check-ins
- **Fraud Prevention**: Percentage of duplicate attempts blocked
- **System Health**: API response time, uptime, database status

**Use Case**: Monitor system performance and plan improvements

---

#### Control Panel

**Auto-Refresh Toggle**:
- Turn ON: Dashboard updates every 10 seconds automatically
- Turn OFF: Manual refresh only
- Useful when you need focused viewing without distractions

**Refresh Now Button**:
- Force immediate data refresh
- Useful after making changes

**Export CSV**:
- Download participant data
- Includes all event details
- Can be used for certifications and reports

---

#### Data Export

When you click "📥 Export CSV", you get:
- Event name
- Total registrations
- Check-in count
- Pending count
- Revenue per event

**Format**: CSV (Excel-compatible)
**Use Cases**: 
- Generate reports for leadership
- Create certificates
- Analyze event performance
- Import into other systems

---

#### Real-Time Monitoring

**Best Practices**:
1. **During Event**:
   - Keep dashboard open on a monitor
   - Set auto-refresh to ON
   - Monitor crowd flow patterns

2. **After Event**:
   - Export final data
   - Generate reports
   - Analyze attendance metrics

3. **Fraud Detection**:
   - Monitor duplicate attempts
   - Check invalid scans
   - Adjust security if needed

---

#### Understanding the Charts

1. **Pie Chart (Check-in Status)**:
   - Blue = Successfully checked in
   - Orange = Yet to check in
   - Shows conversion progress

2. **Bar Chart (Scans by Hour)**:
   - Height = Number of scans in that hour
   - Identifies peak entry times
   - Helps plan volunteer shifts

3. **Line Chart (Hourly Trend)**:
   - Shows traffic flow over time
   - Identifies bottlenecks
   - Helps optimize gate management

---

## 🔒 Security & Safety

### For All Users

1. **QR Code Security**:
   - Each code is unique and encrypted
   - Cannot be forged or duplicated
   - Single-use only

2. **Data Privacy**:
   - Personal data stored securely
   - Not shared with third parties
   - Used only for event management

3. **Fraud Prevention**:
   - Duplicate scanning blocked
   - Invalid tickets rejected
   - Real-time fraud detection

---

## ❓ Troubleshooting

### Students

**Problem**: Didn't receive email with QR code
- **Solution**: Check spam folder. Click email icon on ticket page to resend.

**Problem**: Can't scan QR code at gate
- **Solution**: Show printed ticket or on phone. Use manual entry as backup.

**Problem**: Ticket showing as already scanned
- **Solution**: Report to organizers. You may be a victim of fraud.

---

### Volunteers

**Problem**: Camera not working
- **Solution**: Switch to manual input. Check browser permissions.

**Problem**: QR code won't scan
- **Solution**: Try manual input. Ensure good lighting. Clear camera lens.

**Problem**: "Invalid ticket" message
- **Solution**: Check if attendee has correct ticket. Report to organizers.

---

### Organizers

**Problem**: Dashboard shows old data
- **Solution**: Click "Refresh Now" or wait for auto-refresh.

**Problem**: Spike in duplicate attempts
- **Solution**: Investigate volunteers' training. Tighten gate procedures.

**Problem**: Unexpected invalid scans
- **Solution**: Check if QR codes are damaged. Train volunteers better.

---

## 📞 Support

For technical issues:
1. Check browser console for errors (F12 key)
2. Try refreshing the page
3. Clear browser cache if persistent
4. Contact technical support team

---

## 🎓 Tips for Success

### For Students
✓ Register early to avoid last-minute issues
✓ Use a valid email address
✓ Keep your QR code private
✓ Arrive at least 15 minutes early

### For Volunteers
✓ Ensure good lighting at scanning station
✓ Be polite but firm about duplicate prevention
✓ Note any suspicious activities
✓ Keep scanner area clean and organized

### For Organizers
✓ Start with a dry run before the actual event
✓ Train volunteers well
✓ Monitor dashboard throughout the event
✓ Keep backup systems ready

---

**Thank you for using EventPass! Happy events! 🎉**
