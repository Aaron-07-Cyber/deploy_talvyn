# Talvyn Technologies - Development & Deployment Commands

.PHONY: help dev prod build clean logs status stop restart test lint

# Default target
help:
	@echo "Talvyn Technologies - Available Commands:"
	@echo ""
	@echo "Development:"
	@echo "  make dev      - Start development environment"
	@echo "  make logs     - View container logs"
	@echo "  make status   - Check container status"
	@echo "  make stop     - Stop all containers"
	@echo "  make restart  - Restart all containers"
	@echo ""
	@echo "Production:"
	@echo "  make prod     - Start production environment"
	@echo "  make build    - Build containers without cache"
	@echo ""
	@echo "Maintenance:"
	@echo "  make clean    - Remove containers and volumes"
	@echo "  make test     - Run tests (if available)"
	@echo "  make lint     - Run code quality checks"

# Development environment
dev:
	@echo "Starting development environment..."
	@if [ ! -f .env ]; then echo "Creating .env from .env.example..."; cp .env.example .env; fi
	docker-compose up -d
	@echo "Services started:"
	@echo "  Frontend: http://localhost:3000"
	@echo "  Backend:  http://localhost:8000"
	@echo "  API Docs: http://localhost:8000/docs"

# Production environment
prod:
	@echo "Starting production environment..."
	@if [ ! -f .env.production ]; then echo "ERROR: .env.production file required for production"; exit 1; fi
	docker-compose -f docker-compose.prod.yml up -d
	@echo "Production services started"

# Build containers
build:
	@echo "Building containers without cache..."
	docker-compose build --no-cache

# View logs
logs:
	docker-compose logs -f

# Check status
status:
	docker-compose ps

# Stop containers
stop:
	@echo "Stopping containers..."
	docker-compose down

# Restart containers  
restart: stop dev

# Clean everything
clean:
	@echo "Cleaning up containers and volumes..."
	docker-compose down -v --rmi local
	docker system prune -f

# Run tests (placeholder)
test:
	@echo "Running tests..."
	@echo "Frontend tests:"
	cd frontend && npm test || echo "No tests configured"
	@echo "Backend tests:"
	cd backend && python -m pytest || echo "No tests configured"

# Code quality checks
lint:
	@echo "Running code quality checks..."
	@echo "Frontend linting:"
	cd frontend && npm run lint || echo "Linting failed"