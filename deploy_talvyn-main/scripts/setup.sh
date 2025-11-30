#!/bin/bash
# Talvyn Technologies - Initial Setup Script

set -e

echo "🏗️ Talvyn Technologies - Initial Setup"
echo "======================================"

# Setup environment
setup_environment() {
    echo "📋 Setting up environment..."
    
    if [ ! -f .env ]; then
        cp .env.example .env
        echo "✅ Created .env file from template"
        echo "⚠️ Please edit .env with your SMTP credentials"
    else
        echo "✅ .env file already exists"
    fi
}

# Check Docker
check_docker() {
    echo "🐳 Checking Docker..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed"
        echo "Please install Docker: https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed"
        echo "Please install Docker Compose: https://docs.docker.com/compose/install/"
        exit 1
    fi
    
    echo "✅ Docker and Docker Compose are installed"
}

# Setup directories
setup_directories() {
    echo "📁 Setting up directories..."
    
    mkdir -p backend/uploads
    mkdir -p logs
    
    echo "✅ Directories created"
}

# Install frontend dependencies (optional for Docker)
install_frontend_deps() {
    echo "📦 Installing frontend dependencies (optional)..."
    
    if command -v npm &> /dev/null; then
        cd frontend
        npm install
        cd ..
        echo "✅ Frontend dependencies installed"
    else
        echo "⚠️ npm not found, skipping frontend dependencies"
        echo "This is okay if you're only using Docker"
    fi
}

# Setup backend virtual environment (optional for Docker)
setup_backend_venv() {
    echo "🐍 Setting up backend virtual environment (optional)..."
    
    if command -v python3 &> /dev/null; then
        cd backend
        python3 -m venv venv
        source venv/bin/activate
        pip install -r requirements.txt
        cd ..
        echo "✅ Backend virtual environment created"
    else
        echo "⚠️ Python3 not found, skipping virtual environment"
        echo "This is okay if you're only using Docker"
    fi
}

# Main setup
main() {
    check_docker
    setup_environment
    setup_directories
    install_frontend_deps
    setup_backend_venv
    
    echo ""
    echo "🎉 Setup complete!"
    echo ""
    echo "Next steps:"
    echo "1. Edit .env with your SMTP credentials"
    echo "2. Run: docker-compose up -d"
    echo "3. Visit: http://localhost:3000"
    echo ""
    echo "For help: make help"
}

main "$@"