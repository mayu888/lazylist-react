export const loadPolyfills= () => {
  if (typeof window.IntersectionObserver === 'undefined') {
    require('intersection-observer');
  }
}