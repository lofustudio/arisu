import Head from 'next/head'
import { Divider, Heading, Stack, Text, SimpleGrid } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Container from '../../components/Container'
import isAdmin from '../../util/isAdmin'

export default function SettingsPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Container enableTransition={false}>
          <Head>
            <title>Profile</title>
          </Head>
          <Stack
            spacing={5}
            justifyContent="center"
            px={["5vw", "10vw"]}
            my={["25vh", "15vh", "22.5vh", "22.5vh"]}
          >
            <Stack>
              <Heading fontSize={{ base: "4xl", md: "6xl" }}>
                You need to be logged in to access this page.
              </Heading>
            </Stack>
          </Stack>
        </Container>
      </>
    )
  }


  if (!isAdmin(session.user.image)) {
    return (
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
                Access denied.
              </Heading>
            </Stack>
          </Stack>
        </Container>
      </>
    )
  }

  return (
    <>
      <Container enableTransition={false}>
        <Head>
          <title>Settings</title>
          <meta name="title" content="Settings" />
        </Head>
        <Stack
          spacing={5}
          justifyContent="center"
          px={["5vw", "10vw"]}
          my={["15vh", "15vh", "22.5vh", "22.5vh"]}
        >
          <Stack>
            <Heading fontSize={{ base: "4xl", md: "6xl" }}>
              Settings
            </Heading>
            <Text fontSize={{ base: "14px", md: "16px" }}>
              Manage your settings.
            </Text>
          </Stack>
          <Divider />
          <SimpleGrid columns={4} spacing={4}>
            <Stack pt={8} spacing={4}>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}
