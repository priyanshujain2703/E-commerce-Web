import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';

function TestimonialCard({ testimonial, index = 0 }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
      className="rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70"
    >
      <div className="flex items-center gap-1 text-brass-500">
        {Array.from({ length: 5 }).map((_, starIndex) => (
          <FiStar key={starIndex} className="fill-current" size={15} />
        ))}
      </div>
      <p className="mt-5 text-base leading-7 text-ink-700">
        &quot;{testimonial.quote}&quot;
      </p>
      <div className="mt-6">
        <h3 className="font-bold text-ink-950">{testimonial.name}</h3>
        <p className="mt-1 text-sm font-medium text-ink-500">{testimonial.role}</p>
      </div>
    </motion.article>
  );
}

export default TestimonialCard;
