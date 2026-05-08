import { motion } from 'framer-motion';
import { FiArrowRight, FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import CartItem from '../components/cart/CartItem.jsx';
import { useCart } from '../context/CartContext.jsx';

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function Cart() {
  const {
    cartItems,
    clearCart,
    getCartItemKey,
    itemCount,
    removeFromCart,
    savings,
    shipping,
    subtotal,
    tax,
    total,
    updateQuantity,
  } = useCart();

  function handleRemove(key) {
    removeFromCart(key);
    toast.info('Item removed from cart');
  }

  function handleClearCart() {
    clearCart();
    toast.info('Cart cleared');
  }

  if (cartItems.length === 0) {
    return (
      <section className="page-shell py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mx-auto max-w-2xl rounded-[8px] bg-white p-8 text-center shadow-soft ring-1 ring-ink-200/70 sm:p-12"
        >
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink-100 text-ink-950">
            <FiShoppingBag size={26} />
          </div>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.26em] text-brass-700">
            Your Cart
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-ink-950">
            Your cart is empty.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink-600">
            Add a premium pair from the shop and it will stay here for your next visit.
          </p>
          <Link
            to="/shop"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
          >
            <span>Shop shoes</span>
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
                Shopping Cart
              </p>
              <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
                Review your selected pairs.
              </h1>
              <p className="mt-4 text-base leading-7 text-ink-600">
                {itemCount} {itemCount === 1 ? 'item' : 'items'} ready for checkout.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearCart}
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 px-4 py-2.5 text-sm font-bold text-ink-900 transition duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            >
              <FiTrash2 size={16} />
              <span>Clear cart</span>
            </button>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid gap-4"
          >
            {cartItems.map((item) => {
              const itemKey = getCartItemKey(item);

              return (
                <CartItem
                  key={itemKey}
                  item={item}
                  itemKey={itemKey}
                  onRemove={handleRemove}
                  onUpdateQuantity={updateQuantity}
                />
              );
            })}
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 lg:sticky lg:top-28"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-700">
              Order Summary
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ink-950">Cart total</h2>

            <div className="mt-6 space-y-4 border-b border-ink-200 pb-5">
              <div className="flex justify-between text-sm font-semibold text-ink-600">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-ink-600">
                <span>Savings</span>
                <span>-{formatPrice(savings)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-ink-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-ink-600">
                <span>Estimated tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-base font-bold text-ink-950">Total</span>
              <span className="text-2xl font-extrabold text-ink-950">
                {formatPrice(total)}
              </span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink-950 px-5 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
            >
              <span>Checkout</span>
              <FiArrowRight size={18} />
            </Link>
            <Link
              to="/shop"
              className="mt-3 inline-flex w-full items-center justify-center rounded-full border border-ink-200 px-5 py-3 text-sm font-bold text-ink-900 transition duration-200 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
            >
              Continue shopping
            </Link>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}

export default Cart;
