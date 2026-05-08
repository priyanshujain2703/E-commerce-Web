# Premium Shoes Commerce

A modern React e-commerce storefront built with Vite, Tailwind CSS, Firebase Authentication, and React Router.

## Features

- Responsive product-focused landing page
- Authentication with Firebase (Email/Password + Google)
- Protected cart, wishlist, checkout, and account pages
- Persistent cart and wishlist using `localStorage`
- Modular React context architecture for state management
- Smooth animations with `framer-motion`

## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Firebase Authentication
- React Router v7
- React Toastify
- Framer Motion

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a Firebase project at https://console.firebase.google.com

3. Register a web app in Firebase and copy your config values.

4. Create a local `.env` file in the project root with:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id_here
```

5. Enable authentication providers in Firebase:
   - Email/Password
   - Google Sign-In (optional)

6. Start the development server:

```bash
npm run dev
```

## Available Scripts

- `npm run dev` - Start the Vite development server
- `npm run build` - Build the production bundle
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint checks

## Project Structure

- `src/main.jsx` - Application entry point
- `src/App.jsx` - Main app container with route handling
- `src/routes.jsx` - Route definitions and protected route wrappers
- `src/context/` - React context providers for store, cart, and wishlist
- `src/firebase/` - Firebase configuration and auth helpers
- `src/components/` - UI components and layout
- `src/pages/` - Page components for home, shop, account, cart, checkout, login, signup, wishlist
- `src/styles.css` - Global Tailwind CSS styles

## Firebase Notes

This app uses Firebase only for authentication. If Firebase is misconfigured, the app may show a white screen or fail during auth initialization.

If you want to disable Firebase temporarily for frontend development, you can adjust `src/components/auth/AuthStateListener.jsx` to avoid subscription errors until your `.env` variables are correct.

## Environment Variables

Make sure these are defined in `.env`:

- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Notes

- Do not commit your `.env` file to source control.
- Use `.env.example` as a template for required Firebase variables.

## License

This project is provided as-is.
