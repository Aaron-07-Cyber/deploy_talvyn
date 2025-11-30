import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, ArrowRight, Star, Clock, Users, Shield, Lightbulb } from 'lucide-react';
import { scrollToElement } from '../utils';
import '../styles/serviceModal.css';

const ServiceModal = ({ isOpen, onClose, service }) => {
  if (!service) return null;

  const Icon = service.icon;

  const additionalDetails = {
    'Cybersecurity': {
      processSteps: [
        'Security Assessment & Risk Analysis',
        'Implementation Planning',
        'System Deployment & Configuration',
        'Testing & Validation',
        'Monitoring & Maintenance'
      ],
      benefits: [
        'Reduced security incidents by 95%',
        'Compliance with industry standards',
        'Enhanced business reputation',
        '24/7 protection & monitoring',
        'Cost-effective security solutions'
      ],
      technologies: ['SIEM Tools', 'Firewalls', 'Endpoint Protection', 'Threat Intelligence', 'Encryption'],
      timeline: '4-8 weeks',
      teamSize: '3-5 experts'
    },
    'Website Development': {
      processSteps: [
        'Discovery & Requirements Analysis',
        'UI/UX Design & Prototyping',
        'Frontend & Backend Development',
        'Testing & Quality Assurance',
        'Deployment & Launch'
      ],
      benefits: [
        'Increased online presence',
        'Better user engagement',
        'Mobile-responsive design',
        'SEO optimized content',
        'Scalable architecture'
      ],
      technologies: ['React', 'Node.js', 'MongoDB', 'AWS', 'Docker'],
      timeline: '6-12 weeks',
      teamSize: '4-6 developers'
    },
    'ERP Tool Development': {
      processSteps: [
        'Business Process Analysis',
        'System Architecture Design',
        'Module Development',
        'Integration & Testing',
        'Training & Deployment'
      ],
      benefits: [
        'Streamlined business operations',
        'Real-time data insights',
        'Improved productivity',
        'Cost reduction',
        'Scalable enterprise solution'
      ],
      technologies: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes'],
      timeline: '12-24 weeks',
      teamSize: '6-10 specialists'
    }
  };

  const details = additionalDetails[service.title] || {};

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="service-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="modal-header">
              <div className="modal-title-section">
                <div className="modal-service-icon">
                  <Icon className="w-8 h-8" />
                </div>
                <h2 className="modal-title">{service.title}</h2>
              </div>
              <button className="modal-close-btn" onClick={onClose}>
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="modal-content">
              <div className="modal-description">
                <p>{service.description}</p>
              </div>

              {/* What We Offer Section */}
              <div className="modal-section">
                <h3 className="section-title">
                  <Star className="section-icon" />
                  What We Offer
                </h3>
                <div className="features-grid">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="feature-item">
                      <CheckCircle className="feature-icon" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Highlights */}
              <div className="modal-section">
                <h3 className="section-title">
                  <Lightbulb className="section-icon" />
                  Key Highlights
                </h3>
                <div className="highlights-grid">
                  {service.highlights.map((highlight, idx) => (
                    <div key={idx} className="highlight-item">
                      <ArrowRight className="highlight-icon" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Process Steps */}
              {details.processSteps && (
                <div className="modal-section">
                  <h3 className="section-title">
                    <Shield className="section-icon" />
                    Our Process
                  </h3>
                  <div className="process-steps">
                    {details.processSteps.map((step, idx) => (
                      <div key={idx} className="process-step">
                        <div className="step-number">{idx + 1}</div>
                        <span className="step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {details.benefits && (
                <div className="modal-section">
                  <h3 className="section-title">
                    <CheckCircle className="section-icon" />
                    Benefits
                  </h3>
                  <div className="benefits-list">
                    {details.benefits.map((benefit, idx) => (
                      <div key={idx} className="benefit-item">
                        <CheckCircle className="benefit-icon" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technologies */}
              {details.technologies && (
                <div className="modal-section">
                  <h3 className="section-title">
                    <Users className="section-icon" />
                    Technologies We Use
                  </h3>
                  <div className="technologies-list">
                    {details.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-badge">{tech}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Info */}
              <div className="modal-section">
                <h3 className="section-title">
                  <Clock className="section-icon" />
                  Project Information
                </h3>
                <div className="project-info">
                  <div className="info-item">
                    <Clock className="info-icon" />
                    <div>
                      <span className="info-label">Timeline:</span>
                      <span className="info-value">{details.timeline || '4-12 weeks'}</span>
                    </div>
                  </div>
                  <div className="info-item">
                    <Users className="info-icon" />
                    <div>
                      <span className="info-label">Team Size:</span>
                      <span className="info-value">{details.teamSize || '3-6 experts'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="modal-footer">
              <p className="footer-text">
                Ready to get started with {service.title}? Contact us for a detailed consultation.
              </p>
              <button 
                className="contact-us-btn"
                onClick={() => {
                  onClose();
                  scrollToElement('contact');
                }}
              >
                Contact Us Today
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ServiceModal;