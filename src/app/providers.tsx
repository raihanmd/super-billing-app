"use client";

import React from "react";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

import Sidebar from "./components/sidebar";
import theme from "@/constant/theme";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={theme}>
        <Sidebar>{children}</Sidebar>
      </ChakraProvider>
    </CacheProvider>
  );
}
