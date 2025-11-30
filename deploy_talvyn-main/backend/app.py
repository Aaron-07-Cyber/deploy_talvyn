from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from email.mime.base import MIMEBase
from email import encoders
import os
from datetime import datetime
import logging
from typing import Optional
import aiofiles
import uuid
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Talvyn Technologies Backend API",
    description="Backend API for job applications and contact forms",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify your domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email configuration
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp-mail.outlook.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
HR_EMAIL = os.getenv("HR_EMAIL", "hr@talvyntechnologies.com")

# Data models
class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str
    company: str
    serviceInterest: str
    message: str

class JobApplication(BaseModel):
    name: str
    email: EmailStr
    phone: str
    position: str
    experience: str
    currentCompany: str
    expectedSalary: str
    noticePeriod: str
    skills: str
    coverLetter: str

# Utility functions
def send_email(to_email: str, subject: str, body: str, attachment_path: str = None, reply_to: str = None, from_name: str = None):
    """Send email with improved delivery and spam prevention"""
    try:
        logger.info(f"Attempting to send email to {to_email}")
        logger.info(f"SMTP Server: {SMTP_SERVER}:{SMTP_PORT}")
        logger.info(f"SMTP Username: {SMTP_USERNAME}")
        
        msg = MIMEMultipart('related')
        
        # Improved headers for better deliverability
        msg['From'] = f"Talvyn Technologies <{SMTP_USERNAME}>"
        msg['To'] = to_email
        msg['Subject'] = subject
        msg['Message-ID'] = f"<{uuid.uuid4()}@talvyntechnologies.com>"
        msg['Date'] = datetime.now().strftime("%a, %d %b %Y %H:%M:%S %z")
        
        # Add important headers for spam prevention
        msg['X-Mailer'] = 'Talvyn Technologies Application v1.0'
        msg['X-Priority'] = '3'
        msg['Importance'] = 'Normal'
        
        if reply_to:
            msg['Reply-To'] = reply_to
            logger.info(f"Reply-To set to: {reply_to}")
        
        # Create HTML body with better structure
        html_body = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>{subject}</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            {body}
            <br>
            <hr style="border: 1px solid #ddd; margin: 20px 0;">
            <p style="font-size: 12px; color: #666;">
                This email was sent from Talvyn Technologies contact system.<br>
                If you did not expect this email, please ignore it.
            </p>
        </body>
        </html>
        """
        
        msg.attach(MIMEText(html_body, 'html', 'utf-8'))
        
        # Add attachment if provided
        if attachment_path and os.path.exists(attachment_path):
            with open(attachment_path, "rb") as attachment:
                part = MIMEBase('application', 'octet-stream')
                part.set_payload(attachment.read())
                encoders.encode_base64(part)
                part.add_header(
                    'Content-Disposition',
                    f'attachment; filename="{os.path.basename(attachment_path)}"'
                )
                msg.attach(part)
        
        logger.info("Connecting to SMTP server...")
        
        # Try different connection methods for better AWS compatibility
        try:
            # Primary method - SMTP with STARTTLS
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=30)
            server.starttls()
        except:
            # Fallback method - SMTP_SSL
            try:
                server = smtplib.SMTP_SSL(SMTP_SERVER, 465, timeout=30)
            except:
                # Final fallback
                server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT, timeout=30)
                server.starttls()
        
        logger.info("Attempting login...")
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        
        logger.info("Sending message...")
        # Use send_message for better header handling
        refused = server.send_message(msg)
        
        if refused:
            logger.warning(f"Some recipients were refused: {refused}")
        
        server.quit()
        
        logger.info(f"Email sent successfully to {to_email}")
        
        # Add delay to prevent rate limiting
        import time
        time.sleep(1)
        
        return True
        
    except smtplib.SMTPRecipientsRefused as e:
        logger.error(f"Recipients refused for {to_email}: {str(e)}")
        logger.error("Check if recipient email address is valid")
        return False
    except smtplib.SMTPAuthenticationError as e:
        logger.error(f"SMTP Authentication failed for {to_email}: {str(e)}")
        logger.error("Check SMTP credentials and app password")
        return False
    except smtplib.SMTPDataError as e:
        logger.error(f"SMTP Data error for {to_email}: {str(e)}")
        logger.error("Email content may be rejected as spam")
        return False
    except smtplib.SMTPException as e:
        logger.error(f"SMTP error sending email to {to_email}: {str(e)}")
        return False
    except Exception as e:
        logger.error(f"Unexpected error sending email to {to_email}: {str(e)}")
        logger.error(f"Error type: {type(e).__name__}")
        return False

def generate_hr_job_email(application: JobApplication, resume_filename: str):
    """Generate HTML email for HR about new job application"""
    return f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .header {{ background-color: #00704A; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .section {{ margin-bottom: 20px; padding: 15px; border-left: 4px solid #00704A; background-color: #f9f9f9; }}
                .label {{ font-weight: bold; color: #00704A; }}
                .footer {{ background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h2>New Job Application - Talvyn Technologies</h2>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Candidate Information</h3>
                    <p><span class="label">Name:</span> {application.name}</p>
                    <p><span class="label">Email:</span> {application.email}</p>
                    <p><span class="label">Phone:</span> {application.phone}</p>
                    <p><span class="label">Position Applied:</span> {application.position}</p>
                </div>
                
                <div class="section">
                    <h3>Professional Details</h3>
                    <p><span class="label">Experience:</span> {application.experience}</p>
                    <p><span class="label">Current Company:</span> {application.currentCompany}</p>
                    <p><span class="label">Expected Salary:</span> {application.expectedSalary}</p>
                    <p><span class="label">Notice Period:</span> {application.noticePeriod}</p>
                    <p><span class="label">Skills:</span> {application.skills}</p>
                </div>
                
                <div class="section">
                    <h3>Cover Letter</h3>
                    <p>{application.coverLetter}</p>
                </div>
                
                <div class="section">
                    <p><span class="label">Resume:</span> {resume_filename} (attached)</p>
                    <p><span class="label">Application Date:</span> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                </div>
            </div>
            
            <div class="footer">
                <p>This application was submitted through Talvyn Technologies career portal.</p>
            </div>
        </body>
    </html>
    """

