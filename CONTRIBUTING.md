# Contributing to Agro-Alertas

Thank you for your interest in contributing to Agro-Alertas! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Making Changes](#making-changes)
- [Testing](#testing)
- [Submitting Changes](#submitting-changes)
- [Style Guidelines](#style-guidelines)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a code of conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git
- PostgreSQL (for local development)

### Fork and Clone

1. Fork the repository on GitHub
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/Tareas-Huancavelica-Alertas-Agricolas.git
   cd Tareas-Huancavelica-Alertas-Agricolas
   ```

## Development Setup

### 1. Install Dependencies

```bash
# Install all microservice dependencies
npm run install:all
```

### 2. Environment Configuration

```bash
# Copy environment file
cp microservices/.env.example microservices/.env
# Edit the .env file with your local configuration
```

### 3. Start Development Environment

```bash
# Option 1: Docker (Recommended)
npm run start

# Option 2: Local development
npm run dev:gateway
npm run dev:user
npm run dev:weather
npm run dev:notification
npm run dev:alert
```

### 4. Verify Setup

Visit `http://localhost:3000/api/docs` to see the Swagger documentation.

## Making Changes

### Branch Naming Convention

- `feature/description` - New features
- `bugfix/description` - Bug fixes
- `hotfix/description` - Critical fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Message Format

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types:
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

Examples:
```
feat(user-service): add user profile validation
fix(gateway): resolve rate limiting issue
docs: update API documentation
test(alert-service): add unit tests for alert processing
```

## Testing

### Running Tests

```bash
# Run all tests
npm run test:all

# Run tests for specific service
cd microservices/gateway/api-gateway
npm test

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

### Writing Tests

- Write unit tests for business logic
- Write integration tests for API endpoints
- Write e2e tests for critical user flows
- Aim for at least 80% code coverage
- Use descriptive test names
- Mock external dependencies

### Test Structure

```typescript
describe('UserService', () => {
  describe('createUser', () => {
    it('should create user with valid data', async () => {
      // Arrange
      const userData = { name: 'Test', email: 'test@example.com' };
      
      // Act
      const result = await userService.createUser(userData);
      
      // Assert
      expect(result).toMatchObject(userData);
    });
  });
});
```

## Submitting Changes

### Pull Request Process

1. **Create a feature branch** from `develop`:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-feature-description
   ```

2. **Make your changes** following the style guidelines

3. **Add tests** for your changes

4. **Run the test suite**:
   ```bash
   npm run test:all
   npm run lint:all
   ```

5. **Commit your changes** using conventional commit format

6. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-description
   ```

7. **Create a Pull Request** with:
   - Clear title and description
   - Reference to related issues
   - Screenshots (if applicable)
   - Test results

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] E2E tests pass
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests added/updated
```

## Style Guidelines

### TypeScript/JavaScript

- Use TypeScript for all new code
- Follow ESLint configuration
- Use Prettier for code formatting
- Maximum line length: 80 characters
- Use meaningful variable and function names
- Add JSDoc comments for public APIs

### File Organization

```
src/
├── controllers/     # API controllers
├── services/       # Business logic
├── entities/       # Database entities
├── dto/           # Data transfer objects
├── interfaces/    # TypeScript interfaces
├── utils/         # Utility functions
└── __tests__/     # Test files
```

### Database

- Use TypeORM entities
- Follow snake_case for database columns
- Use camelCase for entity properties
- Add proper indexes for performance
- Use migrations for schema changes

### API Design

- Follow RESTful conventions
- Use proper HTTP status codes
- Validate all inputs
- Return consistent error formats
- Document with Swagger/OpenAPI

## Release Process

### Versioning

We use [Semantic Versioning](https://semver.org/):
- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run full test suite
4. Create release branch
5. Tag release
6. Deploy to staging
7. Deploy to production
8. Create GitHub release

## Getting Help

- **Documentation**: Check the README and docs folder
- **Issues**: Search existing issues before creating new ones
- **Discussions**: Use GitHub Discussions for questions
- **Email**: Contact maintainers at dev@agro-alertas.com

## Recognition

Contributors will be recognized in:
- `CONTRIBUTORS.md` file
- Release notes
- Project documentation

Thank you for contributing to Agro-Alertas! 🌱