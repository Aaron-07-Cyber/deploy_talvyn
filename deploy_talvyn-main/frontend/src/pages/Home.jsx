import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import OurTeam from '../components/OurTeam';
import Careers from '../components/Careers';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import useInView from '../hooks/useInView';
import '../styles/home.css';

export default function Home() {
    const location = useLocation();
    const [aboutRef, aboutVisible] = useInView({ threshold: 0.2 });
    const [servicesRef, servicesVisible] = useInView({ threshold: 0.2 });
    const [teamRef, teamVisible] = useInView({ threshold: 0.2 });
    const [careersRef, careersVisible] = useInView({ threshold: 0.2 });
    const [contactRef, contactVisible] = useInView({ threshold: 0.2 });

    // Handle scrolling to section when navigating from other pages
    useEffect(() => {
        if (location.state?.scrollTo) {
            const timer = setTimeout(() => {
                const element = document.getElementById(location.state.scrollTo);
                if (element) {
                    element.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }, 100);
            return () => clearTimeout(timer);
        }
    }, [location.state]);

    return (
        <div>
            <Navbar />
            <section id="hero" className="hero visible">
                <Hero />
            </section>
            <section id="about" ref={aboutRef} className={aboutVisible ? "visible" : ""}>
                <About />
            </section>  
            <section ref={teamRef} className={teamVisible ? "visible" : ""}>
                <OurTeam />
            </section>
            <section id="services" ref={servicesRef} className={servicesVisible ? "visible" : ""}>
                <Services />
            </section>
            <section id="careers" ref={careersRef} className={careersVisible ? "visible" : ""}>
                <Careers />
            </section>
            <section id="contact" ref={contactRef} className={contactVisible ? "visible" : ""}>
                <Contact />
            </section>
            <Footer />
        </div>
    );
}
