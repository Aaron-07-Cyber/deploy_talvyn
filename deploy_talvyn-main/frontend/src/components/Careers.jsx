import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import "../styles/careers.css";
import Arrow1 from "../assets/images/icons/Arrow1.png";
import Arrow2 from "../assets/images/icons/Arrow2.png";

const Careers = () => {
  const navigate = useNavigate();

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Growth Opportunities',
      description: 'Continuous learning and career advancement paths'
    },
    {
      icon: Users,
      title: 'Collaborative Culture',
      description: 'Work with talented professionals in a supportive environment'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible working arrangements and wellness programs'
    },
    {
      icon: Briefcase,
      title: 'Competitive Benefits',
      description: 'Comprehensive compensation and benefits package'
    }
  ];

  return (
    <div className="careers-section">
      <div className="careers-container">
        <motion.div
          className="careers-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="careers-title">
            <img src={Arrow1} alt="Arrow Icon" className="careers-icon" />
            <h2>Career with Talvyn</h2>
            <img src={Arrow2} alt="Arrow Icon" className="careers-icon" />
          </div>
          <p>
            At Talvyn Technologies, we're always looking for passionate professionals 
            who want to make a difference in the world of technology. Join us in 
            building innovative solutions that shape the future.
          </p>
        </motion.div>

        <motion.div
          className="benefits-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3>Why Work With Us?</h3>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  className="benefit-item"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="benefit-icon">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="benefit-content">
                    <h4>{benefit.title}</h4>
                    <p>{benefit.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          className="career-overview"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3>Career Overview</h3>
          <div className="overview-content">
            <p>
              We offer exciting opportunities across various domains including cybersecurity, 
              web development, and custom software development. Our team consists of 
              innovative thinkers, problem solvers, and technology enthusiasts.
            </p>
            <p>
              Whether you're a seasoned professional or just starting your career, 
              we provide an environment that fosters growth, creativity, and professional 
              development. Join us in creating solutions that matter.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="careers-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
        >
          <button
            onClick={() => navigate('/jobs')}
            className="view-openings-button"
          >
            View Current Openings
            <Briefcase className="w-5 h-5 ml-2" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Careers;