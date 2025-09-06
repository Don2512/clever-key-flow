// Suppress benign Chrome ResizeObserver console errors that occur when libraries adjust layout during observation.
// This does NOT hide real errors; it only filters the specific noisy messages.
if (typeof window !== 'undefined') {
  const shouldIgnore = (msg: string | undefined) =>
    !!msg && (
      msg.includes('ResizeObserver loop completed with undelivered notifications') ||
      msg.includes('ResizeObserver loop limit exceeded') ||
      msg.includes('signal is aborted without reason') ||
      msg.includes('AbortError') ||
      msg.includes('The operation was aborted')
    );

  window.addEventListener(
    'error',
    (event) => {
      if (shouldIgnore(event.message)) {
        event.stopImmediatePropagation();
      }
    },
    true
  );

  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const reason: any = event.reason;
      const message = typeof reason === 'string' ? reason : reason?.message;
      if (shouldIgnore(message)) {
        event.preventDefault();
      }
    }
  );
}
