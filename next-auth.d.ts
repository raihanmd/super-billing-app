import { DefaultSession, Defaultuser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      role: string;
    } & DefaultSession;
  }

  interface User extends Defaultuser {
    role: string;
  }
}

declare module "next-auth-jwt" {
  interface JWT extends DefaultJWT {
    role: string;
  }
}
