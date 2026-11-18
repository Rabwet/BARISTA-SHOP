import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useToast } from '../common/Toast';
import { CURRENCY_SYMBOL } from '../../constants';
import SizeSelector from './SizeSelector';
import '../../styles/components/MenuCard.css';

/**
 * MenuCard — Card representation for an individual coffee or pastry item.
 *
 * @param {{
 *   id: string,
 *   name: string,
 *   description: string,
 *   price: number,
 *   category: 'hot' | 'cold' | 'pastry',
 *   image?: string,
 *   sizes?: Array<{ label: string, priceModifier: number }>
 * }} item
 */
export default function MenuCard({ item }) {
  const { dispatch } = useCart();
  const { addToast } = useToast();

  const defaultSize = item.sizes?.[0]?.label || 'Standard';
  const [selectedSize, setSelectedSize] = useState(defaultSize);

  const activeSizeObj = item.sizes?.find((s) => s.label === selectedSize);
  const currentPrice = item.price + (activeSizeObj?.priceModifier || 0);

  const initials = item.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const categoryModifier =
    item.category === 'hot'
      ? 'menu-card__image--hot'
      : item.category === 'cold'
      ? 'menu-card__image--cold'
      : 'menu-card__image--pastry';

  function handleAddToCart() {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: item.id,
        name: item.name,
        size: selectedSize,
        price: currentPrice,
        image: item.image,
      },
    });
    addToast(`Added ${item.name} (${selectedSize}) to cart!`, 'success');
  }

  return (
    <motion.article
      className="glass-card menu-card"
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      {/* Visual / Image area */}
      <div className={`menu-card__image ${categoryModifier}`}>
        <span className="menu-card__initials">{initials}</span>
      </div>

      {/* Content description */}
      <div className="menu-card__content">
        <h3 className="menu-card__name">{item.name}</h3>
        <p className="menu-card__description">{item.description}</p>
        <div className="menu-card__price">
          {CURRENCY_SYMBOL} {currentPrice.toLocaleString()}
        </div>
      </div>

      {/* Interactive controls */}
      <div className="menu-card__footer">
        {item.sizes && item.sizes.length > 1 && (
          <SizeSelector
            sizes={item.sizes}
            selectedSize={selectedSize}
            onSelectSize={setSelectedSize}
          />
        )}
        <button
          type="button"
          className="btn-primary menu-card__add-btn"
          onClick={handleAddToCart}
          aria-label={`Add ${item.name} (${selectedSize}) to cart`}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add to Cart
        </button>
      </div>
    </motion.article>
  );
}

