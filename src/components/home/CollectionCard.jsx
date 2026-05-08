import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function CollectionCard({ collection, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
      className="group relative min-h-[420px] overflow-hidden rounded-[8px] bg-ink-900"
    >
      <img
        src={collection.image}
        alt={collection.title}
        className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105 group-hover:opacity-95"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />

      <div className="relative flex h-full min-h-[420px] flex-col justify-end p-6 text-white sm:p-8">
        <p className="text-xs font-bold uppercase tracking-[0.26em] text-brass-300">
          Collection
        </p>
        <h3 className="mt-3 font-display text-3xl font-bold">{collection.title}</h3>
        <p className="mt-3 max-w-xs text-sm leading-6 text-ink-100">{collection.subtitle}</p>
        <Link
          to={collection.path}
          className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2.5 text-sm font-bold text-ink-950 transition duration-200 hover:bg-brass-300"
        >
          <span>Explore</span>
          <FiArrowUpRight size={17} />
        </Link>
      </div>
    </motion.article>
  );
}

export default CollectionCard;
