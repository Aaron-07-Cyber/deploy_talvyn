import { motion } from 'framer-motion';
import { Linkedin, Mail, Users, Award, TrendingUp, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { useRef, useState } from 'react';
import "../styles/ourteam.css";

const OurTeam = () => {
  const scrollRef = useRef(null);
  const [copiedEmail, setCopiedEmail] = useState(null);

  const copyEmailToClipboard = async (email, memberName) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(memberName);
      setTimeout(() => setCopiedEmail(null), 2000); // Clear after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = email;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopiedEmail(memberName);
      setTimeout(() => setCopiedEmail(null), 2000);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -350,
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 350,
        behavior: 'smooth'
      });
    }
  };

  const teamMembers = [
    {
      name: 'Aaron A',
      position: 'Chief Executive Officer',
      experience: '2+ years',
      expertise: 'Strategic Leadership, Business Development',
      email: 'aaron.a@talvyntechnologies.com',
      linkedin: 'https://www.linkedin.com/in/aaron-a-77ba65216/',
      image: '/photos/aaron.jpg'
    },
    {
      name: 'Balaji P',
      position: 'Managing Director',
      experience: '2+ years',
      expertise: 'Software Architecture, Cloud Technologies',
      email: 'balaji.p@talvyntechnologies.com',
      linkedin: 'https://www.linkedin.com/in/balaji-p-08963925b/',
      image: '/photos/balaji.jpg'
    },
    {
      name: 'Sveda Nagaraju N',
      position: 'Head of Human Resource',
      experience: '2+ years',
      expertise: 'Information Security, Risk Management',
      email: 'sveda.n@talvyntechnologies.com',
      linkedin: 'https://www.linkedin.com/in/sveda-nagaraju/',
      image: '/photos/sveda.jpg'
    }
    // {
    //   name: 'Vaishnavi',
    //   position: 'Head of Development',
    //   experience: '2+ years',
    //   expertise: 'Full-Stack Development, Team Leadership',
    //   email: 'vaishnavi@',
    //   linkedin: '#',
    //   image: '/photos/sneha.jpg'
    // },
    // {
    //   name: 'Vikram Singh',
    //   position: 'Head of Operations',
    //   experience: '11+ years',
    //   expertise: 'Project Management, Business Operations',
    //   email: 'vikram@talvyntech.com',
    //   linkedin: '#',
    //   image: '/photos/vikram.jpg'
    // },
    // {
    //   name: 'Ananya Gupta',
    //   position: 'Head of Design',
    //   experience: '7+ years',
    //   expertise: 'UI/UX Design, Product Strategy',
    //   email: 'ananya@talvyntech.com',
    //   linkedin: '#',
    //   image: '/photos/ananya.jpg'
    // }
  ];

  const teamStats = [
    {
      icon: Users,
      number: '25+',
      label: 'Team Members'
    },
    {
      icon: Award,
      number: '50+',
      label: 'Projects Completed'
    },
    {
      icon: TrendingUp,
      number: '5+',
      label: 'Years Experience'
    }
  ];

  return (
    <div className="team-section">
      <div className="team-container">
        {/* Header */}
        <motion.div 
          className="team-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="team-title">Our Leadership Team</h2>
          <p className="team-subtitle">
            Meet the experienced professionals driving innovation and excellence at Talvyn Technologies. 
            Our diverse team brings together decades of expertise in technology, business, and design.
          </p>
        </motion.div>

        {/* Team Stats */}
        <motion.div 
          className="team-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {teamStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                className="stat-item"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <div className="stat-icon">
                  <Icon className="icon" />
                </div>
                <div className="stat-content">
                  <h3 className="stat-number">{stat.number}</h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Team Members Scrollable Section */}
        <div className="team-section-container">
          {/* Scroll Buttons */}
          <button className="scroll-btn scroll-btn-left" onClick={scrollLeft}>
            <ChevronLeft className="scroll-icon" />
          </button>
          <button className="scroll-btn scroll-btn-right" onClick={scrollRight}>
            <ChevronRight className="scroll-icon" />
          </button>
          
          {/* Team Members Grid */}
          <div className="team-grid" ref={scrollRef}>
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              className="team-member-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              {/* Background Image */}
              <div 
                className="member-image" 
                style={{
                  backgroundImage: `url(${member.image})`
                }}
              >
                {/* Overlay Content */}
                <div className="member-overlay">
                  <div className="member-info">
                    <h3 className="member-name">{member.name}</h3>
                    <p className="member-position">{member.position}</p>
                    <p className="member-experience">{member.experience} experience</p>
                    <p className="member-expertise">{member.expertise}</p>
                  </div>

                  <div className="member-contact">
                    <button 
                      className={`contact-btn email-btn ${copiedEmail === member.name ? 'copied' : ''}`}
                      title={copiedEmail === member.name ? "Email Copied!" : "Copy Email Address"}
                      onClick={() => copyEmailToClipboard(member.email, member.name)}
                    >
                      {copiedEmail === member.name ? (
                        <Check className="contact-icon" />
                      ) : (
                        <Mail className="contact-icon" />
                      )}
                    </button>
                    <button 
                      className="contact-btn linkedin-btn" 
                      title="LinkedIn Profile"
                      onClick={() => window.open(member.linkedin, '_blank', 'noopener,noreferrer')}
                    >
                      <Linkedin className="contact-icon" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default OurTeam;
