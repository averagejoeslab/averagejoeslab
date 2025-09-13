# Security Policy

## Development Environment Security

This project uses Docker for development to provide enhanced security and isolation.

### Docker Security Features

- **Non-root user execution**: Container runs as `docusaurus` user (UID 1001)
- **Alpine Linux base**: Minimal attack surface with security updates
- **Isolated environment**: Protects host system from development dependencies
- **Regular security scanning**: Automated Trivy scans on every change

### Automated Security Scanning

We run automated security scans using Trivy:

- **On every push** to main branch
- **On every pull request**
- **Weekly scheduled scans** (Mondays at 2 AM UTC)
- **Manual triggers** available

Scan results are available in the **Security** tab of this repository.

### Known Development Dependencies

The following vulnerabilities are expected in the development environment:

#### webpack-dev-server (CVE-2025-30359, CVE-2025-30360)
- **Severity**: Medium
- **Impact**: Development-only, information exposure
- **Mitigation**: Docker isolation protects against browser-based attacks
- **Status**: Waiting for Docusaurus to update dependencies

### Reporting Security Issues

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT open a public issue**
2. **Use GitHub Security Advisories**: Go to Security tab → Report a vulnerability
3. **Include**: 
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact assessment
   - Suggested fix (if known)

We will respond within 48 hours and provide updates on remediation progress.

### Security Best Practices for Contributors

When contributing to this project:

1. **Use Docker for development**: `docker compose up`
2. **Keep dependencies updated**: Regular `npm audit` checks
3. **Report suspicious behavior**: Any unusual container or application behavior
4. **Follow secure coding practices**: Input validation, proper error handling
5. **Review security scan results**: Check the Security tab before merging PRs

### Dependency Management

- **Automated updates**: Dependabot monitors for security updates
- **Manual review**: Security-related updates require manual review
- **Testing**: All updates are tested in the containerized environment
- **Documentation**: Security changes are documented in commit messages

### Container Security Measures

Our Docker setup includes:

- **Minimal base image**: Alpine Linux with security patches
- **Non-privileged execution**: No root access within container
- **Network isolation**: Container network separation
- **Regular base image updates**: Automated through Dependabot
- **Vulnerability scanning**: Trivy scans on every change

For questions about security practices, please reach out to the maintainers.
