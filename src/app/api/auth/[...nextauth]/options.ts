import { fetchPOST } from "@/utils/fetchPOST";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
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

        if (response.statusCode !== 200) {
          const registerUser = await fetchPOST("/api/register", { userName: credentials?.username, userPassword: credentials?.password });

          if (registerUser.statusCode !== 201) return null;
        }

        return response.payload;
      },
    }),
  ],
  theme: {
    colorScheme: "light",
    logo: "https://firebasestorage.googleapis.com/v0/b/ecomerce-bc524.appspot.com/o/logo%2Flynxshop.webp?alt=media&token=6e522069-86f6-49dc-853e-3f0dc0d879c4",
  },
};
