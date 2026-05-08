import { motion } from 'framer-motion';
import { FiArrowLeft, FiCreditCard, FiLock, FiMapPin } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import Button from '../components/ui/Button.jsx';
import EmptyState from '../components/ui/EmptyState.jsx';
import { useCart } from '../context/CartContext.jsx';

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function Checkout() {
  const { cartItems, itemCount, shipping, subtotal, tax, total } = useCart();

  if (cartItems.length === 0) {
    return (
      <section className="page-shell py-16 sm:py-20">
        <EmptyState
          title="Checkout needs a cart."
          description="Choose a pair first, then return here to review delivery and payment."
          actionLabel="Shop shoes"
          actionTo="/shop"
          icon={<FiCreditCard size={26} />}
        />
      </section>
    );
  }

  return (
    <div className="bg-ink-50">
      <section className="border-b border-ink-200 bg-white">
        <div className="page-shell py-12 sm:py-16">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink-600 transition duration-200 hover:text-ink-950"
          >
            <FiArrowLeft size={17} />
            <span>Back to cart</span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="mt-6 max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
              Secure Checkout
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
              Finish your premium order.
            </h1>
            <p className="mt-4 text-base leading-7 text-ink-600">
              This checkout UI is ready for payment integration and order creation.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-start">
          <motion.form
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid gap-6"
          >
            <CheckoutPanel icon={<FiMapPin size={20} />} title="Delivery details">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input label="First name" placeholder="Alex" />
                <Input label="Last name" placeholder="Morgan" />
                <Input label="Email" placeholder="you@example.com" type="email" />
                <Input label="Phone" placeholder="+1 555 0182" />
                <Input className="sm:col-span-2" label="Address" placeholder="123 Market Street" />
                <Input label="City" placeholder="San Francisco" />
                <Input label="ZIP code" placeholder="94103" />
              </div>
            </CheckoutPanel>

            <CheckoutPanel icon={<FiCreditCard size={20} />} title="Payment">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input className="sm:col-span-2" label="Card number" placeholder="4242 4242 4242 4242" />
                <Input label="Expiry" placeholder="MM / YY" />
                <Input label="CVC" placeholder="123" />
              </div>
            </CheckoutPanel>
          </motion.form>

          <motion.aside
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 lg:sticky lg:top-28"
          >
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-700">
              Summary
            </p>
            <h2 className="mt-2 text-2xl font-bold text-ink-950">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </h2>

            <div className="mt-6 space-y-4 border-b border-ink-200 pb-5">
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                  <img
                    src={item.image || item.images?.[0]}
                    alt={item.name}
                    className="h-16 w-16 rounded-[8px] object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink-950">{item.name}</p>
                    <p className="mt-1 text-xs font-semibold text-ink-500">
                      Qty {item.quantity}
                      {item.selectedSize ? ` · Size ${item.selectedSize}` : ''}
                    </p>
                  </div>
                  <p className="text-sm font-bold text-ink-950">
                    {formatPrice((item.discountPrice || item.price) * item.quantity)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3 text-sm font-semibold text-ink-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span>{formatPrice(tax)}</span>
              </div>
            </div>

            <div className="mt-5 flex items-center justify-between border-t border-ink-200 pt-5">
              <span className="font-bold text-ink-950">Total</span>
              <span className="text-2xl font-extrabold text-ink-950">
                {formatPrice(total)}
              </span>
            </div>

            <Button className="mt-6" fullWidth iconLeft={<FiLock size={17} />}>
              Place order
            </Button>
          </motion.aside>
        </div>
      </section>
    </div>
  );
}

function CheckoutPanel({ children, icon, title }) {
  return (
    <section className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-ink-100 text-ink-950">
          {icon}
        </span>
        <h2 className="text-xl font-bold text-ink-950">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function Input({ className = '', label, placeholder, type = 'text' }) {
  return (
    <label className={['block', className].join(' ')}>
      <span className="text-sm font-bold text-ink-950">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 h-[50px] w-full rounded-full border border-ink-200 bg-ink-50 px-4 text-sm font-medium text-ink-950 outline-none transition duration-200 placeholder:text-ink-400 focus:border-ink-950 focus:bg-white"
      />
    </label>
  );
}

export default Checkout;
