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
  Icon
} from "@chakra-ui/react";
import NextLink from "next/link";
import useMediaQuery from "../hook/useMediaQuery";
import { AiOutlineMenu } from "react-icons/ai";

export default function Navbar({ enableTransition }) {
  const isLargerThan768 = useMediaQuery(768);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const NavbarDrawer = () => (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent backgroundColor="background">
          <DrawerCloseButton color="background" />
          <DrawerHeader borderBottomWidth="1px" borderColor="borderColor" backgroundColor="textPrimary" color="background">
            Cookie
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <NextLink href="/account" passHref>
                <Button as="a" variant="solid" bgColor='displayColor' fontSize="16px">
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
          background="textPrimary"
        >
          <NextLink href="/">
            <a>
              <Text>Cookie</Text>
            </a>
          </NextLink>
          {isLargerThan768 ? (
            <Box color="textPrimary">
              <NextLink href="/account" passHref>
                <Button as="a" color="white" variant="solid" p="4" ml="3vw" fontSize="16px">
                  Settings
                </Button>
              </NextLink>{" "}
            </Box>
          ) : (
            <Icon as={AiOutlineMenu} w={7} h={7} onClick={onOpen} color="background" />
          )}
        </Flex>
      </Slide>
      <NavbarDrawer />
    </Box>
  );
}
