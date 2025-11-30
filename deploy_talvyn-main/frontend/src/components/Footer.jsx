import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Instagram } from 'lucide-react';
import '../styles/footer.css';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleNavigation = (sectionId) => {
    if (isHomePage) {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      // If on other pages, navigate to home with state to scroll to section
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <h3 className="footer-logo">Talvyn</h3>
            <p className="footer-description">
              Innovative technology solutions that transform businesses and secure digital futures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <button onClick={() => handleNavigation('hero')} className="footer-link">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('services')} className="footer-link">
                  Service
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('careers')} className="footer-link">
                  Career
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('about')} className="footer-link">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigation('contact')} className="footer-link">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4 className="footer-title">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>No.546, Left cross road, CBE</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>contact@talvyntechnologies.com</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 82202 49111</span>
              </div>
            </div>
          </div>

          {/* Join Community */}
          <div className="footer-section">
            <h4 className="footer-title">Join our Community</h4>
            <p className="community-text">
              Stay connected with us and be part of our growing community.
            </p>
            <div className="social-links">
              <a href="#" className="social-link">
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/11823/11823292.png" 
                  alt="X (Twitter)" 
                  className="social-icon-img" 
                />
              </a>
              <a href="https://www.linkedin.com/company/talvyn-technologies-private-limited/" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin className="social-icon" />
              </a>
              <a href="https://www.instagram.com/talvyn_technologies?utm_source=qr&igsh=MWI2eDJtZXBpdXNwcg==" target="_blank" rel="noopener noreferrer" className="social-link">
                <Instagram className="social-icon" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2024 Talvyn Technologies. All rights reserved.</p>
            <div className="footer-bottom-links">
              <a href="#" className="footer-bottom-link">Privacy Policy</a>
              <a href="#" className="footer-bottom-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;