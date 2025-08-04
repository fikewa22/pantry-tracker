# Deployment Guide

## Environment Variables Required

To deploy this application successfully, you need to configure the following environment variables:

### Firebase Configuration
```
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
```

### OpenRouter API Key (for AI Image Recognition)
```
NEXT_PUBLIC_OPENROUTER_API_KEY=your_openrouter_api_key_here
```

## Deployment Platforms

### Vercel
1. Connect your GitHub repository to Vercel
2. Add the environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect your GitHub repository to Netlify
2. Add environment variables in Netlify dashboard
3. Set build command: `npm run build`
4. Set publish directory: `.next`

### Railway
1. Connect your GitHub repository to Railway
2. Add environment variables in Railway dashboard
3. Deploy automatically

## Firebase Setup
1. Create a new Firebase project
2. Enable Firestore Database
3. Enable Storage
4. Get your configuration from Project Settings > General > Your Apps

## OpenRouter Setup
1. Sign up at https://openrouter.ai
2. Get your API key from the dashboard
3. Add it to your environment variables

## Troubleshooting

### Build Errors
- Ensure all environment variables are set
- Check that Firebase project is properly configured
- Verify API keys are valid

### Runtime Errors
- Check browser console for detailed error messages
- Verify Firebase rules allow read/write operations
- Ensure OpenRouter API key has sufficient credits

### Camera Issues
- Ensure HTTPS is enabled (required for camera access)
- Check browser permissions for camera access
- Verify device has camera capabilities 