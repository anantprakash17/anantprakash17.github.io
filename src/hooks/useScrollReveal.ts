import { useEffect, useRef, RefObject } from 'react';

interface ScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  staggerDelay?: number;
  once?: boolean;
}

export const useScrollReveal = <T extends HTMLElement = HTMLElement>(
  options: ScrollRevealOptions = {}
): RefObject<T> => {
  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px',
    staggerDelay: 100,
    once: true,
  };

  const mergedOptions = { ...defaultOptions, ...options };
  const ref = useRef<T>(null) as RefObject<T>;

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const elements = currentRef.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay for child elements
          setTimeout(() => {
            entry.target.classList.add('active');
          }, index * mergedOptions.staggerDelay);

          // Unobserve if once option is true
          if (mergedOptions.once) {
            observer.unobserve(entry.target);
          }
        } else if (!mergedOptions.once) {
          entry.target.classList.remove('active');
        }
      });
    }, {
      threshold: mergedOptions.threshold,
      rootMargin: mergedOptions.rootMargin,
    });

    elements.forEach(element => {
      observer.observe(element);
    });

    return () => {
      if (elements && elements.length > 0) {
        elements.forEach(element => {
          observer.unobserve(element);
        });
      }
    };
  }, [mergedOptions]);

  return ref;
};

export default useScrollReveal;
