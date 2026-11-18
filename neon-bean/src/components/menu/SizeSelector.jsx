import { CURRENCY_SYMBOL } from '../../constants';
import '../../styles/components/SizeSelector.css';

/**
 * SizeSelector — Pill options for selecting drink/item sizes.
 *
 * @param {Array<{label: string, priceModifier: number}>} sizes
 * @param {string} selectedSize
 * @param {(size: string) => void} onSelectSize
 */
export default function SizeSelector({ sizes, selectedSize, onSelectSize }) {
  if (!sizes || sizes.length <= 1) return null;

  return (
    <div className="size-selector" role="radiogroup" aria-label="Select size">
      {sizes.map((size) => {
        const isSelected = selectedSize === size.label;
        return (
          <button
            key={size.label}
            type="button"
            role="radio"
            aria-checked={isSelected}
            className={`size-selector__option${
              isSelected ? ' size-selector__option--selected' : ''
            }`}
            onClick={() => onSelectSize(size.label)}
          >
            <span>{size.label}</span>
            {size.priceModifier > 0 && (
              <span className="size-selector__modifier">
                (+{CURRENCY_SYMBOL} {size.priceModifier})
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

