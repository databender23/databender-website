import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'GPTBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'anthropic-ai',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'ClaudeBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Googlebot-Extended',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'CCBot',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Applebot-Extended',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'Bytespider',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
      {
        userAgent: 'cohere-ai',
        allow: '/',
        disallow: ['/admin', '/api'],
      },
    ],
    sitemap: 'https://databender.co/sitemap.xml',
  };
}
