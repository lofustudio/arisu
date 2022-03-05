import { theme as chakraTheme } from '@chakra-ui/react';
import { extendTheme, ThemeConfig } from '@chakra-ui/react'
import { mode, createBreakpoints } from "@chakra-ui/theme-tools"
import { GlobalProps } from '@emotion/react';

const config: Partial<ThemeConfig> = {
  useSystemColorMode: true,
  initialColorMode: 'dark',
}

const fluidType = (minFont, maxFont) => {
  let XX = 768 / 100
  let YY = (100 * (maxFont - minFont)) / (1920 - 768)
  let ZZ = minFont / 16
  return `calc(${ZZ}rem + ((1vw - ${XX}px) * ${YY}))`
}

const styles = {
  global: (props: GlobalProps) => ({
    html: {
      body: {
        color: mode('#1D1D1D', '#FFFFFF')(props),
        backgroundColor: mode('#FFFFFF', '#1D1D1D')(props),
      }
    },

    // sidebar
    '*::-webkit-scrollbar': {
      width: '0.5rem',
      height: '0.5rem',
    },
    '*::-webkit-scrollbar-track': {
      background: mode('#FFFFFF', '#1D1D1D')(props),
    },
    '*::-webkit-scrollbar-thumb': {
      background: mode('#1D1D1D', '#FFFFFF')(props),
    },
    '*::-webkit-scrollbar-thumb:hover': {
      background: mode('#1D1D1D', '#FFFFFF')(props),
    },
    '*::-webkit-scrollbar-thumb:active': {
      background: mode('#1D1D1D', '#FFFFFF')(props),
    },
    '*::-webkit-scrollbar-corner': {
      background: mode('#FFFFFF', '#1D1D1D')(props),
    },
    Modal: {
      baseStyle: {
        backgroundColor: mode('#FFFFFF', '#1D1D1D')(props),
      },
    },
  }),
};

const fonts = {
  ...chakraTheme.fonts,
  body: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
  heading: `Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`,
}

const breakpoints = createBreakpoints({
  base: '0em',
  sm: '30em',
  md: '48em',
  lg: '80em',
  xl: '80em',
})

const overrides = {
  ...chakraTheme,
  styles,
  config,
  fonts,
  breakpoints,
  fontWeights: {
    normal: 300,
    medium: 600,
    bold: 700
  },
  fontSizes: {
    // xs: fluidType(6, 12),
    // sm: fluidType(7, 14),
    // md: fluidType(8, 16),
    // lg: fluidType(9, 18),
    // xl: fluidType(10, 20),
    // '2xl': fluidType(12, 24),
    // '3xl': fluidType(14, 28),
    // '4xl': fluidType(18, 36),
    // '5xl': fluidType(20, 40),
    // '6xl': fluidType(24, 48),
    // '7xl': fluidType(32, 64),
    // '8xl': fluidType(36, 72),
    display: fluidType(80, 144),
    display2: fluidType(24, 36),
    display3: fluidType(16, 24),
  }
}


const customTheme = extendTheme(overrides);

export default customTheme

