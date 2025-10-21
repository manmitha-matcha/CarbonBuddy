<<<<<<< HEAD
# CarbonBuddy 🌱

A modern, precise, and eco-friendly web application that helps users measure, understand, and reduce their carbon footprint. Built with React, Vite, TailwindCSS, and Firebase.

## Features

- 🔐 **Secure Authentication** - Firebase-powered sign up/sign in
- 📊 **Carbon Footprint Calculator** - Comprehensive emissions tracking
- 📈 **Visual Analytics** - Interactive charts and progress tracking
- 💡 **Personalized Tips** - AI-driven eco-friendly recommendations
- 📰 **Environmental News** - Latest sustainability news and insights
- ⚙️ **Customizable Settings** - User preferences and theme options
- 📱 **Mobile Responsive** - Optimized for all devices
- ♿ **Accessibility** - WCAG 2.1 compliant design

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: TailwindCSS with custom green theme
- **Authentication**: Firebase Auth
- **Database**: Firestore
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd carbonbuddy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase configuration

4. **Configure Environment Variables**
   The `.env` file has been created for you. Update it with your Firebase project details:
   ```env
   VITE_FIREBASE_API_KEY=your-actual-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-app-id
   ```

5. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
   - Enable Authentication (Email/Password)
   - Enable Firestore Database
   - Get your Firebase configuration from Project Settings
   - Update the `.env` file with your actual Firebase credentials
   - See `FIREBASE_SETUP.md` for detailed instructions

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
src/
├── auth/                 # Authentication components
│   ├── SignIn.jsx
│   └── SignUp.jsx
├── components/           # Reusable components
│   ├── Navbar.jsx
│   ├── Calculator.jsx
│   ├── Chart.jsx
│   └── Footer.jsx
├── contexts/            # React contexts
│   └── AuthContext.jsx
├── firebase/            # Firebase configuration
│   └── config.js
├── pages/               # Page components
│   ├── Dashboard.jsx
│   ├── Tips.jsx
│   ├── Impact.jsx
│   └── Settings.jsx
├── App.jsx              # Main app component
├── main.jsx             # App entry point
└── index.css            # Global styles
```

## Carbon Footprint Calculations

The application uses scientifically accurate CO₂ emission factors:

- **Car Emissions**: Petrol (0.271 kg CO₂e/km), Diesel (0.300 kg CO₂e/km)
- **Electricity**: 0.475 kg CO₂e/kWh
- **Air Travel**: 0.115 kg CO₂e/km
- **Diet**: Meat-heavy (3.3), Balanced (2.5), Vegetarian (1.7), Vegan (1.5) kg CO₂e/day
- **Domestic Activities**: Laundry (0.6), Dishwasher (0.4), Shower (0.1), Heating (0.2), Cooking (0.3) kg CO₂e per activity

## Features Overview

### 🏠 Dashboard
- Hero section with CarbonBuddy branding
- Feature highlights and benefits
- Interactive carbon footprint calculator
- Visual emissions breakdown with charts
- Quick stats and insights

### 💡 Tips Page
- Personalized eco-friendly recommendations
- Filter by category and difficulty level
- Save favorite tips
- Impact and difficulty indicators
- Beginner to advanced tips

### 📊 Impact Page
- Global carbon footprint statistics
- Educational content about climate impact
- Latest environmental news
- News filtering by category
- Real-time news updates

### ⚙️ Settings Page
- Profile management
- Password change functionality
- Unit preferences (metric/imperial)
- Theme selection (light/dark green)
- Account information

## Deployment

### Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   Add your Firebase configuration in Vercel dashboard

### Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm i -g firebase-tools
   ```

2. **Build the project**
   ```bash
   npm run build
   ```

3. **Initialize Firebase Hosting**
   ```bash
   firebase init hosting
   ```

4. **Deploy**
   ```bash
   firebase deploy
   ```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Carbon emission factors from [EPA](https://www.epa.gov/) and [Carbon Trust](https://www.carbontrust.com/)
- Design inspiration from modern sustainability apps
- Icons by [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

## Support

For support, email support@carbonbuddy.app or create an issue in the repository.

---

**CarbonBuddy** - Your everyday companion for a greener tomorrow 🌱
=======
# CarbonBuddy
>>>>>>> bcff0ec42dc37405d8b4d13812b8611e9dc8fbe6
