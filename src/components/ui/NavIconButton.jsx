import { Link } from 'react-router-dom';

function NavIconButton({ count = 0, icon, label, to }) {
  const className =
    'relative grid h-11 w-11 place-items-center rounded-full border border-ink-200 bg-white text-ink-900 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-ink-300 hover:bg-ink-100';

  const content = (
    <>
      <span aria-hidden="true">{icon}</span>
      <span className="sr-only">{label}</span>
      {count > 0 && (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-brass-500 px-1 text-[11px] font-bold leading-none text-ink-950 ring-2 ring-ink-50">
          {count > 99 ? '99+' : count}
        </span>
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={className} aria-label={label}>
        {content}
      </Link>
    );
  }

  return (
    <button type="button" className={className} aria-label={label}>
      {content}
    </button>
  );
}

export default NavIconButton;
