"use client";

import { Flex, Box, FormControl, FormLabel, Input, Stack, Link, Button, Heading, Text, useColorModeValue, useToast } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { signIn } from "next-auth/react";

export default function login() {
  const nameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const onSignIn = async () => {
    setIsLoading(true);
    signIn("credentials", {
      username: nameRef.current?.value,
      password: passwordRef.current?.value,
      redirect: true,
      callbackUrl: "/",
    })
      .then(() => {
        setIsLoading(false);
        toast({
          title: "Sign in success.",
          description: "Welcome to dashboard!",
          status: "success",
          position: "top-right",
          isClosable: true,
        });
      })
      .catch((e) => {
        console.log(e);
        setIsLoading(false);
        toast({ title: "Sign in failed.", description: "Username or Password incorrect, Please try again.", status: "error", position: "top-right", isClosable: true });
      });
  };

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"} bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Welcome 👋</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Please <Link color={"blue.400"}>sign in</Link> to continue
          </Text>
        </Stack>
        <Box rounded={"lg"} bg={useColorModeValue("white", "gray.700")} boxShadow={"lg"} p={8}>
          <form onSubmit={() => onSignIn()}>
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input ref={nameRef} type="text" placeholder="Your cool username" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input ref={passwordRef} type="password" placeholder="Your secret password" />
              </FormControl>
              <Stack spacing={10}>
                <Button
                  //@ts-ignore
                  isLoading={isLoading ? true : false}
                  loadingText="Submitting"
                  type={"submit"}
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                    corsor: "pointer",
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