def generate_candidate_confirmation_email(name: str, position: str):
    """Generate confirmation email for candidate"""
    return f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .header {{ background-color: #00704A; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .highlight {{ background-color: #e8f5e8; padding: 15px; border-radius: 5px; margin: 15px 0; }}
                .footer {{ background-color: #f0f0f0; padding: 15px; text-align: center; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h2>Application Received - Talvyn Technologies</h2>
            </div>
            
            <div class="content">
                <h3>Dear {name},</h3>
                
                <p>Thank you for your interest in joining Talvyn Technologies!</p>
                
                <div class="highlight">
                    <p><strong>Your application for the position of "{position}" has been successfully received.</strong></p>
                </div>
                
                <p>Here's what happens next:</p>
                <ul>
                    <li>Our HR team will review your application within 2-3 business days</li>
                    <li>If your profile matches our requirements, we'll contact you for the next steps</li>
                    <li>You can expect to hear back from us within a week</li>
                </ul>
                
                <p>We appreciate your patience during our review process.</p>
                
                <p>If you have any questions, feel free to reach out to us at <a href="mailto:hr@talvyntechnologies.com">hr@talvyntechnologies.com</a></p>
                
                <p>Best regards,<br>
                <strong>HR Team</strong><br>
                Talvyn Technologies</p>
            </div>
            
            <div class="footer">
                <p>© 2024 Talvyn Technologies. All rights reserved.</p>
            </div>
        </body>
    </html>
    """

def generate_hr_contact_email(contact: ContactForm):
    """Generate HTML email for HR about new contact inquiry"""
    return f"""
    <html>
        <head>
            <style>
                body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                .header {{ background-color: #00704A; color: white; padding: 20px; text-align: center; }}
                .content {{ padding: 20px; }}
                .section {{ margin-bottom: 20px; padding: 15px; border-left: 4px solid #00704A; background-color: #f9f9f9; }}
                .label {{ font-weight: bold; color: #00704A; }}
                .footer {{ background-color: #f0f0f0; padding: 15px; text-align: center; font-size: 12px; }}
            </style>
        </head>
        <body>
            <div class="header">
                <h2>New Contact Inquiry - Talvyn Technologies</h2>
            </div>
            
            <div class="content">
                <div class="section">
                    <h3>Contact Information</h3>
                    <p><span class="label">Name:</span> {contact.name}</p>
                    <p><span class="label">Email:</span> {contact.email}</p>
                    <p><span class="label">Phone:</span> {contact.phone}</p>
                    <p><span class="label">Company:</span> {contact.company}</p>
                    <p><span class="label">Service Interest:</span> {contact.serviceInterest}</p>
                </div>
                
                <div class="section">
                    <h3>Message</h3>
                    <p>{contact.message}</p>
                </div>
                
                <div class="section">
                    <p><span class="label">Inquiry Date:</span> {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</p>
                </div>
            </div>
            
            <div class="footer">
                <p>This inquiry was submitted through Talvyn Technologies contact form.</p>
            </div>
        </body>
    </html>
    """

# API Endpoints
@app.post("/api/job-application")
async def submit_job_application(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    position: str = Form(...),
    experience: str = Form(...),
    currentCompany: str = Form(...),
    expectedSalary: str = Form(...),
    noticePeriod: str = Form(...),
    skills: str = Form(...),
    coverLetter: str = Form(...),
    resume: UploadFile = File(...)
):
    """Handle job application submission"""
    try:
        # Validate file type
        allowed_types = ['application/pdf', 'application/msword', 
                        'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
        if resume.content_type not in allowed_types:
            raise HTTPException(status_code=400, detail="Only PDF and DOC/DOCX files are allowed")
        
        # Generate unique filename
        file_extension = resume.filename.split('.')[-1]
        unique_filename = f"{uuid.uuid4()}_{name.replace(' ', '_')}_resume.{file_extension}"
        file_path = f"uploads/{unique_filename}"
        
        # Create uploads directory if it doesn't exist
        os.makedirs("uploads", exist_ok=True)
        
        # Save uploaded resume
        async with aiofiles.open(file_path, 'wb') as f:
            content = await resume.read()
            await f.write(content)
        
        # Create application object
        application = JobApplication(
            name=name,
            email=email,
            phone=phone,
            position=position,
            experience=experience,
            currentCompany=currentCompany,
            expectedSalary=expectedSalary,
            noticePeriod=noticePeriod,
            skills=skills,
            coverLetter=coverLetter
        )
        
        # Send email to HR appearing to come from applicant
        hr_email_body = generate_hr_job_email(application, resume.filename)
        hr_email_sent = send_email(
            HR_EMAIL, 
            f"Job Application - {position}",
            hr_email_body,
            file_path,
            reply_to=email,  # HR can reply directly to applicant
            from_name=name  # Just the applicant's name
        )
        
        # Send confirmation email to candidate
        candidate_email_body = generate_candidate_confirmation_email(name, position)
        candidate_email_sent = send_email(
            email,
            "Application Received - Talvyn Technologies",
            candidate_email_body,
            None,  # No attachment for confirmation email
            reply_to=HR_EMAIL,
            from_name="Talvyn Technologies HR"
        )
        
        # Clean up uploaded file after sending
        if os.path.exists(file_path):
            os.remove(file_path)
        
        # Handle different email sending scenarios
        if hr_email_sent and candidate_email_sent:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Application submitted successfully! You will receive a confirmation email shortly."
                }
            )
        elif hr_email_sent and not candidate_email_sent:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Application submitted successfully! Our team has received your application and will contact you soon."
                }
            )
        elif not hr_email_sent and candidate_email_sent:
            logger.error(f"Failed to send HR email for job application from {email}")
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": "There was an issue processing your application. Please try again or contact us directly."
                }
            )
        else:
            logger.error(f"Failed to send both HR and candidate emails for job application from {email}")
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": "There was an issue processing your application. Please try again or contact us directly at hr@talvyntechnologies.com."
                }
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error processing job application from {email if 'email' in locals() else 'unknown'}: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "An unexpected error occurred. Please try again later or contact us directly."
            }
        )


@app.post("/api/contact")
async def submit_contact_form(contact: ContactForm):
    """Handle contact form submission"""
    try:
        # Send email to HR appearing to come from customer
        hr_email_body = generate_hr_contact_email(contact)
        hr_email_sent = send_email(
            HR_EMAIL,
            f"Contact Inquiry - {contact.serviceInterest}",
            hr_email_body,
            None,  # No attachment for contact form
            reply_to=contact.email,  # HR can reply directly to customer
            from_name=contact.name  # Just the customer's name
        )
        
        if hr_email_sent:
            return JSONResponse(
                status_code=200,
                content={
                    "success": True,
                    "message": "Your message has been sent successfully! We'll get back to you within 24 hours."
                }
            )
        else:
            logger.error(f"Failed to send contact form email from {contact.email}")
            return JSONResponse(
                status_code=500,
                content={
                    "success": False,
                    "message": "There was an issue sending your message. Please try again or contact us directly at hr@talvyntechnologies.com."
                }
            )
            
    except Exception as e:
        logger.error(f"Unexpected error processing contact form from {contact.email if 'contact' in locals() else 'unknown'}: {str(e)}")
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "An unexpected error occurred. Please try again later or contact us directly at hr@talvyntechnologies.com."
            }
        )

@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)