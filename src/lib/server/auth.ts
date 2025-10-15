import { env } from "$env/dynamic/private";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import * as schema from "./schema";

export const auth = betterAuth({
	baseURL: env.PUBLIC_BASE_URL,
	database: drizzleAdapter(db, {
		provider: "sqlite",
		schema: {
			...schema,
			user: schema.user,
			session: schema.session,
			verification: schema.verification,
			account: schema.account,
		},
	}),

	// https://www.better-auth.com/docs/concepts/session-management#session-caching
	session: {
		cookieCache: {
			enabled: true,
			maxAge: 5 * 60, // 5 minutes
		},
	},

	// https://www.better-auth.com/docs/concepts/oauth
	socialProviders: {
		google: {
			prompt: "select_account",
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		},
		// github: {
		// 	clientId: env.GITHUB_CLIENT_ID!,
		// 	clientSecret: env.GITHUB_CLIENT_SECRET!,
		// },
		// discord: {
		// 	clientId: env.DISCORD_CLIENT_ID!,
		// 	clientSecret: env.DISCORD_CLIENT_SECRET!,
		// },
	},

	// https://www.better-auth.com/docs/authentication/email-password
	// emailAndPassword: {
	//   enabled: true,
	// },
});
