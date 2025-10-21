# Firebase Setup Guide for CarbonBuddy

## Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click "Create a project" or "Add project"
3. Enter project name: `carbonbuddy` (or any name you prefer)
4. Enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Enable Authentication

1. In your Firebase project, go to "Authentication" in the left sidebar
2. Click "Get started"
3. Go to "Sign-in method" tab
4. Enable "Email/Password" authentication
5. Click "Save"

## Step 3: Enable Firestore Database

1. In your Firebase project, go to "Firestore Database" in the left sidebar
2. Click "Create database"
3. Choose "Start in test mode" (for development)
4. Select a location for your database
5. Click "Done"

## Step 4: Get Firebase Configuration

1. In your Firebase project, go to "Project settings" (gear icon)
2. Scroll down to "Your apps" section
3. Click "Add app" and select the web icon (</>)
4. Register your app with a nickname (e.g., "CarbonBuddy Web")
5. Copy the Firebase configuration object

## Step 5: Create Environment Variables

Create a `.env` file in your project root with the following content:

```env
VITE_FIREBASE_API_KEY=your-api-key-here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=your-app-id
```

Replace the placeholder values with your actual Firebase configuration values.

## Step 6: Update Firestore Security Rules (Optional)

For development, you can use these rules in Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Step 7: Test Your Setup

1. Run `npm run dev`
2. Try to sign up with a test email
3. Check if the user appears in Firebase Authentication
4. Check if user data is saved in Firestore

## Troubleshooting

### Common Issues:

1. **"Firebase: No API key" error**
   - Make sure your `.env` file is in the project root
   - Restart your development server after creating `.env`
   - Check that all environment variables are correctly named

2. **Authentication not working**
   - Verify Email/Password is enabled in Firebase Console
   - Check that your domain is authorized (for production)

3. **Firestore permission denied**
   - Check your Firestore security rules
   - Make sure the user is authenticated

### Example Firebase Configuration:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "carbonbuddy-12345.firebaseapp.com",
  projectId: "carbonbuddy-12345",
  storageBucket: "carbonbuddy-12345.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Production Deployment

For production deployment:

1. Update Firestore security rules for production
2. Add your domain to authorized domains in Firebase Console
3. Set up proper environment variables in your hosting platform
4. Consider enabling additional security features

## Support

If you encounter issues:
1. Check the Firebase Console for error logs
2. Verify your environment variables
3. Make sure all Firebase services are properly enabled
4. Check the browser console for detailed error messages
