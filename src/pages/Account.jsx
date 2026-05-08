import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiBox,
  FiCheckCircle,
  FiLogOut,
  FiMail,
  FiMapPin,
  FiUser,
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';

import { useStore } from '../context/StoreContext.jsx';
import { logoutUser } from '../firebase/auth.js';
import { showError, showInfo } from '../utils/toast.js';

const mockOrders = [
  {
    id: 'AT-10482',
    date: 'Apr 28, 2026',
    status: 'Delivered',
    product: 'Vanta Knit Runner',
    total: 181.44,
    items: 1,
  },
  {
    id: 'AT-10319',
    date: 'Mar 16, 2026',
    status: 'In transit',
    product: 'Monarch Court Pro',
    total: 204.12,
    items: 1,
  },
  {
    id: 'AT-09974',
    date: 'Feb 02, 2026',
    status: 'Delivered',
    product: 'Aero Suede Low',
    total: 156.6,
    items: 2,
  },
];

function getInitials(name, email) {
  const source = name || email || 'AT';
  const parts = source.split(/[.\s@_-]+/).filter(Boolean);

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('');
}

function Account() {
  const navigate = useNavigate();
  const { dispatch, state } = useStore();
  const user = state.user;
  const displayName = user?.displayName || 'Aureus Member';
  const initials = getInitials(user?.displayName, user?.email);

  async function handleLogout() {
    try {
      await logoutUser();
      dispatch({ type: 'SET_USER', payload: null });
      showInfo('Signed out');
      navigate('/login', { replace: true });
    } catch {
      showError('Unable to sign out. Please try again.');
    }
  }

  return (
    <div className="bg-ink-50">
      <section className="border-b border-ink-200 bg-white">
        <div className="page-shell py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="grid h-24 w-24 shrink-0 place-items-center overflow-hidden rounded-full bg-ink-950 text-3xl font-bold text-white ring-4 ring-brass-100">
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={displayName}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span>{initials}</span>
                )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
                  Profile
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
                  {displayName}
                </h1>
                <p className="mt-3 flex items-center gap-2 text-base font-semibold text-ink-600">
                  <FiMail size={17} />
                  <span>{user?.email}</span>
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-bold text-ink-900 transition duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <FiLogOut size={17} />
              <span>Logout</span>
            </button>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[340px_1fr] lg:items-start">
          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-700">
              Member Details
            </p>
            <div className="mt-6 space-y-5">
              <div className="flex items-start gap-3">
                <FiUser className="mt-1 text-brass-700" size={19} />
                <div>
                  <p className="text-sm font-bold text-ink-950">Name</p>
                  <p className="mt-1 text-sm font-semibold text-ink-600">{displayName}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMail className="mt-1 text-brass-700" size={19} />
                <div>
                  <p className="text-sm font-bold text-ink-950">Email</p>
                  <p className="mt-1 break-all text-sm font-semibold text-ink-600">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiMapPin className="mt-1 text-brass-700" size={19} />
                <div>
                  <p className="text-sm font-bold text-ink-950">Default region</p>
                  <p className="mt-1 text-sm font-semibold text-ink-600">
                    United States
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-[8px] bg-ink-950 p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-300">
                Member Perk
              </p>
              <p className="mt-3 text-sm leading-6 text-ink-100">
                Early access to limited colorways and private seasonal edits.
              </p>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-8"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-700">
                  Orders
                </p>
                <h2 className="mt-2 text-2xl font-bold text-ink-950">
                  Recent order history
                </h2>
              </div>
              <Link
                to="/shop"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-bold text-ink-900 transition duration-200 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
              >
                <span>Shop again</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            <div className="mt-6 grid gap-4">
              {mockOrders.map((order) => (
                <article
                  key={order.id}
                  className="rounded-[8px] border border-ink-200 bg-ink-50 p-5 transition duration-200 hover:border-ink-300 hover:bg-white"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white text-ink-950 ring-1 ring-ink-200">
                        <FiBox size={20} />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-bold text-ink-950">{order.product}</h3>
                          <span className="rounded-full bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-600 ring-1 ring-ink-200">
                            {order.id}
                          </span>
                        </div>
                        <p className="mt-2 text-sm font-semibold text-ink-500">
                          {order.date} · {order.items} {order.items === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 md:justify-end">
                      <span className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1.5 text-sm font-bold text-green-700">
                        <FiCheckCircle size={15} />
                        {order.status}
                      </span>
                      <p className="text-lg font-extrabold text-ink-950">
                        ${order.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default Account;
