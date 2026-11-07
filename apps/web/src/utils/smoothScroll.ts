import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenisInstance = instance;
};

export const getLenis = () => lenisInstance;

export const smoothScrollTo = (
  target: string | number | HTMLElement,
  options: { offset?: number; duration?: number } = { duration: 1.2 }
) => {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, options);
  } else if (typeof target === 'string') {
    const selector = target.startsWith('#') ? target : `#${target}`;
    const el = document.querySelector(selector);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  } else if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else if (target instanceof HTMLElement) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
};
