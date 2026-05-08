import { FiInstagram, FiMail, FiMapPin, FiTwitter } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const footerLinks = {
  Shop: ['New Arrivals', 'Signature Collection', 'Men', 'Women'],
  Support: ['Contact', 'Shipping', 'Returns', 'Care Guide'],
  Brand: ['Journal', 'Craft', 'Sustainability', 'Stores'],
};

function Footer() {
  return (
    <footer className="border-t border-ink-200 bg-ink-950 text-white">
      <div className="page-shell py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-brass-500 text-sm font-semibold uppercase tracking-[0.18em] text-ink-950">
                AT
              </span>
              <span>
                <span className="block font-display text-2xl font-bold">Aureus Tread</span>
                <span className="mt-1 block text-xs font-semibold uppercase tracking-[0.24em] text-ink-300">
                  Premium Footwear
                </span>
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-ink-300">
              Sculpted footwear essentials made for refined movement, quiet confidence,
              and everyday polish.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="mailto:hello@aureustread.com"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-200 transition duration-200 hover:border-brass-500 hover:text-brass-300"
                aria-label="Email Aureus Tread"
              >
                <FiMail size={18} />
              </a>
              <a
                href="https://instagram.com"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-200 transition duration-200 hover:border-brass-500 hover:text-brass-300"
                aria-label="Aureus Tread on Instagram"
              >
                <FiInstagram size={18} />
              </a>
              <a
                href="https://twitter.com"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-ink-200 transition duration-200 hover:border-brass-500 hover:text-brass-300"
                aria-label="Aureus Tread on X"
              >
                <FiTwitter size={18} />
              </a>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h2 className="text-sm font-semibold uppercase tracking-[0.22em] text-ink-400">
                  {title}
                </h2>
                <ul className="mt-4 space-y-3">
                  {links.map((link) => (
                    <li key={link}>
                      <Link
                        to="/shop"
                        className="text-sm text-ink-200 transition duration-200 hover:text-brass-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-sm text-ink-400 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Aureus Tread. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <FiMapPin size={16} />
            Designed for premium retail worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
