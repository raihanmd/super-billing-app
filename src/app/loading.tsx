"use client";

import { Spinner, Stack } from "@chakra-ui/react";

export default function RootLoading() {
  return (
    <Stack w={"full"} h={"100vh"} justify={"center"} align={"center"}>
      <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
    </Stack>
  );
}
