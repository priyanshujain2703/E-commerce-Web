import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function CategoryCard({ category, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="group overflow-hidden rounded-[8px] bg-white ring-1 ring-ink-200/70"
    >
      <Link to={`/shop?category=${category.id}`} className="block">
        <div className="aspect-[5/4] overflow-hidden bg-ink-100">
          <img
            src={category.image}
            alt={`${category.name} shoes`}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
        <div className="flex items-center justify-between gap-4 p-5">
          <div>
            <h3 className="text-lg font-bold text-ink-950">{category.name}</h3>
            <p className="mt-1 text-sm font-medium text-ink-500">{category.count}</p>
          </div>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink-100 text-ink-900 transition duration-200 group-hover:bg-ink-950 group-hover:text-white">
            <FiArrowRight size={18} />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}

export default CategoryCard;
