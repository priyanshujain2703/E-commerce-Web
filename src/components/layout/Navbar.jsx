import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiHeart, FiMenu, FiSearch, FiShoppingBag, FiUser, FiX } from 'react-icons/fi';
import { Link, NavLink, useLocation } from 'react-router-dom';

import { useCart } from '../../context/CartContext.jsx';
import { useStore } from '../../context/StoreContext.jsx';
import NavIconButton from '../ui/NavIconButton.jsx';

const navLinks = [
  { label: 'New Arrivals', path: '/shop' },
  { label: 'Men', path: '/shop?category=men' },
  { label: 'Women', path: '/shop?category=women' },
  { label: 'Collections', path: '/shop?collection=signature' },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname, search } = useLocation();
  const { state } = useStore();
  const { itemCount } = useCart();

  const wishlistCount = state.wishlist.length;
  const profileLabel = state.user?.displayName || 'Login';

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname, search]);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-200/70 bg-ink-50/90 backdrop-blur-xl">
      <nav className="page-shell flex h-20 items-center justify-between gap-6">
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-900 shadow-sm transition duration-200 hover:border-ink-300 hover:bg-ink-100"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        <Link to="/" className="group flex shrink-0 items-center gap-3" aria-label="Go to homepage">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-950 text-sm font-semibold uppercase tracking-[0.18em] text-white transition duration-300 group-hover:bg-brass-500">
            AT
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block font-display text-2xl font-bold tracking-normal text-ink-950">
              Aureus Tread
            </span>
            <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.24em] text-ink-500">
              Premium Footwear
            </span>
          </span>
        </Link>

        <div className="hidden flex-1 items-center justify-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                [
                  'rounded-full px-4 py-2 text-sm font-semibold text-ink-600 transition duration-200 hover:bg-white hover:text-ink-950 hover:shadow-sm',
                  isActive ? 'bg-white text-ink-950 shadow-sm' : '',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2">
          <NavIconButton label="Search" icon={<FiSearch size={19} />} />
          <NavIconButton
            label="Wishlist"
            icon={<FiHeart size={19} />}
            to="/account"
            count={wishlistCount}
          />
          <NavIconButton
            label="Cart"
            icon={<FiShoppingBag size={19} />}
            to="/cart"
            count={itemCount}
          />
          <Link
            to={state.user ? '/account' : '/login'}
            className="hidden items-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-brass-500 hover:text-ink-950 md:flex"
          >
            <FiUser size={17} />
            <span>{profileLabel}</span>
          </Link>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="border-t border-ink-200 bg-ink-50 lg:hidden"
          >
            <div className="page-shell py-4">
              <div className="grid gap-2">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.label}
                    to={link.path}
                    className={({ isActive }) =>
                      [
                        'rounded-2xl px-4 py-3 text-base font-semibold text-ink-700 transition duration-200 hover:bg-white hover:text-ink-950',
                        isActive ? 'bg-white text-ink-950 shadow-sm' : '',
                      ].join(' ')
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <Link
                to={state.user ? '/account' : '/login'}
                className="mt-4 flex items-center justify-center gap-2 rounded-full bg-ink-950 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
              >
                <FiUser size={17} />
                <span>{profileLabel}</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
