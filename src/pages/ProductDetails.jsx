import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import {
  FiChevronLeft,
  FiHeart,
  FiMinus,
  FiPlus,
  FiShield,
  FiShoppingBag,
  FiStar,
  FiTruck,
} from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

import ProductCard from '../components/product/ProductCard.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useWishlist } from '../context/WishlistContext.jsx';
import products from '../data/products.json';
import { showInfo, showSuccess } from '../utils/toast.js';

const reviews = [
  {
    id: 'review-1',
    name: 'Ari Mason',
    title: 'Beautiful build and serious comfort',
    rating: 5,
    body: 'The materials feel much better than the usual lifestyle sneaker. I wore them through a full travel day and they still felt composed.',
  },
  {
    id: 'review-2',
    name: 'Nina Rao',
    title: 'Sharp enough for work',
    rating: 5,
    body: 'Clean silhouette, true sizing, and the sole has a nice cushioned feel without looking bulky.',
  },
  {
    id: 'review-3',
    name: 'Caleb Stone',
    title: 'Premium details show up close',
    rating: 4,
    body: 'Great finish and stable underfoot. I would like one more lace option in the box, but the shoe itself is excellent.',
  },
];

function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();

  const product = products.find((item) => item.id === productId);
  const [activeImage, setActiveImage] = useState(product?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.availableSizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]);
  const [quantity, setQuantity] = useState(1);

  const relatedProducts = useMemo(() => {
    if (!product) {
      return [];
    }

    return products
      .filter((item) => item.id !== product.id)
      .sort((first, second) => {
        const firstScore = first.category === product.category ? 0 : 1;
        const secondScore = second.category === product.category ? 0 : 1;
        return firstScore - secondScore;
      })
      .slice(0, 4);
  }, [product]);

  useEffect(() => {
    setActiveImage(product?.images?.[0]);
    setSelectedSize(product?.availableSizes?.[0]);
    setSelectedColor(product?.colors?.[0]);
    setQuantity(1);
  }, [productId, product]);

  if (!product) {
    return (
      <section className="page-shell py-16 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-brass-700">
          Product Missing
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink-950">
          This pair is not in the collection.
        </h1>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
        >
          <FiChevronLeft size={17} />
          <span>Back to shop</span>
        </Link>
      </section>
    );
  }

  const activePrice = product.discountPrice || product.price;
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const savings = hasDiscount ? product.price - product.discountPrice : 0;
  const wished = isWishlisted(product.id);

  function addSelectedProductToCart(redirect = false) {
    addToCart({
      ...product,
      selectedSize,
      selectedColor,
      quantity,
    });

    showSuccess(`${product.name} added to cart`);

    if (redirect) {
      navigate('/checkout');
    }
  }

  return (
    <div className="bg-ink-50">
      <section className="page-shell py-8 sm:py-12">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm font-bold text-ink-600 transition duration-200 hover:text-ink-950"
        >
          <FiChevronLeft size={17} />
          <span>Back to shop</span>
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="grid gap-4 lg:grid-cols-[92px_1fr]"
          >
            <div className="order-2 flex gap-3 overflow-x-auto lg:order-1 lg:flex-col lg:overflow-visible">
              {product.images.map((image) => (
                <button
                  key={image}
                  type="button"
                  onClick={() => setActiveImage(image)}
                  className={[
                    'h-20 w-20 shrink-0 overflow-hidden rounded-[8px] border bg-white transition duration-200',
                    activeImage === image
                      ? 'border-ink-950 shadow-soft'
                      : 'border-ink-200 hover:border-ink-500',
                  ].join(' ')}
                  aria-label={`View ${product.name} image`}
                >
                  <img
                    src={image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>

            <div className="order-1 overflow-hidden rounded-[8px] bg-white shadow-soft ring-1 ring-ink-200/70 lg:order-2">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={product.name}
                  initial={{ opacity: 0, scale: 1.03 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="aspect-[4/5] h-full w-full object-cover"
                />
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: 'easeOut' }}
            className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 sm:p-8"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-ink-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-ink-700">
                {product.category}
              </span>
              {hasDiscount && (
                <span className="rounded-full bg-brass-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-brass-700">
                  Save ${savings}
                </span>
              )}
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-ink-500">
              {product.brand}
            </p>
            <h1 className="mt-2 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
              {product.name}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-brass-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <FiStar
                    key={index}
                    className={index < Math.round(product.rating) ? 'fill-current' : ''}
                    size={18}
                  />
                ))}
              </div>
              <p className="text-sm font-semibold text-ink-600">
                {product.rating} rating · {product.reviewCount} reviews
              </p>
            </div>

            <div className="mt-6 flex items-end gap-3">
              <p className="text-3xl font-extrabold text-ink-950">${activePrice}</p>
              {hasDiscount && (
                <p className="pb-1 text-lg font-bold text-ink-400 line-through">
                  ${product.price}
                </p>
              )}
            </div>

            <p className="mt-6 text-base leading-8 text-ink-600">{product.description}</p>

            <div className="mt-8 space-y-7">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-950">
                    Select size
                  </h2>
                  <span className="text-sm font-semibold text-ink-500">
                    US sizing
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-7">
                  {product.availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={[
                        'h-12 rounded-full border text-sm font-bold transition duration-200',
                        selectedSize === size
                          ? 'border-ink-950 bg-ink-950 text-white'
                          : 'border-ink-200 bg-ink-50 text-ink-800 hover:border-ink-950',
                      ].join(' ')}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-950">
                  Color
                </h2>
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={[
                        'rounded-full border px-4 py-2 text-sm font-bold transition duration-200',
                        selectedColor === color
                          ? 'border-ink-950 bg-ink-950 text-white'
                          : 'border-ink-200 bg-ink-50 text-ink-800 hover:border-ink-950',
                      ].join(' ')}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-ink-950">
                    Quantity
                  </h2>
                  <div className="mt-3 inline-flex h-12 items-center rounded-full border border-ink-200 bg-ink-50">
                    <button
                      type="button"
                      onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                      className="grid h-12 w-12 place-items-center text-ink-800 transition duration-200 hover:text-ink-950"
                      aria-label="Decrease quantity"
                    >
                      <FiMinus size={17} />
                    </button>
                    <span className="min-w-10 text-center text-sm font-bold text-ink-950">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((current) => Math.min(product.stock, current + 1))
                      }
                      className="grid h-12 w-12 place-items-center text-ink-800 transition duration-200 hover:text-ink-950"
                      aria-label="Increase quantity"
                    >
                      <FiPlus size={17} />
                    </button>
                  </div>
                </div>
                <p className="text-sm font-semibold text-ink-500">
                  {product.stock} pairs in stock
                </p>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
              <button
                type="button"
                onClick={() => addSelectedProductToCart(false)}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-950 px-5 py-3.5 text-sm font-bold text-ink-950 transition duration-200 hover:bg-ink-950 hover:text-white"
              >
                <FiShoppingBag size={18} />
                <span>Add to cart</span>
              </button>
              <button
                type="button"
                onClick={() => addSelectedProductToCart(true)}
                className="inline-flex items-center justify-center rounded-full bg-ink-950 px-5 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
              >
                Buy now
              </button>
              <button
                type="button"
                onClick={() => {
                  toggleWishlist(product);
                  showInfo(wished ? 'Removed from wishlist' : 'Added to wishlist');
                }}
                className={[
                  'grid h-[50px] w-full place-items-center rounded-full border transition duration-200 hover:border-brass-500 hover:text-brass-700 sm:w-[50px]',
                  wished
                    ? 'border-brass-500 bg-brass-100 text-brass-700'
                    : 'border-ink-200 text-ink-900',
                ].join(' ')}
                aria-label={
                  wished
                    ? `Remove ${product.name} from wishlist`
                    : `Add ${product.name} to wishlist`
                }
              >
                <FiHeart className={wished ? 'fill-current' : ''} size={19} />
              </button>
            </div>

            <div className="mt-8 grid gap-3 border-t border-ink-200 pt-6 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <FiTruck className="mt-1 text-brass-700" size={20} />
                <div>
                  <h3 className="font-bold text-ink-950">Fast dispatch</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">
                    Ships within 48 hours with tracked delivery.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FiShield className="mt-1 text-brass-700" size={20} />
                <div>
                  <h3 className="font-bold text-ink-950">Easy returns</h3>
                  <p className="mt-1 text-sm leading-6 text-ink-600">
                    Try at home with a 30-day return window.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-16">
        <div className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-brass-700">
              Product Notes
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-950">
              Designed for refined everyday wear.
            </h2>
            <p className="mt-4 text-base leading-8 text-ink-600">
              Each pair balances premium materials with dependable construction,
              giving the shoe enough polish for styling and enough support for
              daily movement.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-ink-100 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="grid gap-4">
            {reviews.map((review, index) => (
              <motion.article
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.4, delay: index * 0.06, ease: 'easeOut' }}
                className="rounded-[8px] bg-ink-50 p-5 ring-1 ring-ink-200/70"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-ink-950">{review.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-ink-500">
                      {review.name}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-brass-500">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <FiStar
                        key={starIndex}
                        className={starIndex < review.rating ? 'fill-current' : ''}
                        size={15}
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-ink-600">{review.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-14 sm:py-16">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-brass-700">
              Related Products
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-950">
              More pairs in the rotation.
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-sm font-bold text-ink-600 transition duration-200 hover:text-ink-950"
          >
            View full catalog
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((item, index) => (
            <ProductCard key={item.id} product={item} index={index} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default ProductDetails;
