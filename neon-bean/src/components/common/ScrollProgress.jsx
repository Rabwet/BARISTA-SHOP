/**
 * ScrollProgress — thin neon bar at the top of the viewport
 * whose width reflects how far the user has scrolled.
 */
import { useScrollProgress } from '../../hooks/useScrollProgress';
import '../../styles/components/ScrollProgress.css';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
      style={{ width: `${progress * 100}%` }}
    />
  );
}
