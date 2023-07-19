"use client";

import { Flex, Box, FormControl, FormLabel, Input, Stack, Link, Button, Heading, Text, useColorModeValue, useToast, InputGroup, InputRightElement } from "@chakra-ui/react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useRef, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import RootLoading from "../loading";

export default function login() {
  const { data: session, status } = useSession();
  const nameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useToast();

  if (status === "loading") {
    return <RootLoading />;
  }

  if (session) {
    redirect("/");
  }

  const onSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const result = await signIn("Credentials", {
        username: nameRef.current?.value,
        password: passwordRef.current?.value,
        redirect: true,
        callback: "/",
      });
      if (result?.error) {
        throw new Error(result?.error);
      }
      toast({
        title: "Sign in success.",
        description: "Welcome to dashboard!",
        status: "success",
        position: "top-right",
        isClosable: true,
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign in failed.",
        description: "Username or password incorrect.",
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
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
          <form onSubmit={onSignIn}>
            <Stack spacing={4}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input ref={nameRef} type="text" placeholder="Your cool username" />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? "text" : "password"} ref={passwordRef} placeholder="Your secret password" />
                  <InputRightElement h={"full"}>
                    <Button p={"0"} variant={"ghost"} onClick={() => setShowPassword((showPassword) => !showPassword)}>
                      {showPassword ? <AiFillEye /> : <AiFillEyeInvisible />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10}>
                <Button
                  isLoading={isLoading ? true : false}
                  loadingText="Submitting..."
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
