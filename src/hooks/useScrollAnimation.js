import { useEffect, useRef } from 'react';

const useScrollAnimation = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const animatedEls = entry.target.querySelectorAll(
              '.fade-in-up, .fade-in-left, .fade-in-right, .zoom-in'
            );
            animatedEls.forEach(el => {
              el.classList.add('animated');
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return ref;
};

export default useScrollAnimation;
