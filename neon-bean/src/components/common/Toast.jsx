/**
 * Toast notification system.
 *
 * Provides a ToastProvider context and useToast hook so any
 * component can fire glass-styled notifications at the
 * bottom-right of the screen.
 *
 * Usage:
 *   const { addToast } = useToast();
 *   addToast('Item added!', 'success');
 */
import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import '../../styles/components/Toast.css';

/* ---------- Context ---------- */
const ToastContext = createContext(null);

/** Hook to trigger toasts from any component */
export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

/* ---------- Icon helpers ---------- */
function SuccessIcon() {
  return (
    <svg
      className="toast__icon--success"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M6 10.5l2.5 2.5L14 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ErrorIcon() {
  return (
    <svg
      className="toast__icon--error"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 7l6 6M13 7l-6 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ---------- Single toast ---------- */
function ToastItem({ id, message, type, onRemove }) {
  return (
    <motion.div
      className={`toast toast--${type}`}
      role="status"
      aria-live="polite"
      layout
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onRemove(id)}
      style={{ cursor: 'pointer' }}
    >
      {type === 'success' ? <SuccessIcon /> : <ErrorIcon />}
      <span className="toast__message">{message}</span>
    </motion.div>
  );
}

/* ---------- Provider ---------- */
export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const idCounter = useRef(0);

  /** Add a toast — auto-dismisses after `duration` ms (default 3000) */
  const addToast = useCallback((message, type = 'success', duration = 3000) => {
    const id = ++idCounter.current;
    setToasts((prev) => [...prev, { id, message, type }]);

    // Auto-dismiss
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  /** Manually remove a toast by id */
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      {/* Toast container renders via portal-like fixed positioning */}
      <div className="toast-container" aria-label="Notifications">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <ToastItem
              key={toast.id}
              {...toast}
              onRemove={removeToast}
            />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}
