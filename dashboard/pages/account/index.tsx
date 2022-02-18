import Head from 'next/head'
import { Stack } from '@chakra-ui/react'
import Container from '../../components/Container'

const IndexPage = () => (
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
            </Stack>
        </Container>
    </>
)

export default IndexPage;