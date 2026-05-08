import { FiRefreshCw, FiSearch, FiSliders } from 'react-icons/fi';

const sortOptions = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price low-high', value: 'price-low-high' },
  { label: 'Price high-low', value: 'price-high-low' },
  { label: 'Popularity', value: 'popularity' },
];

function ShopFilters({
  categories,
  filters,
  maxAvailablePrice,
  onFilterChange,
  onReset,
  resultCount,
}) {
  return (
    <aside className="rounded-[8px] bg-white p-5 shadow-soft ring-1 ring-ink-200/70 lg:sticky lg:top-28">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-brass-700">
            Filters
          </p>
          <h2 className="mt-1 text-xl font-bold text-ink-950">Refine shoes</h2>
        </div>
        <FiSliders className="text-ink-500" size={20} />
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <label
            htmlFor="shop-search"
            className="text-sm font-bold text-ink-950"
          >
            Search
          </label>
          <div className="relative mt-2">
            <FiSearch
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400"
              size={18}
            />
            <input
              id="shop-search"
              type="search"
              value={filters.search}
              onChange={(event) => onFilterChange('search', event.target.value)}
              placeholder="Search by shoe, brand, tag"
              className="h-[48px] w-full rounded-full border border-ink-200 bg-ink-50 pl-11 pr-4 text-sm font-medium text-ink-950 outline-none transition duration-200 placeholder:text-ink-400 focus:border-ink-950 focus:bg-white"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="shop-category"
            className="text-sm font-bold text-ink-950"
          >
            Category
          </label>
          <select
            id="shop-category"
            value={filters.category}
            onChange={(event) => onFilterChange('category', event.target.value)}
            className="mt-2 h-[48px] w-full rounded-full border border-ink-200 bg-ink-50 px-4 text-sm font-bold text-ink-900 outline-none transition duration-200 focus:border-ink-950 focus:bg-white"
          >
            <option value="All">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <div className="flex items-center justify-between gap-4">
            <label
              htmlFor="shop-price"
              className="text-sm font-bold text-ink-950"
            >
              Max price
            </label>
            <span className="rounded-full bg-ink-100 px-3 py-1 text-sm font-bold text-ink-900">
              ${filters.maxPrice}
            </span>
          </div>
          <input
            id="shop-price"
            type="range"
            min="80"
            max={maxAvailablePrice}
            step="5"
            value={filters.maxPrice}
            onChange={(event) => onFilterChange('maxPrice', Number(event.target.value))}
            className="mt-4 h-2 w-full accent-ink-950"
          />
          <div className="mt-2 flex justify-between text-xs font-semibold text-ink-500">
            <span>$80</span>
            <span>${maxAvailablePrice}</span>
          </div>
        </div>

        <div>
          <label htmlFor="shop-sort" className="text-sm font-bold text-ink-950">
            Sort by
          </label>
          <select
            id="shop-sort"
            value={filters.sortBy}
            onChange={(event) => onFilterChange('sortBy', event.target.value)}
            className="mt-2 h-[48px] w-full rounded-full border border-ink-200 bg-ink-50 px-4 text-sm font-bold text-ink-900 outline-none transition duration-200 focus:border-ink-950 focus:bg-white"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-ink-200 pt-5">
        <p className="text-sm font-semibold text-ink-600">
          {resultCount} {resultCount === 1 ? 'result' : 'results'}
        </p>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 rounded-full border border-ink-200 px-4 py-2 text-sm font-bold text-ink-900 transition duration-200 hover:border-ink-950 hover:bg-ink-950 hover:text-white"
        >
          <FiRefreshCw size={15} />
          <span>Reset</span>
        </button>
      </div>
    </aside>
  );
}

export default ShopFilters;
