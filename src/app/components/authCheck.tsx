import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { options } from "../api/auth/[...nextauth]/options";

export default async function AuthCheck({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return <>{children}</>;
}
