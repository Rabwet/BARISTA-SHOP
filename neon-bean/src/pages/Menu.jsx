import { useState, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import menuData from '../data/menu.json';
import MenuCard from '../components/menu/MenuCard';
import CategoryTabs from '../components/menu/CategoryTabs';
import SearchBox from '../components/menu/SearchBox';
import '../styles/components/Menu.css';

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'hot', label: 'Hot Coffee' },
  { id: 'cold', label: 'Cold Brews' },
  { id: 'pastry', label: 'Artisan Pastries' },
];

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return menuData.filter((item) => {
      const matchesCategory =
        activeCategory === 'all' || item.category === activeCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="menu-page">
      <div className="container">
        {/* Header */}
        <header className="menu-page__header">
          <h1 className="menu-page__title">Our Craft Menu</h1>
          <p>
            Every single beverage is calibrated to order using Kenyan specialty Arabica beans and steam-foamed farm milk.
          </p>
        </header>

        {/* Filters & Search */}
        <div className="menu-page__filters">
          <CategoryTabs
            categories={CATEGORIES}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
          <SearchBox
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
          />
        </div>

        {/* Item Count */}
        <div className="menu-page__count">
          Showing <strong>{filteredItems.length}</strong> {filteredItems.length === 1 ? 'item' : 'items'}
          {searchQuery && ` matching "${searchQuery}"`}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length > 0 ? (
          <div className="menu-page__grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="menu-page__empty glass-card">
            <p>No coffee or treats match your search criteria.</p>
            <button
              type="button"
              className="btn-secondary btn-sm"
              style={{ marginTop: 'var(--space-md)' }}
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
