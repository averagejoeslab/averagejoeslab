# Average Joes Lab Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Development Options

Choose your preferred development environment:

### Option 1: Docker Development (Recommended for Security)

Docker provides an isolated, secure development environment that mitigates potential security vulnerabilities in development dependencies.

#### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

#### Quick Start
```bash
# Start the development environment
docker compose up -d

# View logs
docker compose logs -f

# Stop the environment
docker compose down
```

#### Development Commands
```bash
# Start with development overrides
docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Run npm commands inside the container
docker compose exec docusaurus npm install
docker compose exec docusaurus npm run build

# Access container shell for debugging
docker compose exec docusaurus sh

# Rebuild container after dependency changes
docker compose build --no-cache
```

The site will be available at [http://localhost:3000](http://localhost:3000)

### Option 2: Local Development (Traditional)

#### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)
- npm or yarn

#### Installation
```bash
npm install
# or
yarn install
```

#### Local Development
```bash
npm start
# or
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Building for Production

### Docker Build
```bash
# Build production image
docker build -t averagejoeslab .

# Run production build
docker run -p 3000:3000 averagejoeslab
```

### Local Build
```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

For manual deployment:

```bash
GIT_USER=<Your GitHub username> npm run deploy
# or
GIT_USER=<Your GitHub username> yarn deploy
```

## Security Notes

This project uses Docker for development to provide:
- **Isolated environment**: Protects your host system from potential vulnerabilities
- **Consistent setup**: Same environment across different machines
- **Enhanced security**: Mitigates risks from development dependencies like webpack-dev-server

The Docker setup includes security best practices:
- Non-root user execution
- Read-only root filesystem
- Limited container capabilities
- Network isolation

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes using either development option above
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).
