import type { NextAuthOptions } from "next-auth";
import { fetchPOST } from "@/utils/fetchPOST";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "Masukan username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "Masukan password",
        },
      },
      async authorize(credentials) {
        const response = await fetchPOST("/api/login", { userName: credentials?.username, userPassword: credentials?.password });
        if (response.statusCode !== 200) return null;

        return response.payload;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = user.role as string;
      return token;
    },
    async session({ session, token }) {
      if (session?.user) session.user.role = token.role as string;
      return session;
    },
  },
  theme: {
    colorScheme: "light",
  },
  // pages: {
  //   signIn: "/signin",
  // },
};
