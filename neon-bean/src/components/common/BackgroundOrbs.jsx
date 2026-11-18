/**
 * BackgroundOrbs — ambient floating gradient orbs behind all page content.
 *
 * Four large, blurred circles drift slowly to create a warm,
 * atmospheric backdrop. Animation stops for users who prefer
 * reduced motion.
 */
import '../../styles/components/BackgroundOrbs.css';

export default function BackgroundOrbs() {
  return (
    <div className="background-orbs" aria-hidden="true">
      {/* Warm beige orb — top-left */}
      <div className="orb orb--beige-1" />

      {/* Warm beige orb — bottom-right */}
      <div className="orb orb--beige-2" />

      {/* Neon-green accent orb — mid-right, very subtle */}
      <div className="orb orb--neon" />

      {/* Deep cocoa orb — center-left */}
      <div className="orb orb--cocoa" />
    </div>
  );
}
