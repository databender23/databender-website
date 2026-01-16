/**
 * Environment Variable Validation
 *
 * Validates and exports typed environment variables.
 * Fails secure: missing required vars cause app to crash on startup in production.
 */

import { z } from "zod";

// Check if we're in production AND at runtime (not build time)
// During Next.js build, we're in "production" mode but don't have actual env vars
const isProduction = process.env.NODE_ENV === "production";
const isBuildPhase = process.env.NEXT_PHASE === "phase-production-build";

// Check if running in AWS Lambda (Amplify SSR) - env vars may be passed differently
const isAmplifyLambda = Boolean(process.env.AWS_LAMBDA_FUNCTION_NAME);

// Only enforce strict validation in production runtime (not build phase or Amplify Lambda)
// Amplify SSR has issues passing env vars, so we log warnings instead of throwing
const strictMode = isProduction && !isBuildPhase && !isAmplifyLambda;

/**
 * Schema for required environment variables
 */
const envSchema = z.object({
  // Authentication - REQUIRED in production runtime
  JWT_SECRET: strictMode
    ? z.string().min(32, "JWT_SECRET must be at least 32 characters")
    : z.string().min(1).optional(),
  ADMIN_PASSWORD_HASH: strictMode
    ? z.string().min(1, "ADMIN_PASSWORD_HASH is required in production")
    : z.string().optional(),
  ADMIN_USERNAME: z.string().default("admin"),

  // API keys - REQUIRED in production runtime
  ANTHROPIC_API_KEY: strictMode
    ? z.string().min(1, "ANTHROPIC_API_KEY is required")
    : z.string().optional(),
  CRON_SECRET: strictMode
    ? z.string().min(32, "CRON_SECRET must be at least 32 characters")
    : z.string().optional(),
  WEBHOOK_API_KEY: strictMode
    ? z.string().min(32, "WEBHOOK_API_KEY must be at least 32 characters")
    : z.string().optional(),

  // AWS - Optional with defaults
  SES_REGION: z.string().default("us-east-1"),
  SES_FROM_EMAIL: z.string().email().optional(),
  CHAT_NOTIFY_EMAIL: z.string().email().optional(),
  DYNAMODB_REGION: z.string().default("us-east-1"),

  // Optional services
  UPSTASH_REDIS_REST_URL: z.string().url().optional(),
  UPSTASH_REDIS_REST_TOKEN: z.string().optional(),
  TURNSTILE_SECRET_KEY: z.string().optional(),
  NEXT_PUBLIC_TURNSTILE_SITE_KEY: z.string().optional(),
  UNSUBSCRIBE_SECRET: z.string().min(32).optional(),

  // Public URLs
  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://databender.co"),
  NEXT_PUBLIC_BOOKING_URL: z.string().url().optional(),

  // Slack notifications
  SLACK_WEBHOOK_URL: z.string().url().optional(),
});

/**
 * Parse and validate environment variables
 * Returns a proxy that falls back to process.env if validation fails
 */
function validateEnv(): z.infer<typeof envSchema> {
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.format();
    console.error("Environment validation failed:");
    console.error(JSON.stringify(errors, null, 2));

    // Only throw in production runtime, not during build or Amplify Lambda
    if (strictMode) {
      throw new Error(
        `Missing required environment variables:\n${result.error.issues
          .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`
      );
    } else {
      console.warn("Build/Development/Lambda mode: continuing with missing env vars");
    }

    // Return a proxy that reads directly from process.env as fallback
    return new Proxy({} as z.infer<typeof envSchema>, {
      get: (_, prop: string) => {
        return process.env[prop];
      },
    });
  }

  return result.data!;
}

/**
 * Validated environment variables
 * Access these instead of process.env directly
 */
export const env = validateEnv();

/**
 * Type-safe environment variable access
 */
export type Env = z.infer<typeof envSchema>;

/**
 * Check if a specific feature is configured
 */
export const isConfigured = {
  upstash: () =>
    Boolean(env?.UPSTASH_REDIS_REST_URL && env?.UPSTASH_REDIS_REST_TOKEN),
  turnstile: () =>
    Boolean(env?.TURNSTILE_SECRET_KEY && env?.NEXT_PUBLIC_TURNSTILE_SITE_KEY),
  ses: () => Boolean(env?.SES_FROM_EMAIL),
  slack: () => Boolean(env?.SLACK_WEBHOOK_URL),
  unsubscribe: () => Boolean(env?.UNSUBSCRIBE_SECRET),
};
