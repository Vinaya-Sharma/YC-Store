import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/Layout'
import {StateContext} from '../context/stateContext'
import {SessionProvider} from 'next-auth/react'
import { Toaster } from 'react-hot-toast';
import { CookiesProvider } from 'react-cookie'

function MyApp({ Component, pageProps: {session, ...pageProps} }: AppProps) {
  return (
  <CookiesProvider>
     <SessionProvider session={session} >
  <StateContext>
  <Toaster/>
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </StateContext>
    </SessionProvider>
  </CookiesProvider>
)
}

export default MyApp
