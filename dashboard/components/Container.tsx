import React, { useEffect } from 'react'
import { Flex, Stack, Box } from '@chakra-ui/react'
import Navbar from './Navbar'
import { Copyright } from './Copyright'

const Container = ({ enableTransition, children }) => {
  return (
    <>
      <Navbar enableTransition={enableTransition} />
      <Flex as="main" justifyContent="center" flexDirection="column">
        {children}
      </Flex>
      <Box as="footer" role="contentinfo" mx="auto" maxW="7xl" py="12" px={{ base: '4', md: '8' }}>
        <Stack>
          <Copyright text color="textPrimary" alignSelf={{ base: 'center', sm: 'start' }} />
        </Stack>
      </Box>
    </>
  )
}

export default Container
