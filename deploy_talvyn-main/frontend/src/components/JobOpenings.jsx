import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, MapPin, Clock, DollarSign, Send, FileText, ArrowLeft, X, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitJobApplication } from '../services/api';
import Navbar from './Navbar';
import Footer from './Footer';
import "../styles/careers.css";

const JobOpenings = () => {
  const navigate = useNavigate();
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [applicationData, setApplicationData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    currentCompany: '',
    expectedSalary: '',
    noticePeriod: '',
    skills: '',
    coverLetter: '',
    resume: null
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Set to empty array to simulate no job openings - change this to add jobs
  const jobOpenings = [{
  title: 'Full Stack Intern',
  department: 'Software Development',
  location: 'Remote/Hybrid',
  type: 'Internship (Unpaid)',
  salary: 'Unpaid Internship (Stipend: None)',
  description: 'Gain hands-on experience in full stack development by assisting in building, testing, and deploying web applications under the guidance of senior developers.',
  detailedDescription: 'As a Full Stack Intern, you will be involved in real-world IT projects, learning and contributing to both frontend and backend development. This role is designed to provide practical exposure to modern development tools, frameworks, and best practices. You will collaborate with developers, testers, and project managers, while improving your coding and problem-solving skills. Although unpaid, this internship provides an excellent opportunity to strengthen your technical foundation and prepare for a professional career in IT.',
  
  responsibilities: [
    'Assist in developing responsive user interfaces using HTML, CSS, and JavaScript frameworks (React/Angular/Vue)',
    'Support backend development with Node.js, Python, Java, or similar technologies',
    'Work with RESTful APIs and database systems (MySQL, MongoDB, PostgreSQL)',
    'Perform debugging, testing, and documentation of code',
    'Collaborate with the team using Git/GitHub for version control',
    'Participate in Agile/Scrum meetings and contribute to project discussions',
    'Research and apply modern development practices and tools',
    'Assist in deployment and maintenance of applications in cloud environments (AWS/Azure/GCP)'
  ],
  
  requirements: [
    'Basic knowledge of frontend technologies (HTML5, CSS3, JavaScript, Bootstrap, React/Angular)',
    'Understanding of backend frameworks (Node.js, Django, Spring Boot, or similar)',
    'Familiarity with databases (SQL and NoSQL)',
    'Knowledge of RESTful API integration',
    'Understanding of version control systems (Git/GitHub)',
    'Good problem-solving and analytical skills',
    'Strong willingness to learn and adapt to new technologies',
    'Ability to work collaboratively in a team environment',
    'Pursuing or recently completed a degree in Computer Science, IT, or related field'
  ]
  },
  {
  title: 'UI/UX Designer Intern',

      department: 'Design and Development Team',

      location: 'Remote/Hybrid',

      type: 'Full-time',

      salary: 'Unpaid Internship',

      description: 'Support the design and development of user-friendly interfaces by creating intuitive                   experiences, conducting user research, and assisting with wireframes and prototypes.',

      detailedDescription: 'As a UI/UX Designer Intern, you will work closely with the design and development teams to create engaging digital experiences. You will contribute to designing user interfaces, gathering user feedback, and improving usability across applications. This role is ideal for someone eager to learn, experiment, and grow in the field of user experience and interface design.',

      responsibilities: [

                  'Assist in designing wireframes, mockups, and prototypes for web and mobile applications',
 
                  'Conduct user research and usability testing to gather feedback',
 
                  'Collaborate with developers and product teams to ensure design feasibility',
 
                  'Identify design problems and suggest elegant, user-centered solutions',
 
                  'Support in maintaining design systems and style guides',
 
                  'Stay updated on design trends and UI/UX best practices'

              ],
 
      requirements: [

                'Pursuing or recently completed any degree or related field',
 
                'Knowledge of design tools such as Figma, Adobe XD, or Sketch',
 
                'Basic understanding of user-centered design principles',
 
                'Strong communication and collaboration skills',
 
                'Creativity, attention to detail, and willingness to learn'

      ]

    },
    {
 
      title: 'HR Intern',

      department: 'Human Resource',

      location: 'Remote/Hybrid',

      type: 'Full-time',

      salary: 'Unpaid Internship',

      description: 'Assist in HR operations, support recruitment processes, and contribute to employee engagement activities.',

      detailedDescription: 'As an HR Intern, you will gain hands-on experience in various human resource functions. You will assist with recruitment, employee onboarding, HR documentation, and engagement initiatives, while learning how HR supports the overall organizational culture and growth.',
 
      responsibilities: [

                  'Assist in sourcing candidates and scheduling interviews',

                  'Support onboarding and orientation programs',

                  'Maintain accurate HR records and documentation',

                  'Help organize employee engagement and wellness activities',

                  'Assist in drafting HR policies and communication materials',

                  'Collaborate with the HR team on day-to-day operations'

              ],

      requirements: [

                  'Currently pursuing or recently completed any degree or related field',

                  'Strong communication and interpersonal skills',

                  'Ability to handle confidential information with integrity',

                  'Proficient in MS Office and familiar with HR tools/software',

                  'Eagerness to learn and contribute to HR practices'

      ]

    },
    {
 
      title: 'Frontend Developer Intern',

      department: 'Developer Team',

      location: 'Remote/Hybrid',

      type: 'Full-time',

      salary: 'Unpaid Internship',

      description: 'Assist in building user-friendly web interfaces, writing clean code, and collaborating with design and development teams.',

      detailedDescription: 'As a Frontend Developer Intern, you will gain hands-on experience in creating responsive and engaging web applications. You will work closely with our development team to implement UI/UX designs, optimize performance, and learn industry best practices in modern frontend technologies.',

      responsibilities: [

                'Assist in developing responsive web pages and interfaces using HTML, CSS, and JavaScript',

                'Work with frameworks like React or Angular to implement interactive features',

                'Collaborate with designers to ensure pixel-perfect UI implementation',

                'Debug and troubleshoot frontend issues across different browsers and devices',

                'Support performance optimization and accessibility improvements',

                'Participate in code reviews and contribute to team discussions'

              ],

      requirements: [

                 'Pursuing a degree in Computer Science, IT, or related field',

                 'Basic knowledge of HTML, CSS, JavaScript, and modern frontend frameworks',

                 'Familiarity with version control systems like Git',

                 'Good understanding of responsive design and cross-browser compatibility',

                 'Eagerness to learn, adapt, and work in a collaborative environment'

      ]

    },
 
    {
      title: 'Backend Developer Intern',

      department: 'Developer Team',

      location: 'Remote/Hybrid',

      type: 'Full-time',

      salary: 'Unpaid Internship',

      description: 'Assist in building and optimizing server-side applications, databases, and APIs to support scalable web and mobile solutions.',

      detailedDescription: 'As a Backend Developer Intern, you will work closely with our development team to design, develop, and maintain server-side logic, databases, and APIs. You will gain hands-on experience in backend technologies, contribute to real-world projects, and learn how to optimize systems for performance, security, and scalability.',

      responsibilities: [

                'Assist in developing and maintaining backend services, APIs, and databases',

                'Collaborate with frontend developers to integrate user-facing elements with server-side logic',

                'Write clean, efficient, and well-documented code',

                'Support debugging, troubleshooting, and performance optimization efforts',

                'Participate in code reviews and learn industry best practices',

                'Stay updated with new backend technologies and development trends'

              ],

      requirements: [

                 'Pursuing a degree in Computer Science, IT, or related field',

                 'Knowledge of one or more backend languages (Node.js, Python, Java, or PHP)',

                 'Basic understanding of databases (SQL/NoSQL)',

                 'Familiarity with concepts like REST APIs and version control (Git)',

                 'Good problem-solving skills and eagerness to learn',

                 'Ability to work collaboratively in a team environment'

      ]

    }

];

  const handleApplicationSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setSubmitMessage('');

  try {
    // Validate ALL required fields
    const missingFields = [];
    
    if (!applicationData.name || applicationData.name.trim() === '') {
      missingFields.push('Full Name');
    }
    if (!applicationData.email || applicationData.email.trim() === '') {
      missingFields.push('Email Address');
    }
    if (!applicationData.phone || applicationData.phone.trim() === '') {
      missingFields.push('Phone Number');
    }
    if (!applicationData.experience || applicationData.experience.trim() === '') {
      missingFields.push('Years of Experience');
    }
    if (!applicationData.currentCompany || applicationData.currentCompany.trim() === '') {
      missingFields.push('Current Company/College');
    }
    if (!applicationData.expectedSalary || applicationData.expectedSalary.trim() === '') {
      missingFields.push('Expected Salary');
    }
    if (!applicationData.noticePeriod || applicationData.noticePeriod.trim() === '') {
      missingFields.push('Notice Period');
    }
    if (!applicationData.skills || applicationData.skills.trim() === '') {
      missingFields.push('Key Skills');
    }
    if (!applicationData.coverLetter || applicationData.coverLetter.trim() === '') {
      missingFields.push('Cover Letter');
    }
    if (!applicationData.resume) {
      missingFields.push('Resume/CV');
    }

    // If any fields are missing, show error message
    if (missingFields.length > 0) {
      setSubmitMessage(`⚠️ Please fill in the following required fields: ${missingFields.join(', ')}`);
      setIsSubmitting(false);
      
      // Scroll to error message
      const errorElement = document.querySelector('.submit-message');
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(applicationData.email)) {
      setSubmitMessage('⚠️ Please enter a valid email address (e.g., name@example.com)');
      setIsSubmitting(false);
      return;
    }

    // Validate phone number (basic validation - 10-15 digits)
    const cleanedPhone = applicationData.phone.replace(/[\s\-\(\)]/g, '');
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(cleanedPhone)) {
      setSubmitMessage('⚠️ Please enter a valid phone number (10-15 digits)');
      setIsSubmitting(false);
      return;
    }

    // Validate resume file type
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (applicationData.resume && !allowedTypes.includes(applicationData.resume.type)) {
      setSubmitMessage('⚠️ Resume must be in PDF, DOC, or DOCX format');
      setIsSubmitting(false);
      return;
    }

    // Validate file size (5MB max)
    if (applicationData.resume && applicationData.resume.size > 5 * 1024 * 1024) {
      setSubmitMessage('⚠️ Resume file size must be less than 5MB');
      setIsSubmitting(false);
      return;
    }

    // Validate experience field format (should contain numbers)
    if (applicationData.experience && !/\d/.test(applicationData.experience)) {
      setSubmitMessage('⚠️ Please enter a valid experience (e.g., "2 years" or "Fresher")');
      setIsSubmitting(false);
      return;
    }

    // Prepare data with position from selected job
    const formData = {
      name: applicationData.name.trim(),
      email: applicationData.email.trim(),
      phone: applicationData.phone.trim(),
      position: selectedJob.title,
      experience: applicationData.experience.trim(),
      currentCompany: applicationData.currentCompany.trim(),
      expectedSalary: applicationData.expectedSalary.trim(),
      noticePeriod: applicationData.noticePeriod.trim(),
      skills: applicationData.skills.trim(),
      coverLetter: applicationData.coverLetter.trim()
    };

    // Submit to backend
    const response = await submitJobApplication(formData, applicationData.resume);
    
    // Check if response indicates success
    if (response && response.success) {
      setSubmitMessage(`✅ ${response.message || 'Application submitted successfully! You will receive a confirmation email shortly.'}`);
      
      // Reset form after successful submission
      setApplicationData({
        name: '',
        email: '',
        phone: '',
        position: '',
        experience: '',
        currentCompany: '',
        expectedSalary: '',
        noticePeriod: '',
        skills: '',
        coverLetter: '',
        resume: null
      });
      
      // Reset file input
      const fileInput = document.getElementById('resume-upload');
      if (fileInput) fileInput.value = '';
      
      // Close form after 3 seconds
      setTimeout(() => {
        setShowApplication(false);
        setSelectedJob(null);
        setSubmitMessage('');
      }, 3000);
    } else {
      // Handle backend error response
      setSubmitMessage(`❌ ${response?.message || 'Failed to submit application. Please try again.'}`);
    }

  } catch (error) {
    console.error('Application submission error:', error);
    
    // Extract meaningful error message
    let errorMessage = 'Failed to submit application. Please try again.';
    
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    } else if (error.response?.data?.detail) {
      errorMessage = error.response.data.detail;
    } else if (error.message && !error.message.includes('[object Object]')) {
      errorMessage = error.message;
    } else if (typeof error === 'string') {
      errorMessage = error;
    }
    
    setSubmitMessage(`❌ ${errorMessage}`);
  } finally {
    setIsSubmitting(false);
  }
};

  const handleJobApplication = (job) => {
    setSelectedJob(job);
    setShowApplication(true);
  };

  // Filter jobs based on search term
  const filteredJobs = jobOpenings.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="careers-jobs-section">
      <div className="careers-container">
        <motion.div
          className="careers-back-btn"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <button
            onClick={() => navigate('/')}
            className="back-button"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </motion.div>

        <motion.div
          className="careers-jobs-header"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Current Job Openings</h1>
          <p>Discover exciting career opportunities at Talvyn Technologies. Join our team and help shape the future of technology.</p>
        </motion.div>

        {jobOpenings.length > 0 && (
          <motion.div
            className="search-section"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="search-container">
              <Search className="search-icon" />
              <input
                type="text"
                placeholder="Search jobs by title, department, location, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="clear-search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
            <div className="search-results-count">
              {filteredJobs.length} {filteredJobs.length === 1 ? 'position' : 'positions'} found
            </div>
          </motion.div>
        )}

        <div className="jobs-grid">
          {jobOpenings.length === 0 ? (
            <motion.div
              className="no-openings"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="no-openings-icon">
                <Users className="w-16 h-16" />
              </div>
              <h3>No Current Openings</h3>
              <p>We don't have any open positions at the moment, but we're always looking for talented individuals to join our team.</p>
              <div className="no-openings-actions">
                <p>Stay connected with us for future opportunities:</p>
                <div className="contact-options">
                  <a href="mailto:hr@talvyntechnologies.com" className="contact-btn primary">
                    <Send className="w-4 h-4" />
                    Send Your Resume
                  </a>
                  <button onClick={() => navigate('/')} className="contact-btn secondary">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </button>
                </div>
              </div>
            </motion.div>
          ) : filteredJobs.length > 0 ? filteredJobs.map((job, index) => (
            <motion.div
              key={index}
              className="job-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="job-header">
                <div className="job-info">
                  <h3 className="job-title">{job.title}</h3>
                  <div className="job-meta">
                    <div className="meta-item">
                      <Users className="w-4 h-4" />
                      {job.department}
                    </div>
                    <div className="meta-item">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                    <div className="meta-item">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </div>
                    <div className="meta-item">
                      <DollarSign className="w-4 h-4" />
                      {job.salary}
                    </div>
                  </div>
                </div>
                <button
                  className="apply-button"
                  onClick={() => handleJobApplication(job)}
                >
                  View Details & Apply
                </button>
              </div>
              <div className="job-content">
                <p className="job-description">{job.description}</p>
                <div className="job-requirements">
                  <h4>Key Requirements:</h4>
                  <ul>
                    {job.requirements.slice(0, 3).map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                    {job.requirements.length > 3 && (
                      <li className="more-requirements">+ {job.requirements.length - 3} more requirements</li>
                    )}
                  </ul>
                </div>
              </div>
            </motion.div>
          )) : (
            <motion.div
              className="no-results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Search className="no-results-icon" />
              <h3>No positions found</h3>
              <p>We couldn't find any positions matching "{searchTerm}". Try adjusting your search terms or browse all available positions.</p>
              <button
                onClick={() => setSearchTerm('')}
                className="clear-search-btn"
              >
                View All Positions
              </button>
            </motion.div>
          )}
        </div>

        <motion.div
          className="jobs-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p>Don't see a position that fits? We're always looking for talented individuals.</p>
          <p>Contact us at <a href="mailto:hr@talvyntechnologies.com" className="footer-email-link">hr@talvyntechnologies.com</a> to discuss other opportunities.</p>
        </motion.div>
      </div>

      {/* Application Modal */}
      {showApplication && selectedJob && (
        <div className="application-modal-overlay">
          <div className="application-modal">
            <div className="modal-header">
              <h2>Apply for {selectedJob.title}</h2>
              <button 
                className="close-modal"
                onClick={() => setShowApplication(false)}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="modal-content">
              <div className="job-details">
                <h3>About This Role</h3>
                <p>{selectedJob.detailedDescription}</p>
                
                <div className="responsibilities">
                  <h4>Key Responsibilities</h4>
                  <ul>
                    {selectedJob.responsibilities.map((responsibility, idx) => (
                      <li key={idx}>{responsibility}</li>
                    ))}
                  </ul>
                </div>

                <div className="requirements">
                  <h4>Requirements</h4>
                  <ul>
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="compensation">
                  <h4>Compensation & Benefits</h4>
                  <p><strong>Salary:</strong> {selectedJob.salary}</p>
                  <ul>
                    <li>• Health insurance coverage</li>
                    <li>• Flexible working arrangements</li>
                    <li>• Professional development opportunities</li>
                    <li>• Performance-based bonuses</li>
                  </ul>
                </div>
              </div>

              <div className="application-form">
                <h3>Apply for This Position</h3>
                <p className="form-note">All fields marked with * are required</p>
                
                <form onSubmit={handleApplicationSubmit}>
                  <div className="form-field">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      value={applicationData.name}
                      onChange={(e) => setApplicationData({...applicationData, name: e.target.value})}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      value={applicationData.email}
                      onChange={(e) => setApplicationData({...applicationData, email: e.target.value})}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      value={applicationData.phone}
                      onChange={(e) => setApplicationData({...applicationData, phone: e.target.value})}
                      placeholder="+91 1234567890"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Years of Experience *</label>
                      <input
                        type="text"
                        value={applicationData.experience}
                        onChange={(e) => setApplicationData({...applicationData, experience: e.target.value})}
                        placeholder="e.g., 3 years or Fresher"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Current Company/College *</label>
                      <input
                        type="text"
                        value={applicationData.currentCompany}
                        onChange={(e) => setApplicationData({...applicationData, currentCompany: e.target.value})}
                        placeholder="Your current organization"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-field">
                      <label>Expected Salary *</label>
                      <input
                        type="text"
                        value={applicationData.expectedSalary}
                        onChange={(e) => setApplicationData({...applicationData, expectedSalary: e.target.value})}
                        placeholder="e.g., ₹8-10 LPA or Negotiable"
                        required
                      />
                    </div>
                    <div className="form-field">
                      <label>Notice Period *</label>
                      <input
                        type="text"
                        value={applicationData.noticePeriod}
                        onChange={(e) => setApplicationData({...applicationData, noticePeriod: e.target.value})}
                        placeholder="e.g., 30 days, Immediate"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-field">
                    <label>Key Skills *</label>
                    <textarea
                      value={applicationData.skills}
                      onChange={(e) => setApplicationData({...applicationData, skills: e.target.value})}
                      placeholder="List your key technical skills, separated by commas (e.g., JavaScript, React, Node.js, Python)"
                      rows="3"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Cover Letter *</label>
                    <textarea
                      value={applicationData.coverLetter}
                      onChange={(e) => setApplicationData({...applicationData, coverLetter: e.target.value})}
                      placeholder="Tell us why you're interested in this role and what makes you a great fit for our team..."
                      rows="5"
                      required
                    />
                  </div>

                  <div className="form-field">
                    <label>Resume/CV *</label>
                    <div className="file-upload">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => setApplicationData({...applicationData, resume: e.target.files[0]})}
                        required
                        style={{ display: 'none' }}
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="file-upload-label">
                        <FileText className="w-8 h-8" />
                        <p>{applicationData.resume ? applicationData.resume.name : 'Click to upload or drag and drop'}</p>
                        <span>PDF, DOC, DOCX (max 5MB)</span>
                      </label>
                    </div>
                  </div>

                  <button type="submit" className="submit-application" disabled={isSubmitting}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSubmitting ? 'Submitting Application...' : 'Submit Application'}
                  </button>

                  {submitMessage && (
                    <div className={`submit-message ${submitMessage.includes('❌') || submitMessage.includes('⚠️') ? 'error' : 'success'}`}>
                      {submitMessage}
                    </div>
                  )}

                  <p className="privacy-notice">
                    By submitting this application, you agree to our privacy policy and terms of service. All fields are required to process your application.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    <Footer />
    </>
  );
};

export default JobOpenings;