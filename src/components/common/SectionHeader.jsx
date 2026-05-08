import { motion } from 'framer-motion';

function SectionHeader({ eyebrow, title, description, align = 'left' }) {
  const isCentered = align === 'center';

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className={isCentered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl font-bold tracking-normal text-ink-950 sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-ink-600">{description}</p>
      )}
    </motion.div>
  );
}

export default SectionHeader;
