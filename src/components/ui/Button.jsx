import { Link } from 'react-router-dom';

const variantClasses = {
  primary:
    'bg-ink-950 text-white hover:bg-brass-500 hover:text-ink-950 border border-ink-950',
  secondary:
    'bg-white text-ink-950 hover:bg-ink-100 border border-ink-200 hover:border-ink-300',
  outline:
    'bg-transparent text-ink-950 hover:bg-ink-950 hover:text-white border border-ink-300 hover:border-ink-950',
  ghost:
    'bg-transparent text-ink-700 hover:bg-ink-100 hover:text-ink-950 border border-transparent',
  danger:
    'bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 hover:border-red-300',
};

const sizeClasses = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-[48px] px-5 text-sm',
  lg: 'h-[52px] px-6 text-base',
};

function Button({
  children,
  className = '',
  disabled = false,
  fullWidth = false,
  iconLeft,
  iconRight,
  isLoading = false,
  size = 'md',
  to,
  type = 'button',
  variant = 'primary',
  ...props
}) {
  const classes = [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-bold transition duration-200 focus:outline-none focus:ring-2 focus:ring-ink-950/20 disabled:cursor-not-allowed disabled:opacity-70',
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  const content = (
    <>
      {isLoading ? (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      ) : (
        iconLeft
      )}
      <span>{children}</span>
      {!isLoading && iconRight}
    </>
  );

  if (to) {
    return (
      <Link className={classes} to={to} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || isLoading} type={type} {...props}>
      {content}
    </button>
  );
}

export default Button;
