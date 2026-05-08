import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link, useSearchParams } from 'react-router-dom';

import ProductCard from '../components/product/ProductCard.jsx';
import ShopFilters from '../components/shop/ShopFilters.jsx';
import { useStore } from '../context/StoreContext.jsx';
import products from '../data/products.json';

const categoryAliases = {
  men: 'All',
  women: 'All',
  signature: 'All',
};

function ProductList() {
  const { state, dispatch } = useStore();
  const [searchParams] = useSearchParams();
  const filters = state.shopFilters;

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))].sort(),
    [],
  );

  const maxAvailablePrice = useMemo(
    () => Math.ceil(Math.max(...products.map((product) => product.price)) / 5) * 5,
    [],
  );

  useEffect(() => {
    const categoryParam = searchParams.get('category');

    if (!categoryParam) {
      return;
    }

    const normalizedCategory =
      categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
    const category = categories.includes(normalizedCategory)
      ? normalizedCategory
      : categoryAliases[categoryParam.toLowerCase()] || 'All';

    dispatch({
      type: 'SET_SHOP_FILTER',
      payload: { name: 'category', value: category },
    });
  }, [categories, dispatch, searchParams]);

  function handleFilterChange(name, value) {
    dispatch({
      type: 'SET_SHOP_FILTER',
      payload: { name, value },
    });
  }

  function handleReset() {
    dispatch({ type: 'RESET_SHOP_FILTERS' });
  }

  const filteredProducts = useMemo(() => {
    const searchValue = filters.search.trim().toLowerCase();

    return products
      .filter((product) => {
        const matchesSearch =
          !searchValue ||
          [
            product.name,
            product.brand,
            product.category,
            product.description,
            ...product.tags,
          ]
            .join(' ')
            .toLowerCase()
            .includes(searchValue);

        const matchesCategory =
          filters.category === 'All' || product.category === filters.category;
        const matchesPrice = (product.discountPrice || product.price) <= filters.maxPrice;

        return matchesSearch && matchesCategory && matchesPrice;
      })
      .sort((first, second) => {
        if (filters.sortBy === 'price-low-high') {
          return (first.discountPrice || first.price) - (second.discountPrice || second.price);
        }

        if (filters.sortBy === 'price-high-low') {
          return (second.discountPrice || second.price) - (first.discountPrice || first.price);
        }

        if (filters.sortBy === 'popularity') {
          return second.reviewCount - first.reviewCount;
        }

        return products.indexOf(first) - products.indexOf(second);
      });
  }, [filters]);

  return (
    <div className="bg-ink-50">
      <section className="border-b border-ink-200 bg-white">
        <div className="page-shell py-12 sm:py-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="max-w-3xl"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-brass-700">
              Shop Premium Shoes
            </p>
            <h1 className="mt-4 font-display text-4xl font-bold text-ink-950 sm:text-5xl">
              Performance pairs with a luxury finish.
            </h1>
            <p className="mt-5 text-base leading-7 text-ink-600">
              Browse runners, trainers, court staples, trail shoes, and refined
              lifestyle silhouettes from premium footwear labels.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="page-shell py-10 sm:py-12">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          <ShopFilters
            categories={categories}
            filters={filters}
            maxAvailablePrice={maxAvailablePrice}
            onFilterChange={handleFilterChange}
            onReset={handleReset}
            resultCount={filteredProducts.length}
          />

          <div>
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-ink-500">Curated catalog</p>
                <h2 className="text-2xl font-bold text-ink-950">
                  {filteredProducts.length} matching styles
                </h2>
              </div>
              <Link
                to="/"
                className="inline-flex w-fit items-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-bold text-ink-900 transition duration-200 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
              >
                <span>Back to home</span>
                <FiArrowRight size={16} />
              </Link>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  className="rounded-[8px] bg-white p-10 text-center shadow-soft ring-1 ring-ink-200/70"
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-700">
                    No Results
                  </p>
                  <h3 className="mt-3 text-2xl font-bold text-ink-950">
                    Try a broader search.
                  </h3>
                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-ink-600">
                    Adjust the category, raise the price range, or clear the search field
                    to see more premium styles.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="mt-6 rounded-full bg-ink-950 px-5 py-3 text-sm font-bold text-white transition duration-200 hover:bg-brass-500 hover:text-ink-950"
                  >
                    Reset Filters
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductList;
