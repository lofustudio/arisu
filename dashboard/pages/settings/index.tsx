import Head from 'next/head'
import { Divider, Heading, Stack, Text } from '@chakra-ui/react'
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
          <Stack>
          <Heading fontSize={{ base: "4xl", md: "6xl" }}>
              Settings
            </Heading>
            <Text fontSize={{ base: "14px", md: "16px" }}>
              Manage all of Cookie's configuration.
            </Text>
          </Stack>
        </Stack>
      </Container>
    </>
)

export default IndexPage
