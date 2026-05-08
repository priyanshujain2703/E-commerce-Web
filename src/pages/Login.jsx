import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  FiAlertCircle,
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
} from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { useStore } from '../context/StoreContext.jsx';
import { loginWithEmail, loginWithGoogle } from '../firebase/auth.js';
import { mapAuthUser } from '../utils/authUser.js';
import { showError, showSuccess } from '../utils/toast.js';

const firebaseErrorMessages = {
  'auth/invalid-credential': 'The email or password is incorrect.',
  'auth/invalid-email': 'Enter a valid email address.',
  'auth/user-disabled': 'This account has been disabled.',
  'auth/popup-closed-by-user': 'Google sign in was closed before it finished.',
  'auth/too-many-requests': 'Too many attempts. Please try again later.',
};

function validateForm(values) {
  const errors = {};

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address.';
  }

  if (!values.password) {
    errors.password = 'Password is required.';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }

  return errors;
}

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useStore();
  const [values, setValues] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loadingAction, setLoadingAction] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setAuthError('');
  }

  async function handleEmailLogin(event) {
    event.preventDefault();

    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      setLoadingAction('email');
      const user = await loginWithEmail(values);
      dispatch({ type: 'SET_USER', payload: mapAuthUser(user) });
      showSuccess('Welcome back');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const message =
        firebaseErrorMessages[error.code] || 'Unable to sign in. Please try again.';
      setAuthError(message);
      showError(message);
    } finally {
      setLoadingAction('');
    }
  }

  async function handleGoogleLogin() {
    try {
      setAuthError('');
      setLoadingAction('google');
      const user = await loginWithGoogle();
      dispatch({ type: 'SET_USER', payload: mapAuthUser(user) });
      showSuccess('Signed in with Google');
      navigate(redirectPath, { replace: true });
    } catch (error) {
      const message =
        firebaseErrorMessages[error.code] || 'Google sign in failed. Please try again.';
      setAuthError(message);
      showError(message);
    } finally {
      setLoadingAction('');
    }
  }

  const isSubmitting = Boolean(loadingAction);
  const redirectPath = location.state?.from?.pathname || '/account';

  return (
    <section className="bg-ink-50">
      <div className="page-shell grid min-h-[calc(100vh-80px)] gap-8 py-10 lg:grid-cols-[1fr_0.92fr] lg:items-center lg:py-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative hidden min-h-[620px] overflow-hidden rounded-[8px] bg-ink-950 text-white shadow-soft lg:block"
        >
          <img
            src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1400&q=88"
            alt="Premium sneakers styled in a studio setting"
            className="absolute inset-0 h-full w-full object-cover opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-10">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brass-300">
              Member Access
            </p>
            <h1 className="mt-4 max-w-xl font-display text-5xl font-bold">
              Step back into your curated footwear world.
            </h1>
            <p className="mt-5 max-w-lg text-base leading-8 text-ink-100">
              Save favorite pairs, keep your cart in sync, and unlock early access
              to premium drops.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08, ease: 'easeOut' }}
          className="mx-auto w-full max-w-xl rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-8 lg:p-10"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
              Login
            </p>
            <h2 className="mt-3 font-display text-4xl font-bold text-ink-950">
              Welcome back.
            </h2>
            <p className="mt-3 text-base leading-7 text-ink-600">
              Sign in to manage your wishlist, cart, and premium shoe drops.
            </p>
          </div>

          {authError && (
            <div className="mt-6 flex items-start gap-3 rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700">
              <FiAlertCircle className="mt-0.5 shrink-0" size={18} />
              <p>{authError}</p>
            </div>
          )}

          <form className="mt-7 space-y-5" onSubmit={handleEmailLogin}>
            <div>
              <label htmlFor="email" className="text-sm font-bold text-ink-950">
                Email address
              </label>
              <div className="relative mt-2">
                <FiMail
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                  size={18}
                />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={[
                    'h-[52px] w-full rounded-full border bg-ink-50 pl-11 pr-4 text-sm font-medium text-ink-950 outline-none transition duration-200 placeholder:text-ink-400 focus:bg-white',
                    errors.email ? 'border-red-300 focus:border-red-500' : 'border-ink-200 focus:border-ink-950',
                  ].join(' ')}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm font-semibold text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-bold text-ink-950">
                Password
              </label>
              <div className="relative mt-2">
                <FiLock
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                  size={18}
                />
                <input
                  id="password"
                  name="password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  value={values.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className={[
                    'h-[52px] w-full rounded-full border bg-ink-50 pl-11 pr-12 text-sm font-medium text-ink-950 outline-none transition duration-200 placeholder:text-ink-400 focus:bg-white',
                    errors.password ? 'border-red-300 focus:border-red-500' : 'border-ink-200 focus:border-ink-950',
                  ].join(' ')}
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordVisible((current) => !current)}
                  className="absolute right-3 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-ink-500 transition duration-200 hover:bg-ink-100 hover:text-ink-950"
                  aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                  {isPasswordVisible ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm font-semibold text-red-600">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="inline-flex items-center gap-2 font-semibold text-ink-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-ink-300 accent-ink-950"
                />
                Remember me
              </label>
              <Link
                to="/login"
                className="font-bold text-ink-950 transition duration-200 hover:text-brass-700"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-full bg-ink-950 px-6 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <span>{loadingAction === 'email' ? 'Signing in...' : 'Sign in'}</span>
              <FiArrowRight size={18} />
            </button>
          </form>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-ink-200" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-ink-400">
              Or
            </span>
            <span className="h-px flex-1 bg-ink-200" />
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting}
            className="inline-flex h-[52px] w-full items-center justify-center gap-3 rounded-full border border-ink-200 bg-white px-6 text-sm font-bold text-ink-950 transition duration-200 hover:border-ink-950 hover:bg-ink-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FcGoogle size={21} />
            <span>{loadingAction === 'google' ? 'Connecting...' : 'Continue with Google'}</span>
          </button>

          <p className="mt-7 text-center text-sm font-semibold text-ink-600">
            New to Aureus Tread?{' '}
            <Link
              to="/signup"
              className="font-bold text-ink-950 transition duration-200 hover:text-brass-700"
            >
              Create an account
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

export default Login;
