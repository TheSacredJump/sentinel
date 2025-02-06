import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "~/lib/db";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (!profile?.email) return false; // Reject if no email

      const googleId = account?.providerAccountId;
      const googleEmail = profile.email;
      const name = profile.name;
      const oauthToken = JSON.stringify(account); // Store OAuth token

      // Check if this Google account exists in the accounts table
      const existingAccount = await query(
        "SELECT user_id FROM accounts WHERE google_id = $1",
        [googleId]
      );

      if (existingAccount.length > 0) {
        return true; // User already linked, proceed with sign-in
      }

      // Check if there's a main user with this email
      let user = await query("SELECT id FROM users WHERE email = $1", [googleEmail]);

      if (user.length === 0) {
        // Create new user if first account
        user = await query(
          "INSERT INTO users (email, name) VALUES ($1, $2) RETURNING id",
          [googleEmail, name]
        );
      }

      const userId = user[0].id;

      // Link new Google account to this user
      await query(
        "INSERT INTO accounts (user_id, google_id, google_email, oauth_token) VALUES ($1, $2, $3, $4)",
        [userId, googleId, googleEmail, oauthToken]
      );

      return true;
    },

    async session({ session, token }) {
      if (session.user) {
        // Fetch all linked Google accounts for the user
        const accounts = await query(
          "SELECT google_email FROM accounts WHERE user_id = (SELECT id FROM users WHERE email = $1)",
          [session.user.email]
        );
        session.user.accounts = accounts.map((a) => a.google_email);
      }
      return session;
    }
  }
});

export { handler as GET, handler as POST };
