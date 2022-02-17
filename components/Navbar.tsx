import React from "react";
import {
  Button,
  Flex,
  Box,
  Text,
  Slide,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Icon,
  useColorMode
} from "@chakra-ui/react";
import NextLink from "next/link";
import useMediaQuery from "../hook/useMediaQuery";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs"

export default function Navbar({ enableTransition }) {
  const isLargerThan768 = useMediaQuery(768);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { colorMode, toggleColorMode } = useColorMode()

  const NavbarDrawer = () => (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">
            Cookie
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <NextLink href="/settings" passHref>
                <Button as="a" variant="solid" fontSize="16px">
                  Settings
                </Button>
              </NextLink>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );

  return (
    <Box zIndex="99">
      <Slide
        direction="top"
        in={true}
        transition={
          enableTransition
            ? { enter: { duration: 0.5, delay: 0.01 } }
            : { enter: { duration: 0, delay: 0 } }
        }
      >
        <Flex
          as="nav"
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          px="3vw"
          py="3"
          borderBottom="0.5px solid borderColor"
        >
          <NextLink href="/">
            <a>
              <Text fontSize='lg' fontWeight={'bold'}>Cookie</Text>
            </a>
          </NextLink>
          {isLargerThan768 ? (
            <Box>
              <NextLink href={"/settings"} passHref>
                <Button as="a" variant={"ghost"} p="4" ml="3vw" fontSize={"16px"}>
                  Settings
                </Button>
              </NextLink>
              <NextLink href="/account" passHref>
                <Button as="a" variant="solid" p="4" ml="3vw" fontSize="16px">
                  Account
                </Button>
              </NextLink>{" "}
            </Box>
          ) : (
            <a>
              <Icon as={ colorMode === 'light' ? BsFillSunFill : BsMoonFill } pt="6px" w={7} h={14} onClick={toggleColorMode} />
            </a>
          )}
          {isLargerThan768 ? (
            <a>
              <Icon as={ colorMode === 'light' ? BsFillSunFill : BsMoonFill } paddingTop="6px" w={7} h={14} onClick={toggleColorMode} />
            </a>
          ) : (
            <Icon as={AiOutlineMenu} w={7} h={7} onClick={onOpen} />
          )}
        </Flex>
      </Slide>
      <NavbarDrawer />
    </Box>
  );
}
