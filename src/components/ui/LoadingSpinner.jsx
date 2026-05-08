function LoadingSpinner({
  label = 'Loading',
  size = 'md',
  tone = 'dark',
  showLabel = true,
}) {
  const sizeClasses = {
    sm: 'h-5 w-5 border-2',
    md: 'h-8 w-8 border-2',
    lg: 'h-12 w-12 border-[3px]',
  };

  const toneClasses = {
    dark: 'border-ink-200 border-t-ink-950',
    light: 'border-white/30 border-t-white',
    brass: 'border-brass-100 border-t-brass-700',
  };

  return (
    <div className="inline-flex items-center justify-center gap-3">
      <span
        className={[
          'animate-spin rounded-full',
          sizeClasses[size],
          toneClasses[tone],
        ].join(' ')}
        aria-hidden="true"
      />
      {showLabel && (
        <span className="text-sm font-bold uppercase tracking-[0.18em] text-ink-500">
          {label}
        </span>
      )}
    </div>
  );
}

export default LoadingSpinner;
