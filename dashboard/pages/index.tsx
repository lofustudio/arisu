import Head from 'next/head'
import { Avatar, Box, Button, Center, Flex, Heading, SimpleGrid, Spinner, Stack, Text, VStack } from '@chakra-ui/react'
import Container from '../components/Container';
import { signIn, signOut, useSession } from 'next-auth/react';
import Script from 'next/script';
import { motion } from 'framer-motion';
import useMediaQuery from '../hook/useMediaQuery';
import NextLink from 'next/link';
import fetchID from '../util/fetchID';

export default function IndexPage() {
  const { data: session, status } = useSession();
  const isLargerThan768 = useMediaQuery(768);

  if (status === 'loading') {
    return (
      <>
        <Flex
          as="header"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          width="100%"
          position="fixed"
          top="0"
          left="0"
          zIndex="99"
        >
          <Box
            as="span"
            role="img"
            aria-label="loading"
            fontSize="32px"
          >
            <Center>
              <Spinner size="xl" />
            </Center>
          </Box>
        </Flex>
      </>
    )
  }

  return (
    <>
      <Container enableTransition={true}>
        <Head>
          <title>Dashboard</title>
          <meta name="title" content="Dashboard" />
        </Head>
        <Stack
          as="main"
          spacing="4vw"
          justifyContent="flex-start"
          alignItems="inherit"
          px={{ base: '5vw', md: '10vw' }}
          mt={{ base: '15vh', md: '22.5vh' }}
        >
          {session ? (
            <>
              <Heading fontSize={{ base: '4xl', md: '6xl' }}>
                Welcome, {session.user.name}!
              </Heading>
              <SimpleGrid columns={[1, 1, 2, 2]} spacing={16}>
                <Stack
                  p={8}
                  rounded="lg"
                  shadow="dark-lg"
                  spacing={4}
                  alignContent={'flex-start'}
                  minW={'8vw'}
                >
                  <SimpleGrid columns={2} spacing={4}>
                    <VStack>
                      <Avatar src={session.user.image} rounded="full" size={isLargerThan768 ? '2xl' : 'lg'} />
                      <VStack>
                        <Text fontSize="26px" fontWeight="bold">{session.user.name}</Text>
                        <Text fontSize="14px">{session.user.email}</Text>
                      </VStack>
                    </VStack>
                    <Center>
                      <VStack spacing={5}>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 1 }}
                        >
                          <NextLink href="/profile" passHref>
                            <Button as="a" variant="solid" fontSize="16px">
                              View Profile
                            </Button>
                          </NextLink>
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 1 }}
                        >
                          <NextLink href={`/stats/${fetchID(session.user.image)}`} passHref>
                            <Button as="a" variant="solid" fontSize="16px">
                              Statistics
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
                      </VStack>
                    </Center>

                  </SimpleGrid>
                </Stack>
              </SimpleGrid>
            </>
          ) : (
            <>
              <Heading fontSize={{ base: '4xl', md: '6xl' }}>
                Welcome! Please login to view this page.
              </Heading>
            </>
          )}
        </Stack>
      </Container>
    </>
  )
}
