import { motion } from 'framer-motion';
import { Shield, Target, Users, Lightbulb, Award, TrendingUp, Globe, Heart } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/learnMoreAboutUs.css";

const LearnMoreAboutUs = () => {
    const coreValues = [
        {
            icon: Shield,
            title: 'Security First',
            description: 'We prioritize the security and privacy of our clients\' data above all else, implementing industry-leading security measures.'
        },
        {
            icon: Lightbulb,
            title: 'Innovation',
            description: 'We continuously push the boundaries of technology to deliver cutting-edge solutions that drive business growth.'
        },
        {
            icon: Users,
            title: 'Customer Success',
            description: 'Our clients\' success is our success. We are committed to providing exceptional service and support at every step.'
        },
        {
            icon: Heart,
            title: 'Integrity',
            description: 'We conduct business with honesty, transparency, and ethical practices, building trust with all our stakeholders.'
        },
        {
            icon: Target,
            title: 'Excellence',
            description: 'We strive for excellence in everything we do, from our technology solutions to our customer relationships.'
        },
        {
            icon: Globe,
            title: 'Global Impact',
            description: 'We aim to make a positive impact on businesses worldwide through our innovative technology solutions.'
        }
    ];

    const achievements = [
        {
            icon: Users,
            number: '15+',
            label: 'Happy Clients',
            description: 'Businesses trust us with their technology needs'
        },
        {
            icon: Award,
            number: '10+',
            label: 'Projects Delivered',
            description: 'Successfully completed projects across industries'
        },
        {
            icon: TrendingUp,
            number: '99%',
            label: 'Client Satisfaction',
            description: 'Consistently high satisfaction rates'
        },
        {
            icon: Shield,
            number: '24/7',
            label: 'Security Monitoring',
            description: 'Round-the-clock protection for your systems'
        }
    ];

    return (
        <div className="learn-more-page">
            <Navbar />
            
            <div className="learn-more-section">
                <div className="learn-more-container">
                    {/* Header */}
                    <motion.div 
                        className="learn-more-header"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="learn-more-main-title">Learn More About Talvyn Technologies</h1>
                        <p className="learn-more-main-subtitle">
                            Dive deeper into our story, values, and achievements that make us a trusted technology partner.
                        </p>
                    </motion.div>

                    {/* Our Story */}
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

                    {/* Core Values */}
                    <motion.div 
                        className="core-values-section"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-header">
                            <h2 className="section-title">Our Core Values</h2>
                            <p className="section-subtitle">
                                The principles that guide everything we do and shape our company culture.
                            </p>
                        </div>

                        <div className="values-grid">
                            {coreValues.map((value, index) => {
                                const Icon = value.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="value-card"
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="value-icon">
                                            <Icon className="icon" />
                                        </div>
                                        <h4 className="value-title">{value.title}</h4>
                                        <p className="value-description">{value.description}</p>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Achievements */}
                    <motion.div 
                        className="achievements-section"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="section-header">
                            <h2 className="section-title">Our Achievements</h2>
                            <p className="section-subtitle">
                                Numbers that reflect our commitment to excellence and client success.
                            </p>
                        </div>

                        <div className="achievements-grid">
                            {achievements.map((achievement, index) => {
                                const Icon = achievement.icon;
                                return (
                                    <motion.div
                                        key={index}
                                        className="achievement-card"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.6, delay: 0.1 * index }}
                                        viewport={{ once: true }}
                                    >
                                        <div className="achievement-icon">
                                            <Icon className="icon" />
                                        </div>
                                        <div className="achievement-content">
                                            <h3 className="achievement-number">{achievement.number}</h3>
                                            <h4 className="achievement-label">{achievement.label}</h4>
                                            <p className="achievement-description">{achievement.description}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default LearnMoreAboutUs;