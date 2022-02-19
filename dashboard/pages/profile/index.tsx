import Head from 'next/head'
import { Stack, Heading, Text, SimpleGrid, Divider, Avatar } from '@chakra-ui/react'
import Container from '../../components/Container'
import { useSession } from 'next-auth/react'

export default function IndexPage() {
    const { data: session } = useSession();

    return (
        <>
            <Container enableTransition={true}>
                <Head>
                    <title>Profile</title>
                    <meta name="title" content="Dashboard" />
                </Head>
                <Stack
                    spacing={5}
                    justifyContent="center"
                    px={["5vw", "10vw"]}
                    my={["15vh", "15vh", "22.5vh", "22.5vh"]}
                >
                    <Stack      >
                        <Heading fontSize={{ base: "4xl", md: "6xl" }}>
                            Profile
                        </Heading>
                        <Text fontSize={{ base: "14px", md: "16px" }}>
                            Manage your profile.
                        </Text>
                    </Stack>
                    <Divider />
                    <SimpleGrid columns={3} spacing={4}>
                        <Stack pt={8} spacing={4}>
                            <Heading as="h3" size="lg">
                                Name
                            </Heading>
                            <Text>
                                {session.user.name}
                            </Text>
                        </Stack>
                        <Stack pt={8} spacing={4}>
                            <Heading as="h3" size="lg">
                                Email
                            </Heading>
                            <Text>
                                {session.user.email}
                            </Text>
                        </Stack>
                        <Stack pt={8} spacing={4}>
                            <Heading as="h3" size="lg">
                                Image
                            </Heading>
                            <Avatar size="2xl" name={session.user.name} src={session.user.image} />
                        </Stack>
                    </SimpleGrid>
                </Stack>
            </Container>
        </>
    )
}