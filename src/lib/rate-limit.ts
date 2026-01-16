/**
 * Rate Limiting Utility
 *
 * Uses Upstash Redis for persistent rate limiting across Lambda invocations.
 * Falls back to in-memory rate limiting if Upstash is not configured.
 */

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { isConfigured } from "./env";

/**
 * Rate limiter configurations by endpoint type
 */
export type RateLimitType = "chat" | "login" | "form" | "webhook" | "api";

interface RateLimitConfig {
  requests: number;
  windowMs: number;
  windowLabel: string;
}

const RATE_LIMIT_CONFIGS: Record<RateLimitType, RateLimitConfig> = {
  chat: { requests: 10, windowMs: 60 * 1000, windowLabel: "1m" },
  login: { requests: 5, windowMs: 15 * 60 * 1000, windowLabel: "15m" },
  form: { requests: 3, windowMs: 60 * 1000, windowLabel: "1m" },
  webhook: { requests: 100, windowMs: 60 * 1000, windowLabel: "1m" },
  api: { requests: 30, windowMs: 60 * 1000, windowLabel: "1m" },
};

// Upstash Redis client (lazy initialized)
let redis: Redis | null = null;
let rateLimiters: Map<RateLimitType, Ratelimit> | null = null;

function getRedis(): Redis | null {
  if (!isConfigured.upstash()) {
    return null;
  }

  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL!,
      token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    });
  }

  return redis;
}

function getRateLimiter(type: RateLimitType): Ratelimit | null {
  const redisClient = getRedis();
  if (!redisClient) {
    return null;
  }

  if (!rateLimiters) {
    rateLimiters = new Map();
  }

  if (!rateLimiters.has(type)) {
    const config = RATE_LIMIT_CONFIGS[type];
    rateLimiters.set(
      type,
      new Ratelimit({
        redis: redisClient,
        limiter: Ratelimit.slidingWindow(config.requests, `${config.windowMs}ms`),
        analytics: true,
        prefix: `ratelimit:${type}`,
      })
    );
  }

  return rateLimiters.get(type)!;
}

// In-memory fallback for development or when Upstash is not configured
const memoryStore = new Map<string, number[]>();

function inMemoryRateLimit(key: string, config: RateLimitConfig): { success: boolean; remaining: number } {
  const now = Date.now();
  const windowStart = now - config.windowMs;

  const timestamps = memoryStore.get(key) || [];
  const recentTimestamps = timestamps.filter((t) => t > windowStart);

  if (recentTimestamps.length >= config.requests) {
    return { success: false, remaining: 0 };
  }

  recentTimestamps.push(now);
  memoryStore.set(key, recentTimestamps);

  // Cleanup old entries periodically
  if (Math.random() < 0.01) {
    for (const [k, times] of memoryStore.entries()) {
      const recent = times.filter((t) => t > windowStart);
      if (recent.length === 0) {
        memoryStore.delete(k);
      } else {
        memoryStore.set(k, recent);
      }
    }
  }

  return { success: true, remaining: config.requests - recentTimestamps.length };
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  reset?: number;
  usingFallback: boolean;
}

/**
 * Check rate limit for a given identifier
 *
 * @param type - The type of rate limit to apply
 * @param identifier - Unique identifier (usually IP address)
 * @returns Rate limit result
 */
export async function checkRateLimit(
  type: RateLimitType,
  identifier: string
): Promise<RateLimitResult> {
  const config = RATE_LIMIT_CONFIGS[type];
  const key = `${type}:${identifier}`;

  // Try Upstash first
  const limiter = getRateLimiter(type);
  if (limiter) {
    try {
      const result = await limiter.limit(key);
      return {
        success: result.success,
        remaining: result.remaining,
        reset: result.reset,
        usingFallback: false,
      };
    } catch (error) {
      console.warn(`[RateLimit] Upstash error, falling back to in-memory:`, error);
    }
  }

  // Fallback to in-memory
  const result = inMemoryRateLimit(key, config);
  return {
    ...result,
    usingFallback: true,
  };
}

/**
 * Get IP address from request headers
 */
export function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");

  if (forwardedFor) {
    return forwardedFor.split(",")[0].trim();
  }

  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
}

/**
 * Helper to create a rate limit error response
 */
export function rateLimitResponse(result: RateLimitResult) {
  const headers: Record<string, string> = {
    "X-RateLimit-Remaining": String(result.remaining),
  };

  if (result.reset) {
    headers["X-RateLimit-Reset"] = String(result.reset);
  }

  return {
    status: 429,
    headers,
    body: { error: "Too many requests. Please try again later." },
  };
}
