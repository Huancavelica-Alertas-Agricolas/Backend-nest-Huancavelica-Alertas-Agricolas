# Security Policy

## Supported Versions

We release patches for security vulnerabilities. Which versions are eligible for receiving such patches depends on the CVSS v3.0 Rating:

| Version | Supported          |
| ------- | ------------------ |
| 2.x.x   | :white_check_mark: |
| 1.x.x   | :x:                |

## Reporting a Vulnerability

We take the security of our software products and services seriously, which includes all source code repositories managed through our organization.

If you believe you have found a security vulnerability in any repository owned by Agro-Alertas, please report it to us as described below.

### How to Report

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please report them via email to:
- **Email**: security@agro-alertas.com
- **Subject**: [SECURITY] Brief description of the vulnerability

Please include the following information in your report:
- Type of issue (e.g. buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

### Response Timeline

We strive to respond quickly to security reports:
- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 5 business days
- **Status Updates**: Every 7 days until resolution
- **Resolution**: Varies based on complexity, typically within 30 days

### Security Measures

Our application implements several security measures:

#### API Gateway Security
- Rate limiting (100 requests per minute per IP)
- CORS protection with configurable origins
- Helmet.js for security headers
- Input validation using class-validator
- Request sanitization

#### Data Protection
- Environment variables for sensitive configuration
- No hardcoded credentials in source code
- Database connection encryption
- Secure session management

#### Infrastructure Security
- Docker container isolation
- Network segmentation between services
- Regular dependency updates
- Automated vulnerability scanning

## Security Best Practices for Contributors

When contributing to this project, please follow these security guidelines:

1. **Never commit sensitive information** (API keys, passwords, tokens)
2. **Use environment variables** for configuration
3. **Validate all inputs** using appropriate validation libraries
4. **Follow secure coding practices** for the language/framework
5. **Keep dependencies up to date** and monitor for vulnerabilities
6. **Use HTTPS** for all external communications
7. **Implement proper error handling** without exposing sensitive information

## Disclosure Policy

When we receive a security bug report, we will:

1. Confirm the problem and determine the affected versions
2. Audit code to find any potential similar problems
3. Prepare fixes for all releases still under support
4. Release patches as soon as possible

We prefer coordinated disclosure and will work with researchers to ensure proper attribution and responsible disclosure timeline.

## Comments on this Policy

If you have suggestions on how this process could be improved, please submit a pull request or email us at security@agro-alertas.com.