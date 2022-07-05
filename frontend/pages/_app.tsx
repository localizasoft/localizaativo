import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from '@mui/material'
import { theme } from '../styles/theme'
import { AuthProvider } from '../service/context/AuthContext'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <Head>
        <title>LocalizaAtivo</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default MyApp
