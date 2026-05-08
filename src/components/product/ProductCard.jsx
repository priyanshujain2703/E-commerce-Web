import { motion } from 'framer-motion';
import { FiHeart, FiShoppingBag, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCart } from '../../context/CartContext.jsx';
import { useWishlist } from '../../context/WishlistContext.jsx';

function ProductCard({ product, index = 0 }) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const productImage = product.image || product.images?.[0];
  const productBadge = product.badge || product.tags?.[0] || 'Premium';
  const activePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const wished = isWishlisted(product.id);

  function handleAddToCart() {
    addToCart({ ...product, quantity: 1 });
    toast.success(`${product.name} added to cart`);
  }

  function handleWishlist() {
    toggleWishlist(product);
    toast.info(wished ? 'Removed from wishlist' : 'Added to wishlist');
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
              className={[
                'grid h-10 w-10 place-items-center rounded-full border transition duration-200 hover:border-brass-500 hover:text-brass-700',
                wished
                  ? 'border-brass-500 bg-brass-100 text-brass-700'
                  : 'border-ink-200 text-ink-800',
              ].join(' ')}
              aria-label={
                wished
                  ? `Remove ${product.name} from wishlist`
                  : `Add ${product.name} to wishlist`
              }
            >
              <FiHeart className={wished ? 'fill-current' : ''} size={18} />
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
