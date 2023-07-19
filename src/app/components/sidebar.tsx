"use client";

import React, { ReactNode } from "react";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Heading,
  Stack,
  Link,
  AvatarBadge,
} from "@chakra-ui/react";
import { FiHome, FiMenu, FiBell, FiChevronDown, FiTool } from "react-icons/fi";
import { usePathname } from "next/navigation";

import { IconType } from "react-icons/lib";
import { ReactText } from "react";
import { useUserContext } from "@/context/userContext";

interface LinkItemProps {
  url: string;
  name: string;
  icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
  { url: "/", name: "Home", icon: FiHome },
  { url: "/services", name: "Services", icon: FiTool },
];

export default function Sidebar({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const user = useUserContext();

  return (
    <Box minH="100vh" bg={"gray.100"}>
      <SidebarContent onClose={() => onClose} display={{ base: "none", md: "block" }} />
      <Drawer autoFocus={false} isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      <MobileNav onOpen={onOpen} userData={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box transition="3s ease" bg={"white"} borderRight="1px" borderRightColor={"gray.200"} w={{ base: "full", md: 60 }} pos="fixed" h="full" {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      <Stack spacing={"1"}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} url={link.url}>
            {link.name}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  url: string;
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ url, icon, children, ...rest }: NavItemProps) => {
  const pathname = usePathname();

  return (
    //@ts-ignore
    <Link href={url} style={{ textDecoration: "none" }}>
      <Flex
        p={"3"}
        // mx={"4"}
        align="center"
        // borderRadius="lg"
        role="group"
        cursor="pointer"
        //@ts-ignore
        bg={pathname.includes(url) ? "blue.400" : "none"}
        color={pathname.includes(url) ? "white" : "black"}
        _hover={{
          bg: "blue.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  userData: any;
  onOpen: () => void;
}
const MobileNav = ({ userData, onOpen, ...rest }: MobileProps) => {
  return (
    <Flex ml={{ base: 0, md: 60 }} px={{ base: 4, md: 4 }} height="20" alignItems="center" bg={"white"} borderBottomWidth="1px" borderBottomColor={"gray.200"} justifyContent={{ base: "space-between", md: "flex-end" }} {...rest}>
      <IconButton display={{ base: "flex", md: "none" }} onClick={onOpen} variant="outline" aria-label="open menu" icon={<FiMenu />} />

      <Text display={{ base: "flex", md: "none" }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: "0", md: "6" }}>
        <IconButton size="lg" variant="ghost" aria-label="open menu" icon={<FiBell />} />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: "none" }}>
              <HStack>
                <Avatar size={"sm"} name={userData?.name}>
                  <AvatarBadge boxSize="1.25em" bg="green.500" />
                </Avatar>
                <VStack display={{ base: "none", md: "flex" }} alignItems="flex-start">
                  <Heading fontSize="sm">{userData?.name}</Heading>
                  {userData.role === "ADMIN" && (
                    <Heading fontSize="xs" color="gray.600">
                      {userData?.role}
                    </Heading>
                  )}
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList bg={"white"} borderColor={"gray.200"}>
              <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem>
              <MenuDivider />
              <MenuItem as={Link} href={"/api/auth/signout"}>
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
