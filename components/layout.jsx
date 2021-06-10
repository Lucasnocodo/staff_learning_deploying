import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from './layout.module.css'
import AppBar from './AppBar'

export const siteTitle = 'Next.js Sample Website'
const navBarHeight = 64
export default function Layout({ children }) {
  const [height, setHeight] = useState(800)
  // let height is 100% of browser screen.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHeight(window.innerHeight - navBarHeight)
    }
  }, [])
  return (
    <div className={styles.layout}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js" />
        <meta
          property="og:image"
          content={`https://og-image.vercel.app/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`} />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <AppBar />
      <main className={styles.container} style={{ minHeight: height }}>{children}</main>
    </div>
  )
}
