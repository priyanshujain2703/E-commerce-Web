import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function CartItem({ item, itemKey, onRemove, onUpdateQuantity }) {
  const activePrice = item.discountPrice || item.price;

  return (
    <article className="grid gap-4 rounded-[8px] bg-white p-4 shadow-soft ring-1 ring-ink-200/70 sm:grid-cols-[132px_1fr] sm:p-5">
      <Link
        to={`/products/${item.id}`}
        className="aspect-square overflow-hidden rounded-[8px] bg-ink-100"
      >
        <img
          src={item.image || item.images?.[0]}
          alt={item.name}
          className="h-full w-full object-cover transition duration-500 hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-col justify-between gap-5">
        <div className="flex gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-ink-500">
              {item.brand}
            </p>
            <Link
              to={`/products/${item.id}`}
              className="mt-1 block text-xl font-bold text-ink-950 transition duration-200 hover:text-brass-700"
            >
              {item.name}
            </Link>
            <div className="mt-3 flex flex-wrap gap-2 text-sm font-semibold text-ink-600">
              {item.selectedSize && (
                <span className="rounded-full bg-ink-100 px-3 py-1">
                  Size {item.selectedSize}
                </span>
              )}
              {item.selectedColor && (
                <span className="rounded-full bg-ink-100 px-3 py-1">
                  {item.selectedColor}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={() => onRemove(itemKey)}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-600 transition duration-200 hover:border-red-300 hover:bg-red-50 hover:text-red-600"
            aria-label={`Remove ${item.name} from cart`}
          >
            <FiTrash2 size={17} />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex h-11 items-center rounded-full border border-ink-200 bg-ink-50">
            <button
              type="button"
              onClick={() => onUpdateQuantity(itemKey, item.quantity - 1)}
              className="grid h-11 w-11 place-items-center text-ink-700 transition duration-200 hover:text-ink-950"
              aria-label="Decrease quantity"
            >
              <FiMinus size={16} />
            </button>
            <span className="min-w-10 text-center text-sm font-bold text-ink-950">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={() => onUpdateQuantity(itemKey, item.quantity + 1)}
              className="grid h-11 w-11 place-items-center text-ink-700 transition duration-200 hover:text-ink-950"
              aria-label="Increase quantity"
            >
              <FiPlus size={16} />
            </button>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-ink-950">
              ${(activePrice * item.quantity).toFixed(2)}
            </p>
            {item.discountPrice && item.discountPrice < item.price && (
              <p className="text-sm font-semibold text-ink-400 line-through">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default CartItem;
