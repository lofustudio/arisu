import React from "react";
import {
  Button,
  Flex,
  Box,
  Slide,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  useColorMode,
  Image,
  Avatar,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  VStack,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";
import useMediaQuery from "../hook/useMediaQuery";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs"
import { useSession, signOut, signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function Navbar({ enableTransition }) {
  const isLargerThan768 = useMediaQuery(768);
  const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
  const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
  const { data: session, status } = useSession();

  const { colorMode, toggleColorMode } = useColorMode()

  if (status === 'loading') {
    return (
      <>
        <div />
      </>
    );
  }

  const AccountCard = () => (
    <>
      <Modal onClose={onCloseModal} isOpen={isOpenModal} isCentered motionPreset='slideInBottom' size={'lg'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader />
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <Avatar src={session.user.image} rounded="full" size={isLargerThan768 ? '2xl' : 'lg'} />
              <VStack>
                <Text fontSize="26px" fontWeight="bold">{session.user.name}</Text>
                <Text fontSize="14px">{session.user.email}</Text>
              </VStack>
            </VStack>
            <Center>
              <SimpleGrid columns={isLargerThan768 ? 2 : 1} spacing={5} mt={'2vw'}>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                >
                  <NextLink href="/profile" passHref>
                    <Button as="a" variant="solid" fontSize="16px">
                      Profile
                    </Button>
                  </NextLink>
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 1 }}
                >
                  <Button as="a" variant="solid" fontSize="16px" onClick={() => { signOut({ redirect: true, callbackUrl: "/" }) }}>
                    Log out
                  </Button>
                </motion.a>
              </SimpleGrid>
            </Center>
          </ModalBody>
          <Center>
            <ModalFooter />
          </Center>
        </ModalContent>
      </Modal>
    </>
  );

  const NavbarDrawer = () => (
    <>
      <Drawer
        isOpen={isOpenDrawer}
        placement="right"
        onClose={onCloseDrawer}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderColor={colorMode === 'light' ? '#000000' : '#FFFFFF'} borderBottomWidth="1px">
            <Image w="48px" h="48px" src={colorMode === 'light' ? 'https://i.imgur.com/8f6X3H8.png' : 'https://i.imgur.com/DnfgdWr.png'} />
          </DrawerHeader>
          <DrawerBody>
            <Stack spacing="24px">
              <NextLink href="/" passHref>
                <Button as="a" variant="ghost" fontSize="16px">
                  Home
                </Button>
              </NextLink>
              <NextLink href="/commands" passHref>
                <Button as="a" variant="ghost" fontSize="16px">
                  Commands
                </Button>
              </NextLink>
              <NextLink href="/settings" passHref>
                <Button as="a" variant="ghost" fontSize="16px">
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
          px={isLargerThan768 ? "4vw" : "4vw"}
          py={isLargerThan768 ? "2vw" : "4vw"}
          bg={colorMode === 'light' ? '#F1F1F1' : '#1F1F1F'}
          backgroundColor={colorMode === "light" ? "rgba(255, 255, 255, 0.8)" : "rgba(16, 18, 18, 0.5)"}
          backdropBlur={'blur(12px)'}
          borderBottom="0.5px solid borderColor"
        >
          <NextLink href="/">
            <Image borderTop={'4vw'} w="48px" h="48px" src={colorMode === 'light' ? 'https://i.imgur.com/8f6X3H8.png' : 'https://i.imgur.com/DnfgdWr.png'} />
          </NextLink>
          {isLargerThan768 ? (
            <Center>
              <NextLink href="/" passHref>
                <Button as="a" variant="ghost" fontSize="16px">
                  Home
                </Button>
              </NextLink>
              <NextLink href="/commands" passHref>
                <Button as="a" variant={"ghost"} p="4" ml="3vw" fontSize={"16px"}>
                  Commands
                </Button>
              </NextLink>
              <NextLink href={"/settings"} passHref>
                <Button variant={"ghost"} p="4" ml="3vw" fontSize={"16px"}>
                  Settings
                </Button>
              </NextLink>
              <Button
                variant="ghost"
                p="4"
                ml="3vw"
                fontSize={"16px"}
                onClick={toggleColorMode}
              >
                {colorMode === "dark" ? <BsMoonFill /> : <BsFillSunFill />}
              </Button>
              {session ? (
                <>
                  <Avatar as="a" href="#" src={session.user.image} rounded="full" ml="3vw" h="32px" w="32px" onClick={onOpenModal} />
                  <AccountCard />
                </>
              ) : (
                <Button p="4" ml="3vw" fontSize={"16px"} onClick={() => { signIn('discord', { callbackUrl: '/', redirect: true }) }}>
                  Login
                </Button>
              )}
            </Center>
          ) : (
            <Center>
              {session ? (
                <>
                  <Avatar src={session.user.image} rounded="full" h="32px" w="32px" onClick={onOpenModal} />
                  <AccountCard />
                </>
              ) : (
                <Button p="4" ml="3vw" fontSize={"16px"} onClick={() => { signIn('discord', { callbackUrl: '/', redirect: true }) }}>
                  Login
                </Button>
              )}
              <Button
                variant="ghost"
                p="4"
                ml="3vw"
                fontSize={"16px"}
                onClick={onOpenDrawer}
              >
                <AiOutlineMenu />
              </Button>
              <NavbarDrawer />
            </Center>
          )}
        </Flex>
      </Slide>
    </Box >
  );
}
