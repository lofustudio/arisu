import Head from 'next/head'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { SessionProvider } from "next-auth/react"
import type { AppProps } from 'next/app'

import customTheme from '../styles/theme'

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <>
      <Head>
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <SessionProvider session={session}>
        <ColorModeScript initialColorMode={customTheme.config.initialColorMode} />
        <ChakraProvider theme={customTheme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </>
  )
}

export default App