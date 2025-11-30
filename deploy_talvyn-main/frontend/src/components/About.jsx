import { motion } from 'framer-motion';
import { Shield, Target, Users, Lightbulb } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { scrollToElement } from '../utils';
import "../styles/about.css";

const About = () => {
    const navigate = useNavigate();

    const handleLearnMoreAboutUs = () => {
        navigate('/learn-more-about-us');
    };

    return (
        <div className="about-section">
            <div className="about-container">
                {/* Header */}
                <motion.div 
                    className="about-header"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h1 className="about-main-title">About Talvyn Technologies</h1>
                    <p className="about-main-subtitle">
                        Transforming businesses through innovative technology solutions, 
                        security expertise, and unwavering commitment to excellence.
                    </p>
                </motion.div>

                {/* Company Story */}
                <motion.div 
                    className="company-story"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <div className="story-content">
                        <h2 className="story-title">Our Story</h2>
                        <p className="story-text">
                            Founded with a vision to bridge the gap between cutting-edge technology and practical business solutions, 
                            Talvyn Technologies has grown from a small startup to a trusted partner for businesses worldwide. 
                            Our journey began with a simple belief: technology should empower businesses, not complicate them.
                        </p>
                        <p className="story-text">
                            Today, we specialize in cybersecurity, web development, and custom software solutions, 
                            helping organizations of all sizes achieve their digital transformation goals with confidence and security.
                        </p>
                    </div>
                </motion.div>

                {/* Vision & Mission */}
                <div className="vision-mission-section">
                    <motion.div 
                        className="vision-card"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-icon">
                            <Target className="icon" />
                        </div>
                        <h3 className="card-title">Our Vision</h3>
                        <p className="card-description">
                            To redefine how businesses operate by becoming the most trusted technology partner worldwide, 
                            delivering innovative solutions that drive sustainable growth and digital transformation.
                        </p>
                    </motion.div>

                    <motion.div 
                        className="mission-card"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="card-icon">
                            <Lightbulb className="icon" />
                        </div>
                        <h3 className="card-title">Our Mission</h3>
                        <p className="card-description">
                            To provide user-friendly, secure, and scalable technology solutions that help businesses 
                            streamline operations, enhance security, reduce costs, and achieve their strategic objectives with confidence.
                        </p>
                    </motion.div>
                </div>


                {/* Call to Action */}
                <motion.div
                    className="about-cta"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    viewport={{ once: true }}
                >
                    <div className="cta-content">
                        <h3>Ready to Transform Your Business?</h3>
                        <p>
                            Join hundreds of satisfied clients who trust Talvyn Technologies with their digital transformation journey. 
                            Let's discuss how we can help your business achieve its technology goals.
                        </p>
                        <div className="cta-buttons">
                            <button className="primary-cta-btn" onClick={() => scrollToElement('contact')}>
                                Get Started Today
                                <Target className="btn-icon" />
                            </button>
                            <button className="secondary-cta-btn" onClick={handleLearnMoreAboutUs}>
                                Learn More About Us
                                <Users className="btn-icon" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default About;
