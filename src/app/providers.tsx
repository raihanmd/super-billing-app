"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import theme from "@/constant/theme";
import AuthCheck from "./authCheck";
import Sidebar from "./components/sidebar";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname.includes("/signin")) {
    return (
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>{children}</ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    );
  } else {
    return (
      <SessionProvider>
        <CacheProvider>
          <ChakraProvider theme={theme}>
            <AuthCheck>
              <Sidebar>{children}</Sidebar>
            </AuthCheck>
          </ChakraProvider>
        </CacheProvider>
      </SessionProvider>
    );
  }
}
