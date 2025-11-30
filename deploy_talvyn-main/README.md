# Talvyn Technologies

Full-stack web application with React 19 frontend and FastAPI backend, featuring email services for job applications and contact forms.

## 🏗️ Project Structure

```
Talvyn/
├── frontend/           # React 19 + Vite application
│   ├── src/           # React components, pages, services
│   ├── public/        # Static assets
│   ├── package.json   # Frontend dependencies
│   └── Dockerfile     # Frontend container config
├── backend/           # FastAPI Python application
│   ├── app.py         # Main FastAPI app
│   ├── requirements.txt # Python dependencies
│   ├── Dockerfile     # Backend container config
│   └── uploads/       # Resume upload directory
├── docker-compose.yml # Container orchestration
├── .env.example      # Environment template
└── .gitignore        # Git ignore rules
```

## 🚀 Features

- **Modern React 19** with Vite build system
- **FastAPI Backend** with async email processing
- **Docker Containerization** for consistent deployment
- **File Upload Support** for job applications (PDF, DOC, DOCX)
- **SMTP Email Integration** with Outlook/Gmail support
- **Production Ready** with proper logging and error handling

## 🛠️ Tech Stack

**Frontend:**
- React 19, JavaScript ES6+, Vite
- Framer Motion, AOS animations
- Bootstrap, Lucide React icons
- React Router DOM

**Backend:**
- FastAPI, Python 3.11
- Pydantic validation
- SMTP email services
- Docker containerization

## 🚦 Quick Start

### Prerequisites
- Docker & Docker Compose
- Git

### 1. Clone & Setup
```bash
git clone <repository-url>
cd Talvyn
cp .env.example .env
```

### 2. Configure Environment
Edit `.env` with your SMTP credentials:
```env
SMTP_SERVER=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USERNAME=your-email@outlook.com
SMTP_PASSWORD=your-app-password
HR_EMAIL=hr@talvyntechnologies.com
```

**Get Outlook App Password:**
1. Go to https://account.microsoft.com/security
2. Advanced security options → App passwords
3. Generate password for "Mail"

### 3. Deploy
```bash
docker-compose up -d
```

### 4. Access Applications
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Docs**: http://localhost:8000/docs

## 🔧 Development

### Local Development (Alternative)

**Frontend:**
```bash
cd frontend
npm install
npm run dev     # http://localhost:5173
npm run build   # Production build
npm run lint    # Code quality check
```

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env  # Configure SMTP settings
python -m uvicorn app:app --reload --host 0.0.0.0 --port 8000
```

## 📚 API Endpoints

- `POST /api/job-application` - Submit job application with resume
- `POST /api/contact` - Submit contact form
- `GET /api/health` - Health check

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose up --build

# View status
docker-compose ps
```

## 🌐 Production Deployment

### AWS EC2 Deployment (Recommended)

Deploy to AWS EC2 with Elastic IP and Nginx reverse proxy:

**📖 Full Guide**: See [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md) for complete step-by-step instructions

**⚡ Quick Start**: See [DEPLOYMENT_QUICKSTART.md](./DEPLOYMENT_QUICKSTART.md) for condensed reference

**🚀 Automated Deployment**:
```bash
# SSH into your EC2 instance, then run:
./deploy-aws.sh
```

**🔧 Troubleshooting**:
```bash
# Run diagnostics and fixes:
./troubleshoot.sh
```

### Manual Production Setup

1. **Update environment variables** for production
2. **Set up SSL/TLS** certificates
3. **Configure reverse proxy** (Nginx/Apache)
4. **Set up monitoring** and logging
5. **Implement backup strategy**

See deployment guides for detailed instructions.

## 🔒 Security

- Environment variables for sensitive data
- Input validation with Pydantic
- File type restrictions for uploads
- CORS configuration
- HTTPS in production

## 📝 License

Proprietary - All rights reserved by Talvyn Technologies

## 📞 Support

- **Email**: hr@talvyntechnologies.com
- **Issues**: Create GitHub issue for technical problems