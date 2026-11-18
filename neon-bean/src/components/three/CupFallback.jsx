import '../../styles/components/CupFallback.css';

/**
 * CupFallback — CSS-only coffee cup visualization used as a fallback
 * for React.Suspense when the 3D Canvas is loading or if WebGL is unavailable.
 */
export default function CupFallback() {
  return (
    <div className="cup-fallback" aria-label="Stylized coffee cup graphic">
      <div className="cup-fallback__shape">
        <div className="cup-fallback__saucer" />
        <div className="cup-fallback__body">
          <div className="cup-fallback__coffee" />
          <div className="cup-fallback__rim" />
        </div>
        <div className="cup-fallback__handle" />
        <div className="cup-fallback__steam">
          <div className="cup-fallback__wisp" />
          <div className="cup-fallback__wisp" />
          <div className="cup-fallback__wisp" />
        </div>
      </div>
    </div>
  );
}

