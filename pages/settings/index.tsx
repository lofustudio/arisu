import Head from 'next/head'
import Container from '../../components/Container'
import { Stack, Heading, Text, Divider } from '@chakra-ui/react'

const SettingsPage = () => (
    <>
        <Container enableTransition={true}>
            <Head>
                <title>Dashboard</title>
                <meta name="title" content="Dashboard" />
            </Head>
            <Stack
                as="main"
                spacing="144px"
                justifyContent="center"
                alignItems="flex-start"
                px={{ base: '5vw', md: '10vw' }}
                mt={{ base: '15vh', md: '22.5vh' }}
            >
                <Stack spacing={5}>
                    <Heading color="displayColor" fontSize={{ base: "4xl", md: "6xl" }}>
                        Settings
                    </Heading>
                </Stack>
            </Stack>
        </Container>
    </>
)

export default SettingsPage;
