# Average Joes Lab Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Development Options

### Option 1: Docker Development (Recommended)

Docker provides an isolated development environment that protects against security vulnerabilities and ensures consistent setup across different operating systems.

#### Prerequisites
- [Docker](https://docs.docker.com/get-docker/)

#### Quick Start
```bash
# Start the development environment
docker compose up

# Or run in background
docker compose up -d

# Stop the environment
docker compose down
```

The site will be available at [http://localhost:3000](http://localhost:3000)

#### Development Commands
```bash
# View logs
docker compose logs -f

# Run commands inside container
docker compose exec docusaurus npm install
docker compose exec docusaurus npm run build

# Access container shell
docker compose exec docusaurus sh

# Rebuild after dependency changes
docker compose build --no-cache
```

### Option 2: Local Development

#### Prerequisites
- [Node.js](https://nodejs.org/) (version 18 or higher)

#### Installation & Development
```bash
npm install
npm start
```

## Building for Production

```bash
npm run build
```

## Security Benefits of Docker Development

- **Isolation**: Protects your host system from potential vulnerabilities in development dependencies
- **Consistency**: Same environment across Windows, Mac, and Linux
- **Clean setup**: No need to manage Node.js versions locally
- **Enhanced security**: Mitigates webpack-dev-server vulnerabilities through containerization

## Contributing

1. Fork the repository
2. Use Docker development environment: `docker compose up`
3. Make your changes
4. Test your changes at http://localhost:3000
5. Commit and push your changes
6. Open a Pull Request