/**
 * PageTransition — Framer Motion wrapper for page-level
 * enter/exit animations.
 *
 * Usage:
 *   <AnimatePresence mode="wait">
 *     <PageTransition key={location.pathname}>
 *       <Outlet />
 *     </PageTransition>
 *   </AnimatePresence>
 *
 * Respects prefers-reduced-motion: when enabled,
 * the component renders children without animation.
 */
import { motion } from 'framer-motion';
import { useReducedMotion } from '../../hooks/useReducedMotion';

export default function PageTransition({ children }) {
  const prefersReduced = useReducedMotion();

  /* Skip animation entirely for reduced-motion users */
  if (prefersReduced) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
