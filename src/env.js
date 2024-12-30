import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
    /**
     * Specify your server-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars.
     */
    server: {
        // PASSWORD_KEY: z.string(),
        CLERK_SECRET_KEY: z.string(),
        AWS_BUCKET_NAME: z.string(),
        AWS_BUCKET_REGION: z.string(),
        AWS_ACCESS_KEY: z.string(),
        AWS_SECRET_KEY: z.string(),
        DATABASE_URL: z.string().url(),
        // CLERK_WEBHOOK_SECRET: z.string(),
        // DATABASE_HOST: z.string(),
        // DATABASE_PORT: z.string(),
        // DATABASE_NAME: z.string(),
        // DATABASE_USERNAME: z.string(),
        // DATABASE_POOL_MODE: z.enum(['transaction', 'session']),

        NODE_ENV: z
            .enum(['development', 'test', 'production'])
            .default('development'),
    },

    /**
     * Specify your client-side environment variables schema here. This way you can ensure the app
     * isn't built with invalid env vars. To expose them to the client, prefix them with
     * `NEXT_PUBLIC_`.
     */
    client: {
        // NEXT_PUBLIC_CLIENTVAR: z.string(),
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string(),
        NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string(),
    },

    /**
     * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
     * middlewares) or client-side so we need to destruct manually.
     */
    runtimeEnv: {
        /**
         * Server runtime environment variables
         */
        // PASSWORD_KEY: process.env.PASSWORD_KEY,
        CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
        AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
        AWS_BUCKET_REGION: process.env.AWS_BUCKET_REGION,
        AWS_ACCESS_KEY: process.env.AWS_ACCESS_KEY,
        AWS_SECRET_KEY: process.env.AWS_SECRET_KEY,
        DATABASE_URL: process.env.DATABASE_URL,
        // CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET,
        // DATABASE_HOST: process.env.DATABASE_HOST,
        // DATABASE_PORT: process.env.DATABASE_PORT,
        // DATABASE_NAME: process.env.DATABASE_NAME,
        // DATABASE_USERNAME: process.env.DATABASE_USERNAME,
        // DATABASE_POOL_MODE: process.env.DATABASE_POOL_MODE,

        NODE_ENV: process.env.NODE_ENV,

        /**
         * Client runtime environment variables
         */
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
        NEXT_PUBLIC_CLERK_SIGN_IN_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
        NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
        NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    },
    /**
     * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
     * useful for Docker builds.
     */
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    /**
     * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
     * `SOME_VAR=''` will throw an error.
     */
    emptyStringAsUndefined: true,
});
