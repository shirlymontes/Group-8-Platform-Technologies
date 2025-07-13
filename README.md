# 🚀 FinMark Microservices Platform – Documentation

## Project Overview
FinMark is a financial technology platform designed with a microservices architecture.
This prototype demonstrates the core structure, data flow, and security for a scalable fintech system.

## Platform Structure
- **Frontend**: React app for user login and displaying profile/report data
- **API Gateway**: Routes all frontend requests to the correct microservice
- **Auth Service**: Handles login/authentication using JWT
- **User Service**: Manages and returns user profile data (protected by token)
- **Report Service**: Provides demo financial report data (with caching)
- **Database**: Not yet connected (demo data is in-memory for this prototype)

## Key Features
- **User Login**: Users log in with a username and password; a JWT token is returned on success.
- **Protected Profile**: Profile endpoint requires a valid token (JWT-based authentication).
- **Financial Report**: Returns a sample report, with a caching mechanism for faster response.
- **Microservices**: Each service runs independently and can be scaled separately.
- **API Gateway**: Central point for communication and security between frontend and backend.
- **Professional UI/UX**: Modern, corporate-grade design with glass morphism effects.
- **Logout Functionality**: Secure session termination with complete state cleanup.
- **Responsive Design**: Mobile-first approach that works on all devices.

## 🎨 New Professional Design Features
### Modern Corporate Interface
- **Glass Morphism Design**: Translucent cards with backdrop blur effects
- **Professional Color Scheme**: Corporate blue-purple gradient theme
- **Smooth Animations**: Hover effects and loading animations throughout
- **Corporate Branding**: Professional logo and typography design
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices

### Enhanced User Experience
- **Professional Login Page**: Modern form design with enhanced validation feedback
- **Executive Dashboard**: Clean, card-based layout with professional styling
- **Loading States**: Professional spinners and progress indicators
- **Error Handling**: Styled error messages with appropriate visual feedback
- **Navigation Header**: Corporate-style header with user info and logout

### Security & Session Management
- **Secure Logout**: Complete session cleanup and state management
- **JWT Token Management**: Proper token handling and validation
- **Protected Routes**: Secure access to user data and reports
- **Session Persistence**: Maintains login state during browser sessions

## Setup Instructions

### Clone the repository:
```bash
git clone https://github.com/[your-username]/Group-8-Platform-Technologies.git
```

### Install dependencies in each backend service and frontend:
```bash
cd [service-folder]
npm install
```

### Run backend services:
**Recommended**: Use the API Gateway for full functionality:
```bash
cd api-gateway && node index.js
```

**Alternative**: Run individual services (for development):
```bash
cd auth-service && node index.js
cd user-service && node index.js
cd report-service && node index.js
cd api-gateway && node index.js
```

### Run frontend:
```bash
cd finmark-frontend && npm start
```

### Demo credentials:
- **Username**: `john`
- **Password**: `password`
- **Username**: `admin`
- **Password**: `password`

(Or any valid user you added in your auth service)

## What Was Set Up (and Why)
- **Microservices architecture** to allow each part of the system to scale and be updated independently.
- **API Gateway** for a single entry point, adding security and simplifying frontend connections.
- **JWT authentication** to protect user data and ensure secure login.
- **Demo data** for rapid prototyping and easy testing.
- **Frontend** for a simple, user-friendly experience.

## Challenges Encountered
- **Connecting multiple services**: Needed to ensure routes and ports matched between frontend and backend.
- **Route & data field mismatches**: Resolved by aligning frontend request fields with backend expectations (e.g., username/password).
- **Authentication flow**: Ensured that tokens were properly generated, sent, and required for protected endpoints.
- **CORS issues**: Fixed with proper setup in the API Gateway.
- **Demo data**: Used in-memory objects instead of a real database for simplicity.

## What Worked
- All services communicate via API Gateway.
- Login flow is secure and working.
- Profile and report data is fetched and shown after login.
- Frontend and backend are completely connected.
- Prototype can be extended for more features.
- **Professional UI implementation**: Modern, corporate-grade design successfully implemented.
- **Logout functionality**: Complete session management with secure cleanup.
- **Responsive design**: Application works seamlessly across all device sizes.
- **Glass morphism effects**: Modern visual design enhances user experience.
- **Corporate branding**: Professional appearance suitable for fintech industry.

## What Needs Refinement
- **Database integration**: Replace in-memory demo data with a real PostgreSQL database for persistence.
- **User registration**: Add ability to register new users.
- **Better error handling** and user feedback in the frontend.
- **Production security**: Add rate limiting, input validation, and HTTPS for live deployments.
- **Automated tests**: To ensure ongoing reliability as features are added.

## Screenshots
(Add your own project screenshots here)

## Credits
Developed by **Group 8 (FinMark Team)**

For **MO-IT151 Platform Technologies, Milestone 1**

## License
This project is for educational purposes.
