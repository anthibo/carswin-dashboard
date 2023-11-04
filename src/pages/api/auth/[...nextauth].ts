import { User, UserType } from "@models/user"
import { loginRequest } from "@services"
import NextAuth from "next-auth"
import type { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                if (typeof credentials !== "undefined") {
                    const res = await loginRequest(credentials.email, credentials.password, UserType.SUPERADMIN)
                    if (typeof res !== "undefined") {
                        const user = { ...res.user, id: res.user.id.toString(), apiToken: res.token }
                        return { ...user }
                    } else {
                        return null
                    }
                } else {
                    return null
                }
            },
        })
    ],
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            console.log("jwt user", user)
            if (user) {
                token.user = user;
            }
            return token;
        },
        async session({ session, token }) {
            // Send properties to the client, like an access_token from a provider.
            const user = token.user as User;
            const returnSession = {
                ...session,
                user: { ...session.user, type: user.type }
            };
            return returnSession;
        },
    }
}

const handler = NextAuth(authOptions)

export default handler