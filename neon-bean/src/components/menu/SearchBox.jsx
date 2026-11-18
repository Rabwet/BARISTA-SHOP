import '../../styles/components/SearchBox.css';

/**
 * SearchBox — Search input field styled with neon and glass aesthetics.
 *
 * @param {string} value
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange
 * @param {() => void} onClear
 * @param {string} [placeholder]
 */
export default function SearchBox({
  value,
  onChange,
  onClear,
  placeholder = 'Search coffees, cold brews, pastries...',
}) {
  return (
    <div className="search-box">
      {/* Search icon */}
      <svg
        className="search-box__icon"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="search"
        className="glass-input search-box__input"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-label="Search menu"
      />

      {value && (
        <button
          type="button"
          className="search-box__clear"
          onClick={onClear}
          aria-label="Clear search query"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}

