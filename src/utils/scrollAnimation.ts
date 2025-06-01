/**
 * Sets up intersection observers for fade-in animations on scroll
 */
export function setupScrollAnimations() {
  // Check if we're in the browser environment
  if (typeof window === 'undefined') return;

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Once the animation has played, we can stop observing
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Target all elements with the fade-in-section class
  const fadeElements = document.querySelectorAll('.fade-in-section');
  fadeElements.forEach((element) => {
    observer.observe(element);
  });

  return observer;
}

/**
 * Checks if an element is in viewport
 */
export function isInViewport(element: Element): boolean {
  const rect = element.getBoundingClientRect();
  
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
} 