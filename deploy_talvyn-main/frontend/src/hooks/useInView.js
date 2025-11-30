import { useEffect, useState, useRef } from "react";

export default function useInView(options) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Mobile fallback: automatically set visible on mobile devices
    const isMobile = window.innerWidth <= 768;
    if (isMobile) {
      setIsVisible(true);
      return;
    }

    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // trigger only once
          }
        });
      },
      {
        ...options,
        // Adjust threshold for mobile devices
        threshold: isMobile ? 0.1 : (options?.threshold || 0.1)
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [ref, options]);

  return [ref, isVisible];
}
