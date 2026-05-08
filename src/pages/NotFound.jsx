import { motion } from 'framer-motion';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page-shell grid min-h-[calc(100vh-80px)] place-items-center py-16">
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="mx-auto max-w-2xl text-center"
      >
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white text-ink-950 shadow-soft ring-1 ring-ink-200">
          <FiSearch size={25} />
        </div>
        <p className="mt-6 text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
          404
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
          This page stepped out of frame.
        </h1>
        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-ink-600">
          The route you opened does not exist. Head back to the shop and keep browsing
          the collection.
        </p>
        <Link
          to="/shop"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 px-6 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
        >
          <FiArrowLeft size={17} />
          <span>Back to shop</span>
        </Link>
      </motion.div>
    </section>
  );
}

export default NotFound;
