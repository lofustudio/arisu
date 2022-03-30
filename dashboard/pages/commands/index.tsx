import Head from 'next/head'
import { Box, Center, Heading, SimpleGrid, Flex, Stack, Spinner, Text, VStack, Divider, Button, Grid } from '@chakra-ui/react'
import Container from '../../components/Container';
import { useSession } from 'next-auth/react';
import { motion, AnimateSharedLayout } from 'framer-motion';
import useMediaQuery from '../../hook/useMediaQuery';
import CommandCard from '../../components/CommandCard';
import { useState } from 'react';

export default function IndexPage(data) {
    const { data: session, status } = useSession();
    const [filter, setFilter] = useState('all');
    const isLargerThan1050 = useMediaQuery(1050);

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

    const categories = data.data.map(command => command.category).filter((value, index, self) => self.indexOf(value) === index);

    const AllCommands = () => {
        return (
            <>
                <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={{ base: 4, sm: 8 }}>
                    <AnimateSharedLayout>
                        {data.data.map((command) => (
                            <CommandCard command={command} />
                        ))}
                    </AnimateSharedLayout>
                </SimpleGrid>
            </>
        )
    }

    const FilteredCommands = () => {
        return (
            <>
                <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={{ base: 4, sm: 8 }}>
                    <AnimateSharedLayout>
                        {data.data.filter(command => command.category === filter).map((command) => (
                            <CommandCard command={command} />
                        ))}
                    </AnimateSharedLayout>
                </SimpleGrid>
            </>
        )
    }

    const Commands = () => {
        if (filter === 'all') {
            return <AllCommands />
        } else {
            return <FilteredCommands />
        }
    }

    return (
        <>
            <Container enableTransition={true}>
                <Head>
                    <title>Dashboard</title>
                    <meta name="title" content="Dashboard" />
                </Head>
                <Stack
                    spacing={5}
                    justifyContent="center"
                    px={["5vw", "10vw"]}
                    my={["15vh", "15vh", "22.5vh", "22.5vh"]}
                >
                    <Heading fontSize={{ base: '4xl', md: '6xl' }}>
                        Commands
                    </Heading>
                    <Text fontSize={{ base: "14px", md: "16px" }}>
                        View all the bots commands here.
                    </Text>
                    <Divider />
                    {isLargerThan1050 ? (
                        <>
                            <Flex>
                                <VStack w={'sm'} align={'flex-start'}>
                                    <Box
                                        boxShadow="lg"
                                        rounded="lg"
                                        p={8}
                                    >
                                        <SimpleGrid columns={1} spacing={8}>
                                            <motion.a
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 1 }}
                                            >
                                                <Button
                                                    as="a"
                                                    variant="solid"
                                                    fontSize="16px"
                                                    onClick={() => setFilter('all')}
                                                >
                                                    All
                                                </Button>
                                            </motion.a>
                                            {categories.map(category => (
                                                <motion.a
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 1 }}
                                                >
                                                    <Button
                                                        variant="solid"
                                                        fontSize="16px"
                                                        onClick={() => setFilter(category)}
                                                    >
                                                        {category}
                                                    </Button>
                                                </motion.a>
                                            ))}
                                        </SimpleGrid>
                                    </Box>
                                </VStack>
                                <Box alignSelf={{ sm: 'center', md: 'flex-start' }}>
                                    <Commands />
                                </Box>
                            </Flex>
                        </>
                    ) : (
                        <>

                            <Stack>
                                <Box
                                    boxShadow="lg"
                                    rounded="lg"
                                    p={8}
                                >
                                    <SimpleGrid columns={{ base: 3, md: categories.length }} spacingY={8}>
                                        <motion.a
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 1 }}
                                        >
                                            <Button
                                                variant="solid"
                                                fontSize="16px"
                                                size={'md'}
                                                onClick={() => setFilter('all')}
                                            >
                                                All
                                            </Button>
                                        </motion.a>
                                        {categories.map(category => (
                                            <motion.a
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 1 }}
                                            >
                                                <Button
                                                    variant="solid"
                                                    fontSize="16px"
                                                    onClick={() => setFilter(category)}
                                                >
                                                    {category}
                                                </Button>
                                            </motion.a>
                                        ))}
                                    </SimpleGrid>
                                </Box>
                            </Stack>
                            <Box alignSelf={{ sm: 'center', md: 'flex-start' }}>
                                <Commands />
                            </Box>
                        </>
                    )}

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


