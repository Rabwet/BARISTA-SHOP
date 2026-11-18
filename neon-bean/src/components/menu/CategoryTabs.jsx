import { motion } from 'framer-motion';
import '../../styles/components/CategoryTabs.css';

/**
 * CategoryTabs — Pill-shaped category filter tabs with an animated neon active indicator.
 *
 * @param {Array<{id: string, label: string}>} categories
 * @param {string} activeCategory
 * @param {(id: string) => void} onSelectCategory
 */
export default function CategoryTabs({ categories, activeCategory, onSelectCategory }) {
  return (
    <div className="category-tabs" role="tablist" aria-label="Menu categories">
      {categories.map((cat) => {
        const isActive = activeCategory === cat.id;
        return (
          <button
            key={cat.id}
            role="tab"
            aria-selected={isActive}
            className={`category-tab${isActive ? ' category-tab--active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            {cat.label}
            {isActive && (
              <motion.span
                className="category-tab__indicator"
                layoutId="category-indicator"
                transition={{ type: 'spring', stiffness: 450, damping: 32 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}

