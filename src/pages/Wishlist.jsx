import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import WishlistItem from '../components/wishlist/WishlistItem.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';

function Wishlist() {
  const { addToCart } = useCart();
  const { clearWishlist, removeFromWishlist, wishlistCount, wishlistItems } =
    useWishlist();

  function handleAddToCart(item) {
    addToCart({ ...item, quantity: 1 });
    toast.success(`${item.name} added to cart`);
  }

  function handleRemove(productId) {
    removeFromWishlist(productId);
    toast.info('Removed from wishlist');
  }

  function handleClearWishlist() {
    clearWishlist();
    toast.info('Wishlist cleared');
  }

  if (wishlistItems.length === 0) {
    return (
      <section className="page-shell py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-2xl rounded-[8px] bg-white p-8 text-center shadow-soft ring-1 ring-ink-200/70 sm:p-12"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink-100 text-ink-950">
            <FiHeart size={26} />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-brass-700">
            Wishlist
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink-950">
            Save pairs for later.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink-600">
            Tap the heart on any product to keep your favorite premium shoes here.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
          >
            <span>Explore shoes</span>
            <FiArrowRight size={18} />
          </Link>
        </motion.div>
      </section>
    );
  }

  return (
    <div className="bg-ink-50">
      <section className="border-b border-ink-200 bg-white">
        <div className="page-shell py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
                Wishlist
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
                Your saved rotation.
              </h1>
              <p className="mt-4 text-base leading-7 text-ink-600">
                {wishlistCount} {wishlistCount === 1 ? 'style' : 'styles'} saved for later.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearWishlist}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-bold text-ink-900 transition duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <FiTrash2 size={16} />
              <span>Clear wishlist</span>
            </button>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {wishlistItems.map((item) => (
            <WishlistItem
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onRemove={handleRemove}
            />
          ))}
        </motion.div>
      </section>
    </div>
  );
}

export default Wishlist;
