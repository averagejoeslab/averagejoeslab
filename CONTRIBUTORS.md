# Contributors Guide

Welcome to Average Joes Lab! This guide will help you set up your development environment and contribute to the project.

## Development Environment Setup

### Option 1: Docker Development (Recommended)

We use Docker for local development to provide:
- **Isolated environment**: Protects your system from potential security vulnerabilities
- **Consistent setup**: Same environment across Windows, Mac, and Linux
- **Easy onboarding**: No need to manage Node.js versions or dependencies locally

#### Prerequisites
- [Docker Desktop](https://docs.docker.com/get-docker/) installed and running

#### Quick Start
```bash
# Clone the repository
git clone https://github.com/averagejoeslab/averagejoeslab.git
cd averagejoeslab

# Start the development container
docker compose up

# The site will be available at http://localhost:3000
```

#### Development Workflow
```bash
# Start development (runs in foreground with logs)
docker compose up

# Start development (runs in background)
docker compose up -d

# View logs when running in background
docker compose logs -f

# Stop the development environment
docker compose down

# Rebuild container after dependency changes
docker compose build --no-cache
```

#### Making Changes
1. **Edit files** in your favorite editor - changes will be reflected immediately
2. **Hot reload** is enabled - the site updates automatically when you save files
3. **View changes** at http://localhost:3000
4. **Test thoroughly** before committing

#### Running Commands Inside Container
```bash
# Install new dependencies
docker compose exec docusaurus npm install

# Run build to test production build
docker compose exec docusaurus npm run build

# Access container shell for debugging
docker compose exec docusaurus sh

# Run any npm script
docker compose exec docusaurus npm run [script-name]
```

### Option 2: Local Development (Alternative)

If you prefer not to use Docker:

#### Prerequisites
- [Node.js](https://nodejs.org/) version 18 or higher
- npm or yarn

#### Setup
```bash
# Install dependencies
npm install

# Start development server
npm start

# Site available at http://localhost:3000
```

## Project Structure

```
averagejoeslab/
├── docs/                          # Documentation content
│   ├── foundations/               # STEM Foundations Learning Path
│   └── research-engineering/      # Research Engineering Learning Path
├── blog/                          # Blog posts
├── src/                           # React components and pages
├── static/                        # Static assets
├── .github/workflows/             # GitHub Actions
│   ├── deploy.yml                 # Production deployment
│   ├── security-scan.yml          # Security scanning
│   └── sync-notion-papers.yml     # Paper synchronization
├── Dockerfile                     # Development container
├── docker-compose.yml             # Development environment
└── README.md                      # Project overview
```

## Development vs Production

### Development Environment
- **Purpose**: Local development and testing
- **Technology**: Docker container with hot reload
- **URL**: http://localhost:3000
- **Security**: Isolated environment with vulnerability scanning

### Production Environment
- **Purpose**: Live website hosting
- **Technology**: GitHub Pages with static build
- **URL**: https://averagejoeslab.github.io (or custom domain)
- **Deployment**: Automated via GitHub Actions on push to main

**Important**: The Docker container is ONLY for development. The live site is built and deployed separately using GitHub Actions.

## Contributing Workflow

### 1. Setup Development Environment
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/averagejoeslab.git
cd averagejoeslab

# Start development container
docker compose up
```

### 2. Make Your Changes
- Edit documentation in `docs/` folder
- Add blog posts to `blog/` folder
- Modify React components in `src/` folder
- Test changes at http://localhost:3000

### 3. Test Your Changes
- **Visual testing**: Check the site looks correct
- **Link testing**: Verify all internal links work
- **Mobile testing**: Check responsive design
- **Build testing**: Run `docker compose exec docusaurus npm run build`

### 4. Submit Your Contribution
```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Commit your changes
git add .
git commit -m "Add: your descriptive commit message"

# Push to your fork
git push origin feature/your-feature-name

# Open a Pull Request on GitHub
```

## Security Scanning

### Automated Scans
- **Trivy security scans** run automatically on every PR and push
- **Results** are posted in PR comments and the Security tab
- **Vulnerabilities** in the development environment are monitored

### Manual Security Scan
```bash
# Build the container
docker compose build

# Run Trivy scan locally (if installed)
trivy image averagejoeslab-docusaurus
```

## Common Development Tasks

### Adding New Documentation
1. Create markdown files in `docs/` folder
2. Update `sidebars.ts` if needed for navigation
3. Test locally with Docker container
4. Submit PR with your changes

### Updating Dependencies
1. Update `package.json` or run `npm install package-name`
2. Rebuild container: `docker compose build --no-cache`
3. Test thoroughly
4. Include security scan results in PR

### Troubleshooting

#### Container Won't Start
```bash
# Check if Docker is running
docker --version

# Rebuild from scratch
docker compose down
docker compose build --no-cache
docker compose up
```

#### Port Already in Use
```bash
# Stop any existing containers
docker compose down

# Check what's using port 3000
lsof -i :3000

# Kill the process or use different port in docker-compose.yml
```

#### Permission Issues
```bash
# Rebuild container (it runs as non-root user)
docker compose build --no-cache

# Check container user
docker compose exec docusaurus whoami
```

## Code Style Guidelines

- **Markdown**: Use consistent formatting and proper heading hierarchy
- **Links**: Test all internal and external links
- **Images**: Optimize for web and include alt text
- **Code blocks**: Include language specification for syntax highlighting

## Getting Help

- **Discord**: [Join our community](https://discord.gg/7gzZMAPuGr)
- **Issues**: Open GitHub issues for bugs or feature requests
- **Discussions**: Use GitHub Discussions for questions
- **Security**: Use GitHub Security Advisories for security issues

Thank you for contributing to Average Joes Lab! 🎉
