import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        // Force scroll to top when route changes
        // Use setTimeout to ensure it happens after the route has fully loaded
        const scrollToTop = () => {
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;
        };
        
        // Immediate scroll
        scrollToTop();
        
        // Also scroll after a small delay to ensure it works even if content is still loading
        const timer = setTimeout(scrollToTop, 100);
        
        return () => clearTimeout(timer);
    }, [pathname]);

    return null;
};

export default ScrollToTop;