import { FiShoppingBag } from 'react-icons/fi';

import Button from './Button.jsx';

function EmptyState({
  actionLabel,
  actionTo,
  description,
  icon,
  onAction,
  title,
}) {
  return (
    <div className="mx-auto max-w-2xl rounded-[8px] bg-white p-8 text-center shadow-soft ring-1 ring-ink-200/70 sm:p-12">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-ink-100 text-ink-950">
        {icon || <FiShoppingBag size={26} />}
      </div>
      <h2 className="mt-6 font-display text-4xl font-bold text-ink-950">{title}</h2>
      {description && (
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink-600">
          {description}
        </p>
      )}
      {actionLabel && (
        <Button
          className="mt-8"
          onClick={onAction}
          to={actionTo}
          variant="primary"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
