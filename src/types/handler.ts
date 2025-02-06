import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
    } & DefaultSession["user"]
    primaryAccount: {
      google_id: string
      google_email: string
    }
    linkedAccounts: Array<{
      google_id: string
      google_email: string
    }>
  }
}