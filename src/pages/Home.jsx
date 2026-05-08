import { motion } from 'framer-motion';
import { FiArrowRight, FiCheck, FiMail, FiShoppingBag } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import SectionHeader from '../components/common/SectionHeader.jsx';
import CategoryCard from '../components/home/CategoryCard.jsx';
import CollectionCard from '../components/home/CollectionCard.jsx';
import TestimonialCard from '../components/home/TestimonialCard.jsx';
import ProductCard from '../components/product/ProductCard.jsx';
import {
  categories,
  featuredCollections,
  testimonials,
  trendingProducts,
} from '../data/homeData.js';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

function Home() {
  function handleNewsletterSubmit(event) {
    event.preventDefault();
    toast.success('You are on the early access list');
    event.currentTarget.reset();
  }

  return (
    <>
      <section className="relative overflow-hidden bg-ink-950 text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=1800&q=88"
            alt="Premium white sneakers on a refined studio background"
            className="h-full w-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/75 to-ink-950/10" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-ink-950 to-transparent" />
        </div>

        <div className="page-shell relative flex min-h-[calc(100vh-80px)] items-center py-16 sm:py-20 lg:min-h-[720px]">
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.1 }}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="text-xs font-bold uppercase tracking-[0.3em] text-brass-300"
            >
              Spring Performance Edit
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="mt-5 font-display text-5xl font-bold tracking-normal sm:text-6xl lg:text-7xl"
            >
              Premium shoes built for motion and presence.
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-base leading-8 text-ink-100 sm:text-lg"
            >
              Discover sculpted sneakers, runners, and court staples designed with
              technical comfort and elevated materials.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-bold text-ink-950 transition duration-200 hover:bg-brass-300"
              >
                <FiShoppingBag size={18} />
                <span>Shop New Arrivals</span>
              </Link>
              <Link
                to="/shop?collection=signature"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 text-sm font-bold text-white backdrop-blur transition duration-200 hover:border-white hover:bg-white/10"
              >
                <span>Explore Collection</span>
                <FiArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-white/15 pt-6"
            >
              {['Free returns', 'Hand-finished', '48h dispatch'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm font-semibold text-ink-100">
                  <FiCheck className="shrink-0 text-brass-300" size={17} />
                  <span>{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <SectionHeader
          eyebrow="Featured Collections"
          title="Built around your pace."
          description="Three focused lines, each shaped for a different rhythm of premium everyday wear."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredCollections.map((collection, index) => (
            <CollectionCard key={collection.id} collection={collection} index={index} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="page-shell">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <SectionHeader
              eyebrow="Trending Now"
              title="Current favorites."
              description="Sharp silhouettes, cushioned builds, and a finish that holds up close."
            />
            <Link
              to="/shop"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 px-5 py-3 text-sm font-bold text-ink-900 transition duration-200 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
            >
              <span>View all</span>
              <FiArrowRight size={17} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {trendingProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <SectionHeader
          eyebrow="Shop By Category"
          title="Find the pair for the moment."
          description="From daily mileage to polished off-duty rotation, every category is tuned for a specific use."
          align="center"
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>

      <section className="page-shell pb-16 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative overflow-hidden rounded-[8px] bg-ink-950 px-6 py-12 text-white sm:px-10 lg:px-14"
        >
          <img
            src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=1400&q=88"
            alt="Premium sneakers arranged for a seasonal promotion"
            className="absolute inset-0 h-full w-full object-cover opacity-35"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/90 to-ink-950/35" />
          <div className="relative max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-300">
              Private Access
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
              Take 20% off your first signature pair.
            </h2>
            <p className="mt-5 text-base leading-7 text-ink-100">
              Join the early list for seasonal releases, members-only sizing, and
              priority access to limited colorways.
            </p>
            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-brass-500 px-6 py-3.5 text-sm font-bold text-ink-950 transition duration-200 hover:bg-white"
            >
              <span>Claim Offer</span>
              <FiArrowRight size={18} />
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="bg-ink-100 py-16 sm:py-20">
        <div className="page-shell">
          <SectionHeader
            eyebrow="What Customers Say"
            title="Worn by people who notice details."
            description="Realistic comfort, refined styling, and dependable construction are the notes customers keep coming back to."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell py-16 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="grid gap-8 rounded-[8px] bg-white p-6 shadow-soft ring-1 ring-ink-200/70 md:grid-cols-[1fr_1.1fr] md:p-8 lg:p-10"
        >
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
              Newsletter
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold text-ink-950 sm:text-4xl">
              Get first look at every drop.
            </h2>
            <p className="mt-4 text-base leading-7 text-ink-600">
              No clutter. Just release notes, private offers, and styling edits worth opening.
            </p>
          </div>

          <form
            className="flex flex-col justify-center gap-3 sm:flex-row md:items-center"
            onSubmit={handleNewsletterSubmit}
          >
            <label className="sr-only" htmlFor="newsletter-email">
              Email address
            </label>
            <div className="relative flex-1">
              <FiMail
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
                size={18}
              />
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@example.com"
                className="h-[52px] w-full rounded-full border border-ink-200 bg-ink-50 py-3.5 pl-11 pr-4 text-sm font-medium text-ink-950 outline-none transition duration-200 placeholder:text-ink-400 focus:border-ink-950 focus:bg-white"
              />
            </div>
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-full bg-ink-950 px-6 py-3.5 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
            >
              Sign Up
            </button>
          </form>
        </motion.div>
      </section>
    </>
  );
}

export default Home;
