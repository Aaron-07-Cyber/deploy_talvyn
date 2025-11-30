import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { submitContactForm } from '../services/api';
import '../styles/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceInterest: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await submitContactForm(formData);
      setSubmitMessage('Thank you for your inquiry! We will get back to you within 24 hours.');
      setFormData({ 
        name: '', 
        email: '', 
        phone: '', 
        company: '', 
        serviceInterest: '', 
        message: '' 
      });
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmitMessage('Error: ' + (error.message || 'Failed to send message. Please try again.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Office Address',
      details: ['No.546, Left cross road, CBE', 'Coimbatore, Tamil Nadu', 'India']
    },
    {
      icon: Phone,
      title: 'Phone Numbers',
      details: ['+91 82202 49111', '+91 95006 60573']
    },
    {
      icon: Mail,
      title: 'Email Addresses',
      details: ['contact@talvyntechnologies.com']
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Monday - Friday: 10:00 AM - 7:00 PM', 'Saturday: 10:00 AM - 2:00 PM', 'Sunday: Closed']
    }
  ];

  const services = [
    'Cybersecurity Solutions',
    'Website Development', 
    'ERP Tool Development',
    'Other'
  ];


  return (
    <div className="contact-section">
      <div className="contact-container">
        {/* Header */}
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="contact-title">Get In Touch</h2>
          <p className="contact-subtitle">
            Ready to start your next project? We'd love to hear from you. Contact us today 
            and let's discuss how we can help transform your business with innovative technology solutions.
          </p>
        </motion.div>

        <div className="contact-main-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-section"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="contact-form-card">
              <div className="form-header">
                <div className="form-header-content">
                  <MessageCircle className="form-icon" />
                  <h3>Send us a Message</h3>
                </div>
                <p className="form-description">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      required
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 12345 67890"
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="company">Company Name</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your company name"
                    />
                  </div>
                </div>
                
                <div className="form-field">
                  <label htmlFor="serviceInterest">Service Interest</label>
                  <select
                    id="serviceInterest"
                    name="serviceInterest"
                    value={formData.serviceInterest}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-field">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your project requirements..."
                    required
                  />
                </div>
                
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                  <Send className="submit-icon" />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className="contact-info-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div 
                  key={index} 
                  className="contact-info-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="info-icon">
                    <Icon className="icon" />
                  </div>
                  <div className="info-content">
                    <h4>{info.title}</h4>
                    <div className="info-details">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex}>{detail}</p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Office Location with Map */}
        <motion.div 
          className="office-map-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="section-header">
            <h3>Visit Our Office</h3>
            <p>
              Located in the heart of Coimbatore, our office is easily accessible 
              and equipped with modern facilities to serve you better.
            </p>
          </div>
          
          <div className="office-map-container">
            <motion.div 
              className="office-details-card"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="office-header">
                <div className="office-icon">
                  <MapPin className="icon" />
                </div>
                <div>
                  <h4>Talvyn Technologies HQ</h4>
                  <p className="office-status">Headquarters</p>
                </div>
              </div>
              
              <div className="office-info">
                <div className="info-item">
                  <MapPin className="info-icon" />
                  <div>
                    <strong>Address</strong>
                    <p>No.546, Left cross road, CBE<br />Coimbatore, Tamil Nadu, India</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <Phone className="info-icon" />
                  <div>
                    <strong>Phone</strong>
                    <p>+91 82202 49111</p>
                  </div>
                </div>
                
                <div className="info-item">
                  <Clock className="info-icon" />
                  <div>
                    <strong>Business Hours</strong>
                    <p>Monday - Friday: 10:00 AM - 7:00 PM<br />Saturday: 10:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
              
              <div className="map-actions">
                <button 
                  className="directions-btn"
                  onClick={() => window.open('https://maps.google.com/dir/?api=1&destination=No.546,+Left+cross+road,+CBE,+Coimbatore,+Tamil+Nadu,+India', '_blank')}
                >
                  <MapPin className="btn-icon" />
                  Get Directions
                </button>
                <button 
                  className="view-larger-btn"
                  onClick={() => window.open('https://maps.google.com/?q=No.546,+Left+cross+road,+CBE,+Coimbatore,+Tamil+Nadu,+India&z=17', '_blank')}
                >
                  View Larger Map
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              className="interactive-map"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="map-frame">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7736!2d76.9558!3d11.0168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAxJzAwLjUiTiA3NsKwNTcnMjEuOSJF!5e0!3m2!1sen!2sin!4v1698000000000!5m2!1sen!2sin&q=No.546,+Left+cross+road,+CBE,+Coimbatore,+Tamil+Nadu,+India"
                  width="100%"
                  height="100%"
                  style={{ border: 0, borderRadius: '12px' }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Talvyn Technologies Office Location"
                />
                <div className="map-overlay">
                  <div className="location-marker">
                    <MapPin className="marker-icon" />
                    <span>Talvyn Technologies</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          className="emergency-contact-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="emergency-card">
            <div className="emergency-header">
              <AlertCircle className="emergency-icon" />
              <h3>Need Immediate Assistance?</h3>
            </div>
            <p className="emergency-description">
              For urgent support or security incidents, contact our 24/7 emergency hotline. 
              Our expert team is always ready to help you with critical issues.
            </p>
            <div className="emergency-buttons">
              <button className="emergency-phone-btn">
                <Phone className="btn-icon" />
                Emergency: +91 80 911 911
              </button>
              <button className="emergency-email-btn">
                <Mail className="btn-icon" />
                emergency@talvyntech.com
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}