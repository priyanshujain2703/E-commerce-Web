import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCart } from '../../context/CartContext.jsx';
import { useStore } from '../../context/StoreContext.jsx';

function ProductCard({ product, index = 0 }) {
  const { dispatch } = useStore();
  const { addToCart } = useCart();
  const productImage = product.image || product.images?.[0];
  const productBadge = product.badge || product.tags?.[0] || 'Premium';
  const activePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;

  function handleAddToCart() {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  }

  function handleWishlist() {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[8px] bg-white shadow-soft ring-1 ring-ink-200/70"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink-100">
          <img
            src={productImage}
            alt={product.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-ink-900 backdrop-blur">
            {productBadge}
          </div>
        </div>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-ink-500">{product.category}</p>
            <h3 className="mt-1 text-lg font-bold text-ink-950">{product.name}</h3>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-ink-950">${activePrice}</p>
            {hasDiscount && (
              <p className="text-sm font-semibold text-ink-400 line-through">
                ${product.price}
              </p>
            )}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm font-semibold text-ink-600">
            <FiStar className="fill-brass-500 text-brass-500" size={15} />
            <span>{product.rating}</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleWishlist}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink-200 text-ink-800 transition duration-200 hover:border-brass-500 hover:text-brass-700"
              aria-label={`Add ${product.name} to wishlist`}
            >
              <FiHeart size={18} />
            </button>
            <button
              type="button"
              onClick={handleAddToCart}
              className="inline-flex h-10 items-center gap-2 rounded-full bg-ink-950 px-4 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
            >
              <FiShoppingBag size={17} />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default ProductCard;
