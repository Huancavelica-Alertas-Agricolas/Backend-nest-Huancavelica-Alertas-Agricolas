export const throttlerConfig = {
  throttlers: [
    {
      // Global rate limiting
      name: 'global',
      ttl: 60000, // 1 minute
      limit: 100, // 100 requests per minute per IP
    },
    {
      // Strict rate limiting for auth endpoints
      name: 'auth',
      ttl: 60000, // 1 minute
      limit: 10, // 10 requests per minute per IP for auth
    },
    {
      // More lenient for data endpoints
      name: 'data',
      ttl: 60000, // 1 minute
      limit: 200, // 200 requests per minute per IP for data endpoints
    },
  ],
};

export const helmetConfig = {
  // Content Security Policy
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      scriptSrc: ["'self'"],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:', 'https:'],
      connectSrc: ["'self'"],
    },
  },
  // Cross Origin Embedder Policy
  crossOriginEmbedderPolicy: false,
  // HSTS (HTTP Strict Transport Security)
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  // Remove X-Powered-By header
  hidePoweredBy: true,
  // Prevent MIME type sniffing
  noSniff: true,
  // Prevent clickjacking
  frameguard: {
    action: 'deny' as const,
  },
  // XSS Protection
  xssFilter: true,
};