import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";

import { UserProvider } from "@/context/userContext";
import RootLoading from "./loading";

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <RootLoading />;
  }
  if (!session) {
    redirect("/api/auth/signin");
  }

  return <UserProvider user={session?.user}>{children}</UserProvider>;
}
