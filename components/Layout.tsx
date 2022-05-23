
import { NextComponentType, NextPageContext } from 'next'
import Head from 'next/head'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

interface Props {
   children: JSX.Element
}

const Layout = ({children}:Props) => {
  return (
    <div className="flex min-h-screen flex-col w-screen max-w-7xl ml-auto mr-auto p-2">
      <Head>
        <title>Youth Culture</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <nav className='w-full' >
        <Navbar/>
      </nav>
      <main className='w-full h-full '>
          {children}
      </main>
      <footer>
        <Footer/>
      </footer>
    </div>
  )
}

export default Layout
