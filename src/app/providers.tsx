"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { usePathname } from "next/navigation";

import theme from "@/constant/theme";
import AuthCheck from "./authCheck";
import Sidebar from "./components/sidebar";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  //! ketika ada session entah mengapa authcheck nya me looping

  if (pathname.includes("/signin")) {
    return (
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    );
  } else {
    return (
      <CacheProvider>
        <ChakraProvider theme={theme}>
          <AuthCheck>
            <Sidebar>{children}</Sidebar>
          </AuthCheck>
        </ChakraProvider>
      </CacheProvider>
    );
  }
}
