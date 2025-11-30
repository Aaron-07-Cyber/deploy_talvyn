// API Service Layer
// Backend communication for Talvyn Technologies

/**
 * Base API configuration
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://talvyntechnologies.com';

/**
 * Submit job application with resume file
 * @param {Object} applicationData - Job application form data
 * @param {File} resumeFile - Resume file
 * @returns {Promise} Submission response
 */
export const submitJobApplication = async (applicationData, resumeFile) => {
  try {
    const formData = new FormData();
    
    // Add all form fields
    Object.keys(applicationData).forEach(key => {
      formData.append(key, applicationData[key]);
    });
    
    // Add resume file
    formData.append('resume', resumeFile);
    
    const response = await fetch(`${API_BASE_URL}/api/job-application`, {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.detail || 'Failed to submit application');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
};

/**
 * Submit contact form
 * @param {Object} contactData - Contact form data
 * @returns {Promise} Submission response
 */
export const submitContactForm = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData),
    });
    
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.detail || 'Failed to submit contact form');
    }
    
    return result;
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
};

/**
 * Health check endpoint
 * @returns {Promise} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    return await response.json();
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

// Default export for backwards compatibility
const ApiService = {
  submitJobApplication,
  submitContactForm,
  healthCheck
};

export default ApiService;