import { AppProps } from 'next/app'
import Head from 'next/head'
import * as React from 'react'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import type { ApiContext } from '../types/userTypes'
import { AuthContextProvider } from 'contexts/AuthContext'
import GlobalSpinnerContextProvider from 'contexts/GlobalSpinnerContext'
import { theme } from 'themes'

// グローバルのスタイル
const GlobalStyle = createGlobalStyle`
html,
body,
textarea {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

* {
  box-sizing: border-box;
}

a {
  cursor: pointer;
  text-decoration: none;
  transition: .25s;
  color: #0000;
}

ol, ul {
  list-style: none;
}
`

// APIベースURL
const apiContext: ApiContext = {
  apiRootUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost/api',
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta key="charset" name="charset" content="utf-8" />
        <meta
          key="viewport"
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=5"
        />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
      </Head>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <GlobalSpinnerContextProvider>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </GlobalSpinnerContextProvider>
      </ThemeProvider>
    </>
  )
}

export default MyApp
