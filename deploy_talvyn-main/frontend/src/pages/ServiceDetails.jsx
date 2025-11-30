import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Shield, Globe, Cpu, ArrowLeft, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/serviceDetails.css";

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const navigate = useNavigate();

    const services = {
        cybersecurity: {
            icon: Shield,
            title: 'Cybersecurity Solutions',
            subtitle: 'Comprehensive protection for your digital assets',
            description: 'In today\'s digital landscape, cybersecurity is not just an option—it\'s a necessity. Our comprehensive cybersecurity solutions are designed to protect your business from evolving threats while ensuring compliance with industry standards.',
            highlights: [
                'Advanced Threat Detection',
                'Security Compliance',
                '24/7 Monitoring',
                'Incident Response'
            ],
            features: [
                {
                    title: 'Vulnerability Assessment',
                    description: 'Comprehensive scanning and assessment of your systems to identify potential security vulnerabilities before they can be exploited.'
                },
                {
                    title: 'Penetration Testing',
                    description: 'Ethical hacking services to test your defenses and identify weaknesses in your security infrastructure.'
                },
                {
                    title: 'Security Audits',
                    description: 'Thorough evaluation of your security policies, procedures, and technical controls to ensure compliance.'
                },
                {
                    title: 'Risk Management',
                    description: 'Strategic planning and implementation of risk mitigation strategies tailored to your business needs.'
                },
                {
                    title: 'Compliance Consulting',
                    description: 'Expert guidance to help you meet regulatory requirements and industry standards like GDPR, HIPAA, and SOC 2.'
                },
                {
                    title: 'Employee Training',
                    description: 'Comprehensive security awareness training to educate your team about current threats and best practices.'
                }
            ],
            benefits: [
                'Protect sensitive data and intellectual property',
                'Maintain customer trust and brand reputation',
                'Ensure regulatory compliance',
                'Minimize business disruption from security incidents',
                'Reduce cybersecurity insurance costs'
            ]
        },
        'web-development': {
            icon: Globe,
            title: 'Website Development',
            subtitle: 'Modern, responsive web solutions that drive growth',
            description: 'Transform your digital presence with our cutting-edge web development services. We create modern, responsive websites that not only look stunning but also deliver exceptional user experiences and drive business growth.',
            highlights: [
                'Responsive Design',
                'E-commerce Solutions',
                'CMS Integration',
                'Performance Optimization'
            ],
            features: [
                {
                    title: 'Custom Web Development',
                    description: 'Tailored web solutions built from scratch to meet your specific business requirements and objectives.'
                },
                {
                    title: 'Mobile-First Design',
                    description: 'Responsive design approach ensuring your website looks and functions perfectly on all devices.'
                },
                {
                    title: 'SEO Optimization',
                    description: 'Built-in search engine optimization to help your website rank higher and attract more organic traffic.'
                },
                {
                    title: 'API Integration',
                    description: 'Seamless integration with third-party services and APIs to extend functionality and improve user experience.'
                },
                {
                    title: 'Database Design',
                    description: 'Efficient database architecture to handle your data needs and support business growth.'
                },
                {
                    title: 'Hosting & Maintenance',
                    description: 'Reliable hosting solutions and ongoing maintenance to keep your website running smoothly.'
                }
            ],
            benefits: [
                'Increased online visibility and brand awareness',
                'Better user engagement and conversion rates',
                'Improved search engine rankings',
                'Scalable solutions that grow with your business',
                'Professional, credible online presence'
            ]
        },
        'erp-development': {
            icon: Cpu,
            title: 'ERP Tool Development',
            subtitle: 'Streamline operations with custom enterprise solutions',
            description: 'Optimize your business operations with our custom ERP solutions. We develop comprehensive Enterprise Resource Planning tools that integrate all aspects of your business, from finance and HR to inventory and customer management.',
            highlights: [
                'Enterprise Applications',
                'Mobile Development',
                'API Integration',
                'Cloud Solutions'
            ],
            features: [
                {
                    title: 'Requirements Analysis',
                    description: 'Thorough analysis of your business processes to design the most effective ERP solution for your needs.'
                },
                {
                    title: 'System Architecture',
                    description: 'Robust, scalable architecture designed to handle your current needs and future growth.'
                },
                {
                    title: 'Agile Development',
                    description: 'Iterative development approach ensuring regular feedback and continuous improvement throughout the project.'
                },
                {
                    title: 'Quality Assurance',
                    description: 'Comprehensive testing procedures to ensure reliability, performance, and security of your ERP system.'
                },
                {
                    title: 'DevOps Integration',
                    description: 'Seamless deployment and continuous integration practices for efficient system updates and maintenance.'
                },
                {
                    title: 'Technical Support',
                    description: 'Ongoing technical support and maintenance to ensure your ERP system continues to serve your business effectively.'
                }
            ],
            benefits: [
                'Streamlined business processes and improved efficiency',
                'Better data visibility and decision-making',
                'Reduced operational costs',
                'Improved collaboration across departments',
                'Scalable solutions that adapt to business growth'
            ]
        }
    };

    const service = services[serviceId];

    if (!service) {
        return (
            <div className="service-details-page">
                <Navbar />
                <div className="container">
                    <div className="not-found">
                        <h1>Service Not Found</h1>
                        <button onClick={() => navigate('/')}>Go Back Home</button>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    const Icon = service.icon;

    return (
        <div className="service-details-page">
            <Navbar />
            
            <div className="service-details-content">
                <div className="container">
                    {/* Back Button */}
                    <motion.button 
                        className="back-button"
                        onClick={() => navigate('/')}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Home
                    </motion.button>

                    {/* Header */}
                    <motion.div 
                        className="service-header"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="service-icon-large">
                            <Icon className="w-16 h-16" />
                        </div>
                        <h1 className="service-title">{service.title}</h1>
                        <p className="service-subtitle">{service.subtitle}</p>
                    </motion.div>

                    {/* Description */}
                    <motion.div 
                        className="service-description"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p>{service.description}</p>
                    </motion.div>

                    {/* Highlights */}
                    <motion.div 
                        className="service-highlights"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <h2>Key Highlights</h2>
                        <div className="highlights-grid">
                            {service.highlights.map((highlight, index) => (
                                <div key={index} className="highlight-card">
                                    <CheckCircle className="w-6 h-6" />
                                    <span>{highlight}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Features */}
                    <motion.div 
                        className="service-features"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <h2>Our Services Include</h2>
                        <div className="features-grid">
                            {service.features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    className="feature-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.1 * index }}
                                >
                                    <h3>{feature.title}</h3>
                                    <p>{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Benefits */}
                    <motion.div 
                        className="service-benefits"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        <h2>Benefits for Your Business</h2>
                        <div className="benefits-list">
                            {service.benefits.map((benefit, index) => (
                                <div key={index} className="benefit-item">
                                    <CheckCircle className="w-5 h-5" />
                                    <span>{benefit}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.div 
                        className="service-cta"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.0 }}
                    >
                        <h2>Ready to Get Started?</h2>
                        <p>Contact us today to discuss how our {service.title.toLowerCase()} solutions can benefit your business.</p>
                        <button 
                            className="cta-button"
                            onClick={() => navigate('/', { state: { scrollTo: 'contact' } })}
                        >
                            Get In Touch
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default ServiceDetails;