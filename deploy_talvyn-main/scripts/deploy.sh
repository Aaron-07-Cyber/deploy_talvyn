#!/bin/bash
# Talvyn Technologies - Production Deployment Script

set -e

echo "🚀 Talvyn Technologies - Production Deployment"
echo "=============================================="

# Check requirements
check_requirements() {
    echo "📋 Checking requirements..."
    
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed" 
        exit 1
    fi
    
    if [ ! -f .env.production ]; then
        echo "❌ .env.production file not found"
        echo "Please create .env.production with your production settings"
        exit 1
    fi
    
    echo "✅ Requirements met"
}

# Build containers
build_containers() {
    echo "🔨 Building containers..."
    docker-compose -f docker-compose.prod.yml build --no-cache
    echo "✅ Containers built"
}

# Deploy services
deploy_services() {
    echo "🚀 Deploying services..."
    docker-compose -f docker-compose.prod.yml up -d
    echo "✅ Services deployed"
}

# Check health
check_health() {
    echo "🏥 Checking service health..."
    
    # Wait for backend to be healthy
    for i in {1..30}; do
        if curl -f http://localhost:8000/api/health > /dev/null 2>&1; then
            echo "✅ Backend is healthy"
            break
        fi
        echo "⏳ Waiting for backend... ($i/30)"
        sleep 2
    done
    
    # Check frontend
    if curl -f http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Frontend is healthy"
    else
        echo "⚠️ Frontend health check failed"
    fi
}

# Main deployment flow
main() {
    check_requirements
    build_containers
    deploy_services
    check_health
    
    echo ""
    echo "🎉 Deployment complete!"
    echo "Frontend: http://localhost:3000"
    echo "Backend:  http://localhost:8000" 
    echo "API Docs: http://localhost:8000/docs"
    echo ""
    echo "To view logs: docker-compose -f docker-compose.prod.yml logs -f"
    echo "To stop:      docker-compose -f docker-compose.prod.yml down"
}

main "$@"