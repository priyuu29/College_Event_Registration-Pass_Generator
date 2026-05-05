# College Event Registration Pass Generator

A full-stack web application for managing college event registrations and generating QR code passes for attendees. This system simplifies event access management by automating pass generation and distribution.

## 🎯 Features

- **Event Registration Management**: Register attendees for college events
- **QR Code Generation**: Automatically generate unique QR codes for each registered participant
- **Email Distribution**: Send registration passes via email (with QR codes attached)
- **Secure Access**: Built-in security configuration and CORS support
- **Modern UI**: Responsive React frontend with Tailwind CSS styling
- **RESTful API**: Well-structured REST API for seamless frontend-backend integration

## 🛠️ Tech Stack

### Backend
- **Framework**: Spring Boot 4.0.6
- **Language**: Java 17
- **Build Tool**: Maven
- **Key Dependencies**:
  - Spring Web
  - Spring Security
  - ZXing (QR Code Generation)
  - Lombok (Boilerplate reduction)

### Frontend
- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Linting**: ESLint
- **Node.js**: Recommended v18+

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java 17** or later
- **Maven 3.6+** (for backend)
- **Node.js 18+** and npm (for frontend)
- **Git**

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/College_Event_Registration-Pass_Generator.git
cd College_Event_Registration-Pass_Generator
```

### 2. Backend Setup

Navigate to the backend directory and build the project:

```bash
cd backend
mvn clean install
```

Or if you prefer using the Maven wrapper:

```bash
./mvnw clean install
```

### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

### Start Backend Server

From the `backend` directory:

```bash
mvn spring-boot:run
```

Or use the Maven wrapper:

```bash
./mvnw spring-boot:run
```

The backend will start on `http://localhost:8080`

### Start Frontend Development Server

From the `frontend` directory:

```bash
npm run dev
```

The frontend will typically start on `http://localhost:5173`

### Production Build

Build the frontend for production:

```bash
npm run build
```

## 📁 Project Structure

```
College_Event_Registration-Pass_Generator/
├── backend/                           # Spring Boot REST API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/Project/
│   │   │   │   ├── ProjectApplication.java
│   │   │   │   ├── controller/       # REST endpoints
│   │   │   │   │   └── TestController.java
│   │   │   │   ├── service/          # Business logic
│   │   │   │   │   ├── QRService.java
│   │   │   │   │   └── EmailService.java
│   │   │   │   └── config/           # Configuration classes
│   │   │   │       ├── CorsConfig.java
│   │   │   │       └── SecurityConfig.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
│   │       └── java/com/example/Project/
│   └── pom.xml
├── frontend/                          # React + Vite frontend
│   ├── src/
│   │   ├── main.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── assets/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── eslint.config.js
└── README.md
```

## 🔌 API Endpoints

### Health Check

- **GET** `/api/test`
  - Returns: `"Backend Working"`
  - Used to verify the backend is running correctly

## ⚙️ Configuration

### Backend Configuration

Edit `backend/src/main/resources/application.properties`:

```properties
# Server Configuration
server.port=8080

# Database (currently disabled)
# spring.datasource.url=jdbc:postgresql://localhost:5432/event_db
# spring.jpa.hibernate.ddl-auto=update
```

### Frontend Configuration

The frontend uses Vite for bundling. Key configuration files:

- `vite.config.js` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS customization
- `.eslintrc.cjs` - ESLint rules

## 🔐 Security Features

- **Spring Security**: Built-in authentication and authorization
- **CORS Configuration**: Cross-Origin Resource Sharing properly configured
- **Secure Endpoints**: Protected API endpoints with Spring Security

## 📧 Email Service

The email service is currently implemented as a **mock service** for testing purposes. It simulates email sending with console output. To integrate with a real email provider (e.g., SMTP), modify `EmailService.java`.

## 🔄 QR Code Generation

The application uses the **ZXing library** to generate QR codes:

- **Format**: PNG
- **Size**: 250x250 pixels
- **Generated by**: `QRService.java`

QR codes are created for each registered attendee and can be sent via email.

## 📝 Development Guidelines

### Code Style

- Follow Java conventions for backend code
- Use ESLint for frontend code consistency
- Utilize Lombok annotations to reduce boilerplate

### Building & Testing

```bash
# Backend tests
cd backend
mvn test

# Frontend linting
cd frontend
npm run lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Happy Coding! 🎓**
