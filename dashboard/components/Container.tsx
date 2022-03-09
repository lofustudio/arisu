import React from 'react'
import { Flex, Stack, Box, Text, useDisclosure, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Center, Heading, VStack } from '@chakra-ui/react'
import Navbar from './Navbar'

const Container = ({ enableTransition, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Navbar enableTransition={enableTransition} />
      <Flex as="main" justifyContent="center" flexDirection="column">
        {children}
      </Flex>
      <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
        <Stack>
          <Text color="textPrimary" alignSelf={'center'} onClick={onOpen}>
            © {new Date().getFullYear()} tygerxqt
          </Text>
          <Drawer onClose={onClose} isOpen={isOpen} size={'full'}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader />
              <DrawerBody>
                <Center>
                  <VStack>
                    <Text fontSize={'9xl'} onClick={onClose} style={{ cursor: 'pointer' }}>🗿</Text>
                    <Text fontSize={'9xl'}>LORE!!!</Text>
                    <Text fontSize={'4xl'}>(click moyai to close)</Text>
                  </VStack>
                  <audio src="https://cdn.discordapp.com/attachments/869982937553186877/951244599349874740/LORE.mp3" autoPlay loop />
                </Center>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Stack>
      </Box>
    </>
  )
}

export default Container
