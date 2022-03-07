import Head from 'next/head'
import { Box, Center, Heading, SimpleGrid, Flex, Stack, Spinner, Text, VStack } from '@chakra-ui/react'
import Container from '../../components/Container';
import { useSession } from 'next-auth/react';
import { motion } from 'framer-motion';
import useMediaQuery from '../../hook/useMediaQuery';

export default function IndexPage(data) {
    const { data: session, status } = useSession();

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
                    <Heading fontSize={{ base: '4xl', md: '6xl' }}>
                        Commands
                    </Heading>
                    { /* Create a simplegrid with 2 columns, boxes with shadows containing the commands infomation */}
                    <SimpleGrid columns={2} spacing={8}>
                        {data.data.map((command) => (
                            <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 1 }}
                            >
                                <Box
                                    key={command.name}
                                    boxShadow="lg"
                                    rounded="lg"
                                    p={8}
                                >
                                    <Heading as="h3" size="lg" fontWeight="semibold">
                                        {command.name}
                                    </Heading>
                                    <Text fontSize="lg" mt={2}>
                                        {command.description}
                                    </Text>
                                </Box>
                            </motion.a>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Container>
        </>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:3001/api/commands`)
    const data = await res.json()

    if (!data) {
        return {
            notFound: true,
        }
    }

    return {
        props: { data }, // will be passed to the page component as props
    }
}


