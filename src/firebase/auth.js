import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './config.js';

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export async function signUpWithEmail({ email, password, displayName }) {
  const credentials = await createUserWithEmailAndPassword(auth, email, password);

  if (displayName) {
    await updateProfile(credentials.user, { displayName });
  }

  return credentials.user;
}

export async function loginWithEmail({ email, password }) {
  const credentials = await signInWithEmailAndPassword(auth, email, password);
  return credentials.user;
}

export async function loginWithGoogle() {
  const credentials = await signInWithPopup(auth, googleProvider);
  return credentials.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}

export { auth, googleProvider };
