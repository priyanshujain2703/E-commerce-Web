import { FiShoppingBag, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function WishlistItem({ item, onAddToCart, onRemove }) {
  const activePrice = item.discountPrice || item.price;

  return (
    <article className="group overflow-hidden rounded-[8px] bg-white shadow-soft ring-1 ring-ink-200/70">
      <Link to={`/products/${item.id}`} className="block">
        <div className="aspect-[4/5] overflow-hidden bg-ink-100">
          <img
            src={item.image || item.images?.[0]}
            alt={item.name}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink-500">
          {item.brand}
        </p>
        <div className="mt-2 flex items-start justify-between gap-4">
          <div>
            <Link
              to={`/products/${item.id}`}
              className="text-lg font-bold text-ink-950 transition duration-200 hover:text-brass-700"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-sm font-semibold text-ink-500">{item.category}</p>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-ink-950">${activePrice}</p>
            {item.discountPrice && item.discountPrice < item.price && (
              <p className="text-sm font-semibold text-ink-400 line-through">
                ${item.price}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <button
            type="button"
            onClick={() => onAddToCart(item)}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink-950 px-4 py-3 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
          >
            <FiShoppingBag size={17} />
            <span>Add to cart</span>
          </button>
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="grid h-12 w-12 place-items-center rounded-full border border-ink-200 text-ink-700 transition duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            aria-label={`Remove ${item.name} from wishlist`}
          >
            <FiTrash2 size={17} />
          </button>
        </div>
      </div>
    </article>
  );
}

export default WishlistItem;
