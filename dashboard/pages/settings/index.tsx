import Head from 'next/head'
import React from 'react';
import { Divider, Stack, Text, SimpleGrid, Input, Button, Heading, useToast } from '@chakra-ui/react'
import { useSession } from 'next-auth/react'
import Container from '../../components/Container'
import axios from 'axios';
import isAdmin from '../../util/isAdmin'

export default function SettingsPage(settings) {
  const { data: session, status } = useSession()
  const toast = useToast()

  const [prefix, setPrefix] = React.useState(settings.settings.prefix)
  const handlePrefixChange = (event) => setPrefix(event.target.value)

  const [guildID, setGuildID] = React.useState(settings.settings.guildID)
  const handleGuildID = (event) => setGuildID(event.target.value)

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status === 'unauthenticated') {
    return (
      <>
        <Container enableTransition={false}>
          <Head>
            <title>Settings</title>
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
        <Container enableTransition={false}>
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
          <SimpleGrid columns={3} spacing={16}>
            <Stack alignContent="center" pt={8} spacing={4}>
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Prefix
              </Heading>
              <Input
                value={prefix}
                placeholder={"Enter value"}
                onChange={(e) => setPrefix(e.target.value)}
              />
              <Button variant={'solid'} p="4" ml="3vw" fontSize={"16px"} onClick={() => {
                axios.put('http://localhost:3001/api/settings', {
                  "prefix": prefix
                }).then(res => {
                  if (res.status === 200) {
                    toast({
                      title: 'Success',
                      description: 'Prefix successfully updated. Please restart the bot for changes to take effect.',
                      status: 'success',
                      duration: 3000,
                      isClosable: true
                    });
                  } else {
                    toast({
                      title: 'Error',
                      description: 'An error occured while updating the prefix.',
                      status: 'error',
                      duration: 3000,
                      isClosable: true
                    });
                  }
                })
              }}>
                Update
              </Button>
            </Stack>
            <Stack alignContent="center" pt={8} spacing={4}>
              <Heading fontSize={{ base: "2xl", md: "3xl" }}>
                Server ID
              </Heading>
              <Input
                value={guildID}
                placeholder={"Enter value"}
                onChange={(e) => setGuildID(e.target.value)}
              />
              <Button variant={'solid'} p="4" ml="3vw" fontSize={"16px"}>
                Update
              </Button>
            </Stack>
          </SimpleGrid>
        </Stack>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`http://localhost:3001/api/settings`)
  const settings = await res.json()

  if (!settings) {
    return {
      notFound: true,
    }
  }

  return {
    props: { settings }, // will be passed to the page component as props
  }
}
